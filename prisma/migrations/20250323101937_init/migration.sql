-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resettedPassword" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "comune" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "serviceRole" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Structure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enteGestore" TEXT NOT NULL,
    "type" TEXT[],
    "accredittedInRome" BOOLEAN NOT NULL DEFAULT false,
    "emergencyReception" BOOLEAN NOT NULL DEFAULT false,
    "availableToWelcome" BOOLEAN NOT NULL DEFAULT false,
    "otherServices" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "comune" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "adminName" TEXT NOT NULL,
    "adminSurname" TEXT NOT NULL,
    "website" TEXT,
    "servicesCardLink" TEXT,
    "otherInfo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Structure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "amministrationName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "citizenship" TEXT NOT NULL,
    "minorsNumber" INTEGER NOT NULL,
    "adultsNumber" INTEGER NOT NULL,
    "minors" JSONB[],
    "insertionProcedure" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "structureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitingList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "structureTypes" TEXT[],
    "structureAccredittedInRome" BOOLEAN NOT NULL,
    "structureEmergencyReception" BOOLEAN NOT NULL,
    "structureAvailableToWelcome" BOOLEAN NOT NULL DEFAULT true,
    "structureAddress" TEXT NOT NULL,
    "structureCity" TEXT NOT NULL,
    "structureProvince" TEXT NOT NULL,
    "structureComune" TEXT NOT NULL,
    "structureMunicipio" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Structure_id_key" ON "Structure"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_id_key" ON "Family"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_id_key" ON "WaitingList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_email_key" ON "WaitingList"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- AddForeignKey
ALTER TABLE "Structure" ADD CONSTRAINT "Structure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "Structure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingList" ADD CONSTRAINT "WaitingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
