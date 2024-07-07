-- CreateTable
CREATE TABLE "Cabin" (
    "cabinId" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "regularPrice" DECIMAL NOT NULL,
    "discount" DECIMAL,
    "description" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Guest" (
    "guestId" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationalId" TEXT,
    "nationality" TEXT,
    "countryFlag" TEXT
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "endData" DATETIME NOT NULL,
    "numNights" INTEGER NOT NULL,
    "numGuests" INTEGER NOT NULL,
    "cabinPrice" DECIMAL NOT NULL,
    "extrasPrice" DECIMAL NOT NULL,
    "totalPrice" DECIMAL NOT NULL,
    "status" TEXT NOT NULL,
    "hasBreakfast" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "observations" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_nationalId_key" ON "Guest"("nationalId");
