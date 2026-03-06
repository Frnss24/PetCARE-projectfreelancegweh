import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { ensureServicesSeeded } from "@/lib/services";
import { bookingFormSchema } from "@/lib/validations/booking";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
      },
      orderBy: [{ bookingDate: "asc" }, { bookingTime: "asc" }],
    });

    return NextResponse.json(
      bookings.map((booking: {
        id: string;
        ownerName: string;
        phone: string;
        petName: string;
        petType: string;
        weight: number;
        serviceId: string;
        bookingDate: Date;
        bookingTime: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        service: unknown;
      }) => ({
        ...booking,
        bookingDate: booking.bookingDate.toISOString(),
      })),
    );
  } catch {
    return NextResponse.json({ error: "Gagal mengambil data booking." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureServicesSeeded();
    const payload = bookingFormSchema.parse(await request.json());

    const service = await prisma.service.findUnique({
      where: { id: payload.serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Layanan tidak ditemukan." }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        ownerName: payload.ownerName,
        phone: payload.phone,
        petName: payload.petName,
        petType: payload.petType,
        weight: payload.weight,
        serviceId: payload.serviceId,
        bookingDate: new Date(`${payload.bookingDate}T00:00:00`),
        bookingTime: payload.bookingTime,
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(
      {
        ...booking,
        bookingDate: booking.bookingDate.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Gagal menyimpan booking." }, { status: 500 });
  }
}
