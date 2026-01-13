import db from "../../db.server";

export async function getLogs(sessionId: string) {
  const logs = await db.fFLogs.findMany({
    where: {
      sessionId,
    },
  });

  return logs;
}
