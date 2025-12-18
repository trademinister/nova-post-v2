import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import NovaPoshtaFfSettings from "./app.settings.fulfillment";
import { authenticate } from "~/shopify.server";
import {
  createFfPaymentMethod,
  createFilteredTag,
  deleteFfPaymentMethod,
  deleteFilteredTag,
  getAllFfCollections,
  getAllFfLocations,
  getAllFfPaymentMethods,
  getAllFilteredTags,
  getFFSettings,
  logoutFFSettings,
  resetFFSettings,
  updateFfCollection,
  updateFfLocation,
  updateFfPaymentMethod,
  updateFFSettings,
  updateFilteredTag,
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

    const ffFilteredTags = await getAllFilteredTags(ffSettings.id);

    return {
      ffSettings,
      ffPaymentMethods,
      ffLocations,
      ffCollections,
      ffFilteredTags,
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
        const orderRiskAssissemnt =
          formData.get("orderRiskAssissemnt") === "true";
        const orderRiskLevelsStr = formData.get("orderRiskLevels") as string;
        const orderRiskLevels = JSON.parse(
          orderRiskLevelsStr || "[]",
        ) as string[];
        const filteredByTagsIsActive = formData.get("filteredByTagsIsActive") === "true";
        const fulfillBy = formData.get("fulfillBy") as string;

        await updateFFSettings(session.id, {
          isEnabled,
          processPaymentgMethod,
          orderRiskAssissemnt,
          orderRiskLevels,
          fulfillBy,
          filteredByTagsIsActive,
        });

        // Update locations
        const locationsStr = formData.get("locations") as string;
        if (locationsStr) {
          const locations = JSON.parse(locationsStr) as Array<{
            id: string;
            destinationWarehouse?: string;
            isActive?: boolean;
            remainsIsActive?: boolean;
          }>;
          await Promise.all(
            locations.map((location) =>
              updateFfLocation(location.id, {
                destinationWarehouse: location.destinationWarehouse,
                isActive: location.isActive,
                remainsIsActive: location.remainsIsActive,
              }),
            ),
          );
        }

        // Update collections
        const collectionsStr = formData.get("collections") as string;
        if (collectionsStr) {
          const collections = JSON.parse(collectionsStr) as Array<{
            id: string;
            destinationWarehouse?: string;
            isActive?: boolean;
            remainsIsActive?: boolean;
          }>;
          await Promise.all(
            collections.map((collection) =>
              updateFfCollection(collection.id, {
                destinationWarehouse: collection.destinationWarehouse,
                isActive: collection.isActive,
                remainsIsActive: collection.remainsIsActive,
              }),
            ),
          );
        }

        // Update filtered tags
        const filteredTagsStr = formData.get("filteredTags") as string;
        if (filteredTagsStr) {
          const filteredTags = JSON.parse(filteredTagsStr) as Array<{
            id: string;
            value?: string;
            types?: string[];
          }>;
          await Promise.all(
            filteredTags.map(async (tag) => {
              try {
                await updateFilteredTag(tag.id, {
                  types: tag.types,
                });
              } catch (error: any) {
                if (error.code !== "P2025") {
                  throw error;
                }
              }
            }),
          );
        }

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
      case "create_filtered_tag":
        const typesStr = formData.get("types") as string;
        const types = JSON.parse(typesStr || "[]") as string[];
        const value = formData.get("value") as string;
        const ffSettings = await getFFSettings(session.id);
        await createFilteredTag(ffSettings.id, value, types);
        return { success: true, message: "create_filtered_tag_success" };
      case "delete_filtered_tag":
        const filteredTagId = formData.get("filteredTagId") as string;
        await deleteFilteredTag(filteredTagId);
        return { success: true, message: "delete_filtered_tag_success" };
      case "reset_ff_settings":
        await resetFFSettings(session.id);
        return { success: true, message: "reset_ff_settings_success" };
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
