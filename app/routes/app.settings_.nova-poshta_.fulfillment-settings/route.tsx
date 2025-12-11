import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import NovaPoshtaFfSettings from "./app.settings.nova-poshta-fulfillment";
import { authenticate } from "~/shopify.server";
import {
  createFfPaymentMethod,
  deleteFfPaymentMethod,
  getAllFfCollections,
  getAllFfLocations,
  getAllFfPaymentMethods,
  getFFSettings,
  logoutFFSettings,
  updateFfPaymentMethod,
  updateFFSettings,
} from "~/routes/.server/ffsettings";
import NovaPoshtaWms from "~/api/novaPoshtaWms";

export { NovaPoshtaFfSettings as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);

  try {
    const ffSettings = await getFFSettings(session.id);

    const ffPaymentMethods = await getAllFfPaymentMethods(ffSettings.id);

    const url = new URL(request.url);
    const locationsPage = parseInt(
      url.searchParams.get("locationsPage") || "1",
      10,
    );
    const locationsSearch = url.searchParams.get("locationsSearch") || "";
    const locationsOrderBy =
      (url.searchParams.get("locationsOrderBy") as "name" | "warehouse") ||
      "name";

    const ffLocations = await getAllFfLocations(
      ffSettings.id,
      locationsPage,
      5,
      locationsSearch,
      locationsOrderBy,
    );

    const collectionsPage = parseInt(
      url.searchParams.get("collectionsPage") || "1",
      10,
    );
    const collectionsSearch = url.searchParams.get("collectionsSearch") || "";
    const collectionsOrderBy =
      (url.searchParams.get("collectionsOrderBy") as "name" | "warehouse") ||
      "name";

    const ffCollections = await getAllFfCollections(
      ffSettings.id,
      collectionsPage,
      5,
      collectionsSearch,
      collectionsOrderBy,
    );

    return {
      ffSettings,
      ffPaymentMethods,
      ffLocations,
      ffCollections,
    };
  } catch (error: any) {
    return { error: error.message || "unknown_error" };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  try {
    const formData = await request.formData();

    switch (formData.get("action")) {
      case "login_ff":
        const npLogin = formData.get("npLogin") as string;
        const npPassword = formData.get("npPassword") as string;
        const npOrganization = formData.get("npOrganization") as string;
        const additionalOrganizationKey = formData.get(
          "additionalOrganizationKey",
        ) as string;

        const npWms = new NovaPoshtaWms(npLogin, npPassword, npOrganization);
        await npWms.getOrdersType();

        await updateFFSettings(session.id, {
          npLogin,
          npPassword,
          npOrganization,
          additionalOrganizationKey,
        });

        return { success: true, message: "login_ff_success" };
      case "update_ff":
        break;
      case "logout_ff":
        await logoutFFSettings(session.id);
        return { success: true, message: "logout_ff_success" };
      case "save_ff_settings":
        const isEnabled = formData.get("isEnabled") === "true";
        const processPaymentgMethod =
          formData.get("processPaymentgMethod") === "true";
        await updateFFSettings(session.id, {
          isEnabled,
          processPaymentgMethod,
        });
        return { success: true, message: "save_ff_settings_success" };
      case "create_ff_payment_method":
        const name = formData.get("name") as string;
        const ffSettingsId = formData.get("ffSettingsId") as string;
        await createFfPaymentMethod(ffSettingsId, name);
        return { success: true, message: "save_ff_payment_method_success" };
      case "delete_ff_payment_method":
        const ffPaymentMethodId1 = formData.get("ffPaymentMethodId") as string;
        await deleteFfPaymentMethod(ffPaymentMethodId1);
        return { success: true, message: "delete_ff_payment_method_success" };
      case "update_ff_payment_method":
        const ffPaymentMethodId2 = formData.get("ffPaymentMethodId") as string;
        const statusesStr = formData.get("statuses") as string;
        const statuses = JSON.parse(statusesStr || "[]") as string[];
        await updateFfPaymentMethod(ffPaymentMethodId2, { statuses });
        return { success: true };
      default:
        return { error: "invalid_action" };
    }
  } catch (error: any) {
    console.log(error);

    const errorMessage = error.message || String(error);

    if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
      return { error: "np_unauthorized" };
    }

    return { error: errorMessage || "unknown_error" };
  }
}
