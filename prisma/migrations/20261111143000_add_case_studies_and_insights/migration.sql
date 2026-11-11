CREATE TABLE "CaseStudy" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "status" "Status" NOT NULL DEFAULT 'ACTIVE',
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(6) NOT NULL,
  CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

CREATE TABLE "Insight" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "status" "Status" NOT NULL DEFAULT 'ACTIVE',
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(6) NOT NULL,
  CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Insight_slug_key" ON "Insight"("slug");
