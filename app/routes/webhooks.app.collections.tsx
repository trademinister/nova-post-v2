import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "~/shopify.server";
import {
  createCollection,
  updateCollection,
  deleteCollection,
} from "~/routes/.server/collections";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, session, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  console.log(payload);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const collectionId = payload.id.toString();

  switch (topic) {
    case "COLLECTIONS_UPDATE":
      const updateData = {
        name: payload.title,
        description: payload.body_html,
      };
      await updateCollection(collectionId, updateData);
      break;
    case "COLLECTIONS_CREATE":
      const createData = {
        collectionId: collectionId,
        name: payload.title,
        description: payload.body_html,
      };
      await createCollection(session.id, createData);
      break;
    case "COLLECTIONS_DELETE":
      await deleteCollection(collectionId);
      break;
  }

  return new Response();
};
