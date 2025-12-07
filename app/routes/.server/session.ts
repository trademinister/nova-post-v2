import db from "../../db.server";

export async function getSession(sessionId: string) {
  return await db.session.findUnique({
    where: {
      id: sessionId,
    },
  });
}

export async function updateSession(sessionId: string) {
  return await db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      object: {
        shop: "test.myshopify.com",
        insert: {
          shop: "test.myshopify.com",
          state: "test",
          isOnline: true,
          scope: "test",
        },
      },
    },
  });
}
