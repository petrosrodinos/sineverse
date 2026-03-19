-- CreateTable
CREATE TABLE "_ProjectAssetPromptImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectAssetPromptImages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectAssetPromptImages_B_index" ON "_ProjectAssetPromptImages"("B");

-- AddForeignKey
ALTER TABLE "_ProjectAssetPromptImages" ADD CONSTRAINT "_ProjectAssetPromptImages_A_fkey" FOREIGN KEY ("A") REFERENCES "project_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectAssetPromptImages" ADD CONSTRAINT "_ProjectAssetPromptImages_B_fkey" FOREIGN KEY ("B") REFERENCES "project_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
