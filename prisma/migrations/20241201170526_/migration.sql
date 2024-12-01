-- CreateIndex
CREATE INDEX "Subscriber_userId_subscriberId_idx" ON "Subscriber"("userId", "subscriberId");

-- CreateIndex
CREATE INDEX "Subscriber_subscriberId_idx" ON "Subscriber"("subscriberId");

-- CreateIndex
CREATE INDEX "Subscriber_userId_idx" ON "Subscriber"("userId");
