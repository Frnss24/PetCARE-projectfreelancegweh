import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { bookingStatusSchema } from "@/lib/validations/booking";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = bookingStatusSchema.parse((await request.json()).status);

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: payload },
      include: {
        service: true,
      },
    });

    return NextResponse.json({
      ...booking,
      bookingDate: booking.bookingDate.toISOString(),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Gagal memperbarui status booking." }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus booking." }, { status: 500 });
  }
}
