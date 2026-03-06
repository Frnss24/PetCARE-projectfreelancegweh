"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type GalleryItem = {
  name: string;
  beforeImage: string;
  afterImage: string;
};

type GallerySectionProps = {
  items: GalleryItem[];
};

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((item, index) => (
        <motion.article
          key={item.name}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
          className="soft-card overflow-hidden rounded-[2rem] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Before / After</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              Fresh result
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
              <Image
                src={item.beforeImage}
                alt={`${item.name} sebelum grooming`}
                width={520}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
              <Image
                src={item.afterImage}
                alt={`${item.name} sesudah grooming`}
                width={520}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
