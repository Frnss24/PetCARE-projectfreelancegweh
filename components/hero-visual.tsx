"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck2, ShieldCheck, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative"
    >
      <div className="soft-card relative overflow-hidden rounded-[2.5rem] p-4">
        <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/40 blur-3xl" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white/70">
          <Image
            src="/pets/hero-pets.svg"
            alt="Ilustrasi anjing dan kucing untuk layanan PetWash"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45 }}
        className="soft-card absolute -left-4 top-10 hidden max-w-[220px] rounded-[1.75rem] p-4 md:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Staff profesional</p>
            <p className="text-xs text-slate-500">Handling lembut dan higienis</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="soft-card absolute -right-3 bottom-20 hidden max-w-[230px] rounded-[1.75rem] p-4 md:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
            <CalendarCheck2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Booking terjadwal</p>
            <p className="text-xs text-slate-500">Slot jelas, tanpa antre panjang</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.32, duration: 0.45 }}
        className="soft-card absolute bottom-2 left-10 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-800"
      >
        <Sparkles className="h-4 w-4 text-rose-500" />
        4.9/5 dari pelanggan tetap
      </motion.div>
    </motion.div>
  );
}
