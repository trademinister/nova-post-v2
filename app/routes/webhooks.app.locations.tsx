import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "~/shopify.server";
import {
  createLocation,
  updateLocation,
  deleteLocation,
} from "~/routes/.server/locations";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, session, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  console.log(payload);

  const locationId = payload.id.toString();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  switch (topic) {
    case "LOCATIONS_UPDATE":
      if (!payload.active) {
        await deleteLocation(locationId);
        break;
      }
      const addressPartsUpdate = [
        payload.address1,
        payload.address2,
        payload.city,
        payload.zip,
        payload.state,
        payload.country_name,
      ].filter(Boolean);

      const addressUpdate = addressPartsUpdate.join(", ");
      const updateData = {
        name: payload.name,
        address: addressUpdate,
      };
      await updateLocation(session.id, locationId, updateData);
      break;
    case "LOCATIONS_CREATE":
      if (!payload.active) {
        break;
      }
      const addressPartsCreate = [
        payload.address1,
        payload.address2,
        payload.city,
        payload.zip,
        payload.state,
        payload.country_name,
      ].filter(Boolean);

      const addressCreate = addressPartsCreate.join(", ");

      const createData = {
        locationId: locationId,
        name: payload.name,
        address: addressCreate,
      };
      await createLocation(session.id, createData);
      break;
    case "LOCATIONS_DELETE":
      await deleteLocation(locationId);
      break;
  }

  return new Response();
};
