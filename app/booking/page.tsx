import type { Metadata } from "next";
import { CalendarClock, HeartHandshake, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Booking",
  description: "Form booking layanan grooming dan pencucian hewan PetWash.",
};

export default async function BookingPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Book now</p>
            <h1 className="font-display text-5xl leading-tight text-slate-900 sm:text-6xl">
              Booking yang sederhana untuk sesi grooming yang lebih tenang.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              Isi form, pilih layanan, tanggal, dan jam yang diinginkan. Tim PetWash akan meninjau dan mengonfirmasi jadwal Anda sesegera mungkin.
            </p>
            <div className="grid gap-4">
              <InfoCard
                icon={<CalendarClock className="h-5 w-5" />}
                title="Slot terstruktur"
                description="Jadwal dirancang agar proses lebih rapi dan hewan tidak terlalu lama menunggu."
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Perawatan higienis"
                description="Peralatan dibersihkan rutin dan setiap layanan memakai produk yang aman untuk hewan."
              />
              <InfoCard
                icon={<HeartHandshake className="h-5 w-5" />}
                title="Komunikasi jelas"
                description="Admin akan menghubungi Anda jika ada penyesuaian treatment sesuai kondisi hewan."
              />
            </div>
          </div>

          <BookingForm services={services} />
        </section>
      </main>
      <Footer />
    </>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="soft-card rounded-[2rem] p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">{icon}</span>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
