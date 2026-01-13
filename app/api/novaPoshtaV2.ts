// const BASE_NOVAPOSHTA_API = process.env.NOVAPOSHTA_API_URL;

interface ApiRequest {
  apiKey: string;
  modelName: string;
  calledMethod: string;
  methodProperties?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data: T[];
  errors: unknown[];
  warnings: unknown[];
  info: unknown;
  messageCodes: unknown[];
  errorCodes: unknown[];
  warningCodes: unknown[];
  infoCodes: unknown;
}

interface GetCitiesParams {
  Ref?: string;
  Page?: string;
  FindByString?: string;
  Limit?: string;
}

export default class NovaPoshta {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.baseUrl = process.env.NOVAPOSHTA_API_URL || "";
    this.apiKey = apiKey;
  }

  private async call<T = unknown>(
    modelName: string,
    calledMethod: string,
    methodProperties: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    const request: ApiRequest = {
      apiKey: this.apiKey,
      modelName,
      calledMethod,
      methodProperties,
    };

    const body = JSON.stringify(request);
    console.log("BODY", body);
    console.log("URL", this.baseUrl);

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      response.body?.cancel();
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success || data.errors?.length > 0) {
      console.log(data);
      const errorMessage = data.errors?.[0]?.toString() || "Unknown API error";
      throw new Error(`Nova Poshta API error: ${errorMessage}`);
    }

    return data;
  }

  async getCities(params?: GetCitiesParams): Promise<unknown[]> {
    const methodProperties: Record<string, string> = {};

    if (params?.Ref) {
      methodProperties.Ref = params.Ref;
    }
    if (params?.Page) {
      methodProperties.Page = params.Page;
    }
    if (params?.FindByString) {
      methodProperties.FindByString = params.FindByString;
    }
    if (params?.Limit) {
      methodProperties.Limit = params.Limit;
    }

    const response = await this.call(
      "AddressGeneral",
      "getCities",
      methodProperties,
    );

    return response.data;
  }
}
