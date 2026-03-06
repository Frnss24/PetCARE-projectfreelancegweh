"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ServiceView } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

type ServiceCardProps = {
  service: ServiceView;
  showCta?: boolean;
};

export function ServiceCard({ service, showCta = true }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="soft-card overflow-hidden rounded-[2rem]"
    >
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${service.accent}`}>
        <Image src={service.image} alt={service.name} fill className="object-cover p-5" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pet care</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{service.name}</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
            {formatCurrency(service.price)}
          </span>
        </div>
        <p className="text-sm leading-7 text-slate-600">{service.description}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900">
            <Sparkles className="h-4 w-4" />
            {service.shortDescription}
          </div>
          {showCta ? (
            <Link
              href="/booking"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Pilih layanan
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
