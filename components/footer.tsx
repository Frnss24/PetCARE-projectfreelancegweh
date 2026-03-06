import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="soft-card mx-auto grid max-w-7xl gap-8 rounded-[2rem] px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">PetWash</p>
          <h3 className="font-display mt-3 max-w-xl text-3xl text-slate-900">
            Perawatan hewan yang bersih, tenang, dan terasa premium sejak pertama booking.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Kami membantu pemilik hewan menjaga kebersihan, kesehatan kulit, dan kenyamanan bulu dengan proses yang lembut dan terjadwal.
          </p>
        </div>

        <div className="grid gap-4 text-sm text-slate-600">
          <div className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4">
            <MapPin className="mt-0.5 h-5 w-5 text-slate-900" />
            <span>Jl. Pet Care No. 12, Jakarta Selatan</span>
          </div>
          <div className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4">
            <Phone className="mt-0.5 h-5 w-5 text-slate-900" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4">
            <Mail className="mt-0.5 h-5 w-5 text-slate-900" />
            <span>hello@petwash.id</span>
          </div>
          <div className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4">
            <Instagram className="mt-0.5 h-5 w-5 text-slate-900" />
            <Link href="https://instagram.com" className="transition-colors hover:text-slate-900">
              @petwash.id
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
