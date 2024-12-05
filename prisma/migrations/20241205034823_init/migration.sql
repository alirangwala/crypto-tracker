CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number_txns" INTEGER NOT NULL,
    "total_received" REAL NOT NULL,
    "total_sent" REAL NOT NULL,
    "current_balance" REAL NOT NULL,
    "last_updated" DATETIME NOT NULL
);

CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "Transaction_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
