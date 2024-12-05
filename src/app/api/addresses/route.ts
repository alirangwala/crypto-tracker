import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const addresses = await prisma.address.findMany({
      include: {
        transactions: true,
      },
    });
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const address = await prisma.address.create({
      data: {
        id: data.id,
        number_txns: data.number_txns,
        total_received: data.total_received,
        total_sent: data.total_sent,
        current_balance: data.current_balance,
        last_updated: new Date(data.last_updated),
        transactions: {
          create: data.transactions.map((tx: any) => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount,
            timestamp: new Date(tx.timestamp),
          })),
        },
      },
      include: {
        transactions: true,
      },
    });
    return NextResponse.json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}
