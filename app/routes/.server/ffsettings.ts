import db from "../../db.server";

export async function getFFSettings(sessionId: string) {
  return await db.fFSettings.findUnique({
    where: {
      sessionId,
    },
  });
}
