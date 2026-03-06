import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ServiceCard } from "@/components/service-card";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Daftar layanan grooming dan pencucian hewan profesional dari PetWash.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-8 rounded-[2.5rem] px-2 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-0 lg:py-12">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Services</p>
              <h1 className="font-display max-w-xl text-5xl leading-tight text-slate-900 sm:text-6xl">
                Paket layanan yang fleksibel untuk kebutuhan grooming rutin dan treatment khusus.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Pilih layanan sesuai kebutuhan hewan Anda. Setiap paket dirancang untuk menjaga kebersihan, kenyamanan, dan penampilan bulu tetap optimal.
              </p>
            </div>
            <div className="soft-card rounded-[2.5rem] p-6 text-sm leading-8 text-slate-600">
              <p>
                Semua layanan dikerjakan dengan pendekatan lembut, alat higienis, dan slot terjadwal agar hewan tidak perlu menunggu terlalu lama.
              </p>
              <p className="mt-4">
                Untuk hewan dengan kondisi kulit sensitif atau kebutuhan khusus, admin akan membantu menyesuaikan treatment sebelum booking dikonfirmasi.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
