import { FFCollections } from "@prisma/client";
import { getFFSettings } from "./ffsettings";
import db from "../../db.server";

export async function getCollections(sessionId: string) {
  const collections = await db.fFCollections.findMany({
    where: {
      ffSettings: {
        sessionId,
      },
    },
  });
  return collections;
}

export async function createCollection(
  sessionId: string,
  data: Partial<FFCollections>,
) {
  const ffSettings = await getFFSettings(sessionId);

  const collection = await db.fFCollections.create({
    data: {
      collectionId: data.collectionId!,
      name: data.name!,
      description: data.description,
      ffSettingsId: ffSettings.id,
    },
  });
  return collection;
}

export async function updateCollection(
  collectionId: string,
  collectionData: Partial<FFCollections>,
) {
  const collection = await db.fFCollections.update({
    where: {
      collectionId: collectionId,
    },
    data: {
      ...collectionData,
    },
  });
  return collection;
}

export async function deleteCollection(collectionId: string) {
  try {
    const collection = await db.fFCollections.delete({
      where: {
        collectionId: collectionId,
      },
    });
    return collection;
  } catch (error) {
    console.error(error);
    return null;
  }
}
