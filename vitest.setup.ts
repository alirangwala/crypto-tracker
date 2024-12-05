import { beforeAll, afterAll, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  // Clean test db before each test
  await prisma.transaction.deleteMany();
  await prisma.address.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
