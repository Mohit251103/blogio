-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publishedOn" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_SavedBlogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedBlogs_AB_unique" ON "_SavedBlogs"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedBlogs_B_index" ON "_SavedBlogs"("B");

-- AddForeignKey
ALTER TABLE "_SavedBlogs" ADD CONSTRAINT "_SavedBlogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBlogs" ADD CONSTRAINT "_SavedBlogs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
