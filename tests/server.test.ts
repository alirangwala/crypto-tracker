import { describe, it, expect, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/addresses/route";
import { DELETE } from "@/app/api/addresses/[id]/route";

const prisma = new PrismaClient();

describe("Addresses API", () => {
  const sampleAddress = {
    id: "bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5",
    number_txns: 5,
    total_received: 1.5,
    total_sent: 0.5,
    current_balance: 1.0,
    last_updated: new Date(),
    transactions: [
      {
        id: "tx1",
        type: "received",
        amount: 1.5,
        timestamp: new Date(),
      },
    ],
  };

  describe("GET /api/addresses", () => {
    it("should return empty array when no addresses exist", async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    it("should return all addresses with their transactions", async () => {
      await prisma.address.create({
        data: {
          ...sampleAddress,
          transactions: {
            create: sampleAddress.transactions,
          },
        },
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0].id).toBe(sampleAddress.id);
      expect(data[0].transactions).toHaveLength(1);
    });
  });

  describe("POST /api/addresses", () => {
    it("should create new address with transactions", async () => {
      const request = new NextRequest("http://localhost:3000/api/addresses", {
        method: "POST",
        body: JSON.stringify(sampleAddress),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe(sampleAddress.id);
      expect(data.transactions).toHaveLength(1);

      const dbAddress = await prisma.address.findUnique({
        where: { id: sampleAddress.id },
        include: { transactions: true },
      });
      expect(dbAddress).toBeTruthy();
      expect(dbAddress?.transactions).toHaveLength(1);
    });
    it("should handle address already existing (409 Conflict)", async () => {
      await prisma.address.create({
        data: {
          ...sampleAddress,
          transactions: {
            create: sampleAddress.transactions,
          },
        },
      });

      const request = new NextRequest("http://localhost:3000/api/addresses", {
        method: "POST",
        body: JSON.stringify(sampleAddress),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toBe("Address with this ID already exists");
    });
    it("should handle invalid address data", async () => {
      const request = new NextRequest("http://localhost:3000/api/addresses", {
        method: "POST",
        body: JSON.stringify({
          id: "invalid-address",
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBeTruthy();
    });
  });

  describe("DELETE /api/addresses/[id]", () => {
    it("should delete address and its transactions", async () => {
      await prisma.address.create({
        data: {
          ...sampleAddress,
          transactions: {
            create: sampleAddress.transactions,
          },
        },
      });

      const request = new NextRequest(
        "http://localhost:3000/api/addresses/" + sampleAddress.id,
        {
          method: "DELETE",
        }
      );

      const context = {
        params: {
          id: sampleAddress.id,
        },
      };

      const response = await DELETE(request, context);
      expect(response.status).toBe(200);

      const dbAddress = await prisma.address.findUnique({
        where: { id: sampleAddress.id },
        include: { transactions: true },
      });
      expect(dbAddress).toBeNull();

      const transactions = await prisma.transaction.findMany({
        where: { addressId: sampleAddress.id },
      });
      expect(transactions).toHaveLength(0);
    });

    it("should handle non-existent address", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/addresses/non-existent-id",
        {
          method: "DELETE",
        }
      );

      const context = {
        params: {
          id: "non-existent-id",
        },
      };

      const response = await DELETE(request, context);

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toBeTruthy();
    });
  });
});
