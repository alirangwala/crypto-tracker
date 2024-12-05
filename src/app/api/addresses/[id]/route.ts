import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    // Need to delete transactions first
    await prisma.transaction.deleteMany({
      where: {
        addressId: id,
      },
    });

    const deletedAddress = await prisma.address.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, address: deletedAddress.id });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}