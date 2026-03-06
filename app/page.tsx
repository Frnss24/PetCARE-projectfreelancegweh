import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, HeartHandshake, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { GallerySection } from "@/components/gallery-section";
import { HeroVisual } from "@/components/hero-visual";
import { Navbar } from "@/components/navbar";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { galleryItems, testimonials } from "@/lib/data";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Layanan Grooming & Pencucian Hewan Profesional",
  description:
    "PetWash menghadirkan layanan grooming, basic wash, anti kutu treatment, dan nail trimming dengan booking online yang mudah.",
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "Produk aman",
    description: "Perawatan higienis dengan formula lembut untuk kulit sensitif.",
  },
  {
    icon: Clock3,
    title: "Jadwal rapi",
    description: "Booking slot lebih praktis tanpa antre panjang di lokasi.",
  },
  {
    icon: HeartHandshake,
    title: "Handling sabar",
    description: "Pendekatan tenang agar hewan tetap nyaman selama treatment.",
  },
];

export default async function Home() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="overflow-hidden px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-slate-500">Modern pet care</p>
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Layanan Grooming & Pencucian Hewan Profesional
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-slate-600 sm:text-lg">
              PetWash membantu pemilik hewan menjaga bulu tetap bersih, kulit tetap nyaman, dan jadwal perawatan tetap rapi dengan sistem booking online yang praktis.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:-translate-y-0.5"
              >
                Book Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 hover:border-slate-300"
              >
                Lihat layanan
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="soft-card rounded-[1.75rem] p-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </section>

        <section className="mx-auto mt-20 max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Services</p>
              <h2 className="font-display mt-3 text-4xl text-slate-900 sm:text-5xl">Paket layanan untuk kebutuhan harian sampai treatment khusus</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Mulai dari mandi rutin hingga treatment anti kutu, setiap layanan disusun agar praktis untuk pemilik hewan dan nyaman untuk peliharaan.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl rounded-[2.5rem] bg-slate-900 px-6 py-10 text-white sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Testimonials</p>
              <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Dipercaya pemilik hewan yang menginginkan proses rapi dan hasil bersih.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gallery</p>
              <h2 className="font-display mt-3 text-4xl text-slate-900 sm:text-5xl">Sebelum & sesudah grooming</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Tampilan visual ini memberi gambaran perubahan setelah sesi grooming, trimming, dan finishing di PetWash.
            </p>
          </div>
          <GallerySection items={galleryItems} />
        </section>

        <section className="mx-auto mt-20 max-w-7xl">
          <div className="soft-card grid gap-8 rounded-[2.5rem] p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Ready to book</p>
              <h2 className="font-display mt-3 text-4xl text-slate-900 sm:text-5xl">Buat jadwal mandi atau grooming hewan Anda hari ini.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Pilih layanan, tentukan waktu, lalu kirim form booking. Data akan langsung masuk ke dashboard admin untuk diproses.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5"
            >
              Book Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
