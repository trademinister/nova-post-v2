import db from "../../db.server";

export async function getSession(sessionId: string) {
  return await db.session.findUnique({
    where: {
      id: sessionId,
    },
  });
}
