import type { Metadata } from "next";
import { AdminBookingTable } from "@/components/admin-booking-table";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { ensureServicesSeeded } from "@/lib/services";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard admin untuk memantau dan mengelola booking PetWash.",
};

export default async function AdminPage() {
  let bookings: Array<{
    id: string;
    ownerName: string;
    phone: string;
    petName: string;
    petType: string;
    weight: number;
    bookingDate: string;
    bookingTime: string;
    status: "PENDING" | "CONFIRMED" | "SELESAI";
    serviceName: string;
  }> = [];

  try {
    await ensureServicesSeeded();
    const data = await prisma.booking.findMany({
      include: {
        service: true,
      },
      orderBy: [{ bookingDate: "asc" }, { bookingTime: "asc" }],
    });

    bookings = data.map((booking: {
      id: string;
      ownerName: string;
      phone: string;
      petName: string;
      petType: string;
      weight: number;
      bookingDate: Date;
      bookingTime: string;
      status: "PENDING" | "CONFIRMED" | "SELESAI";
      service: {
        name: string;
      };
    }) => ({
      id: booking.id,
      ownerName: booking.ownerName,
      phone: booking.phone,
      petName: booking.petName,
      petType: booking.petType,
      weight: booking.weight,
      bookingDate: booking.bookingDate.toISOString(),
      bookingTime: booking.bookingTime,
      status: booking.status,
      serviceName: booking.service.name,
    }));
  } catch {
    bookings = [];
  }

  return (
    <>
      <Navbar />
      <main className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Admin dashboard</p>
              <h1 className="font-display mt-3 text-5xl leading-tight text-slate-900 sm:text-6xl">
                Kelola booking masuk dengan cepat dari satu dashboard.
              </h1>
            </div>
            <div className="soft-card rounded-[2rem] p-5 text-sm leading-7 text-slate-600">
              Ubah status booking dari pending ke confirmed atau selesai, lalu hapus entri yang sudah tidak diperlukan. Versi ini belum menambahkan autentikasi admin, sehingga dashboard masih bersifat terbuka untuk pengembangan lanjutan.
            </div>
          </div>

          <AdminBookingTable initialBookings={bookings} />
        </section>
      </main>
      <Footer />
    </>
  );
}
