import { FFLocations } from "@prisma/client";
import { getFFSettings } from "./ffsettings";
import db from "../../db.server";

export async function getLocations(sessionId: string) {
  const locations = await db.fFLocations.findMany({
    where: {
      ffSettings: {
        sessionId,
      },
    },
  });
  return locations;
}

export async function createLocation(
  sessionId: string,
  data: Partial<FFLocations>,
) {
  const ffSettings = await getFFSettings(sessionId);

  const location = await db.fFLocations.create({
    data: {
      locationId: data.locationId!,
      name: data.name!,
      address: data.address || "",
      ffSettingsId: ffSettings.id,
    },
  });
  return location;
}

export async function updateLocation(
  sessionId: string,
  locationId: string,
  locationData: Partial<FFLocations>,
) {
  const location = await db.fFLocations.findUnique({
    where: {
      locationId: locationId,
    },
  });
  if (!location) {
    const ffSettings = await getFFSettings(sessionId);
    return await db.fFLocations.create({
      data: {
        locationId: locationId,
        name: locationData.name!,
        address: locationData.address || "",
        ffSettingsId: ffSettings.id,
      },
    });
  } else {
    await db.fFLocations.update({
      where: {
        locationId: location.locationId,
      },
      data: {
        ...locationData,
      },
    });
    return location;
  }
}

export async function deleteLocation(locationId: string) {
  try {
    const location = await db.fFLocations.delete({
      where: {
        locationId: locationId,
      },
    });
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
}
