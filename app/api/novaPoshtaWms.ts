import soap, { type Client } from "soap";

const SANDBOX_URL = "https://api-nps.np.work/wms_test/ws/depositorExchane.1cws";
const PRODUCTION_URL = "https://api-nps.np.work/wms_npl3/ws/depositorExchane.1cws";

export default class NovaPoshtaWms {
  private login: string;
  private password: string;
  private organization: string;
  private sandbox: boolean;
  private client: Client | null = null;

  constructor(login: string, password: string, organization: string, sandbox?: boolean) {
    this.login = login;
    this.password = password;
    this.organization = organization;
    this.sandbox = sandbox ?? process.env.NODE_ENV === "development";
  }

  static createSandbox(organization: string = "NPL_A1"): NovaPoshtaWms {
    return new NovaPoshtaWms("web", "web", organization, true);
  }

  private async getClient(): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    const url = this.sandbox ? SANDBOX_URL : PRODUCTION_URL;
    
    // Загружаем WSDL вручную с Basic Auth
    const wsdlXml = await this.loadWsdl(url);
    
    const options = {
      endpoint: url,
    };

    // Передаем XML напрямую вместо URL
    this.client = await soap.createClientAsync(wsdlXml, options);
    return this.client;
  }

  private async loadWsdl(baseUrl: string): Promise<string> {
    const https = await import("https");
    const { URL } = await import("url");

    const wsdlUrl = `${baseUrl}?wsdl`;
    const url = new URL(wsdlUrl);
    const auth = Buffer.from(`${this.login}:${this.password}`).toString("base64");

    return new Promise((resolve, reject) => {
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        rejectUnauthorized: false,
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          }
        });
      });

      req.on("error", reject);
      req.setTimeout(30000, () => {
        req.destroy();
        reject(new Error("Timeout"));
      });
      req.end();
    });
  }

  async callMethod(methodName: string, args: Record<string, unknown>) {
    const client = await this.getClient();
    
    return new Promise((resolve, reject) => {
      client[methodName](args, (err: Error | null, result: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getSoapClient(): Promise<Client> {
    return this.getClient();
  }
}
