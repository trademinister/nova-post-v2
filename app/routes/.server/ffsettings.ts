import { FFPaymentMethods, FFSettings } from "@prisma/client";
import db from "../../db.server";

export async function getFFSettings(sessionId: string) {
  const ffSettings = await db.fFSettings.findUnique({
    where: {
      sessionId,
    },
  });

  if (!ffSettings) {
    return await createFFSettings(sessionId);
  }

  return ffSettings;
}

export async function createFFSettings(sessionId: string) {
  return await db.fFSettings.create({
    data: {
      sessionId,
    },
  });
}

export async function updateFFSettings(
  sessionId: string,
  data: Partial<FFSettings>,
) {
  return await db.fFSettings.update({
    where: {
      sessionId,
    },
    data,
  });
}

export async function logoutFFSettings(sessionId: string) {
  return await updateFFSettings(sessionId, {
    npLogin: null,
    npPassword: null,
    npOrganization: null,
    additionalOrganizationKey: null,
  });
}

export async function getAllFfPaymentMethods(ffSettingsId: string) {
  return await db.fFPaymentMethods.findMany({
    where: {
      ffSettingsId: ffSettingsId,
    },
  });
}

export async function createFfPaymentMethod(
  ffSettingsId: string,
  name: string,
) {
  return await db.fFPaymentMethods.create({
    data: {
      ffSettingsId: ffSettingsId,
      name: name,
    },
  });
}

export async function updateFfPaymentMethod(
  ffPaymentMethodId: string,
  data: Partial<FFPaymentMethods>,
) {
  return await db.fFPaymentMethods.update({
    where: {
      id: ffPaymentMethodId,
    },
    data,
  });
}

export async function deleteFfPaymentMethod(ffPaymentMethodId: string) {
  return await db.fFPaymentMethods.delete({
    where: {
      id: ffPaymentMethodId,
    },
  });
}

export async function getAllFfLocations(
  ffSettingsId: string,
  page: number = 1,
  pageSize: number = 5,
  searchQuery?: string,
  orderBy: "name" | "warehouse" = "name",
) {
  const skip = (page - 1) * pageSize;

  const where: any = {
    ffSettingsId: ffSettingsId,
  };

  if (searchQuery && searchQuery.trim()) {
    where.OR = [
      {
        name: {
          contains: searchQuery.trim(),
          mode: "insensitive",
        },
      },
      {
        destinationWarehouse: {
          contains: searchQuery.trim(),
          mode: "insensitive",
        },
      },
    ];
  }

  let orderByClause: any;
  if (orderBy === "name") {
    orderByClause = { name: "asc" };
  } else if (orderBy === "warehouse") {
    orderByClause = [
      {
        destinationWarehouse: {
          sort: "asc",
          nulls: "last",
        },
      },
      { name: "asc" },
    ];
  } else {
    orderByClause = { name: "asc" };
  }

  const [locations, total] = await Promise.all([
    db.fFLocations.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: orderByClause,
    }),
    db.fFLocations.count({
      where,
    }),
  ]);

  return {
    locations,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: page < Math.ceil(total / pageSize),
    hasPreviousPage: page > 1,
  };
}

export async function getAllFfCollections(
  ffSettingsId: string,
  page: number = 1,
  pageSize: number = 5,
  searchQuery?: string,
  orderBy: "name" | "warehouse" = "name",
) {
  const skip = (page - 1) * pageSize;

  const where: any = {
    ffSettingsId: ffSettingsId,
  };

  if (searchQuery && searchQuery.trim()) {
    where.OR = [
      {
        name: {
          contains: searchQuery.trim(),
          mode: "insensitive",
        },
      },
      {
        destinationWarehouse: {
          contains: searchQuery.trim(),
          mode: "insensitive",
        },
      },
    ];
  }

  let orderByClause: any;
  if (orderBy === "name") {
    orderByClause = { name: "asc" };
  } else if (orderBy === "warehouse") {
    orderByClause = [
      {
        destinationWarehouse: {
          sort: "asc",
          nulls: "last",
        },
      },
      { name: "asc" },
    ];
  } else {
    orderByClause = { name: "asc" };
  }

  const [collections, total] = await Promise.all([
    db.fFCollections.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: orderByClause,
    }),
    db.fFCollections.count({
      where,
    }),
  ]);

  return {
    collections,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: page < Math.ceil(total / pageSize),
    hasPreviousPage: page > 1,
  };
}
