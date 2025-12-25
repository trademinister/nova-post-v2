-- CreateTable
CREATE TABLE "FilterTab" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sort" TEXT NOT NULL DEFAULT 'ORDER_NUMBER,desc',
    "query" TEXT NOT NULL DEFAULT '',
    "filters" JSONB NOT NULL,
    "sessionId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilterTab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilterTab_sessionId_title_key" ON "FilterTab"("sessionId", "title");

-- AddForeignKey
ALTER TABLE "FilterTab" ADD CONSTRAINT "FilterTab_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
