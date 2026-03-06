"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35 }}
      className="soft-card rounded-[2rem] p-6"
    >
      <div className="flex items-center gap-1 text-amber-500">
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 text-base leading-7 text-slate-700">“{quote}”</p>
      <div className="mt-6">
        <p className="text-lg font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </motion.article>
  );
}
