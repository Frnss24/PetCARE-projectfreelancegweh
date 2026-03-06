"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarDays, LoaderCircle, PawPrint } from "lucide-react";
import { useForm } from "react-hook-form";
import { timeSlots } from "@/lib/data";
import type { ServiceView } from "@/lib/services";
import { bookingFormSchema, type BookingFormValues } from "@/lib/validations/booking";
import { formatCurrency } from "@/lib/utils";

type BookingFormProps = {
  services: ServiceView[];
};

export function BookingForm({ services }: BookingFormProps) {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const defaultServiceId = useMemo(() => services[0]?.id ?? "", [services]);
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      ownerName: "",
      phone: "",
      petName: "",
      petType: "kucing",
      weight: 3,
      serviceId: defaultServiceId,
      bookingDate: "",
      bookingTime: timeSlots[0],
    },
  });

  const minDate = new Date().toISOString().split("T")[0];

  const onSubmit = form.handleSubmit(async (values) => {
    setFeedback(null);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (!response.ok) {
      setFeedback({
        type: "error",
        message: result.error ?? "Booking gagal dikirim. Silakan coba lagi.",
      });
      return;
    }

    form.reset({
      ownerName: "",
      phone: "",
      petName: "",
      petType: "kucing",
      weight: 3,
      serviceId: defaultServiceId,
      bookingDate: "",
      bookingTime: timeSlots[0],
    });
    setFeedback({
      type: "success",
      message: "Booking berhasil dikirim. Tim PetWash akan segera menghubungi Anda.",
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="soft-card rounded-[2rem] p-6 sm:p-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Booking form</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">Jadwalkan kunjungan PetWash</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
          <CalendarDays className="h-4 w-4" />
          Slot harian terbatas
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
        <Field label="Nama pemilik" error={form.formState.errors.ownerName?.message}>
          <input {...form.register("ownerName")} className={inputClassName} placeholder="Contoh: Alya Putri" />
        </Field>

        <Field label="Nomor HP" error={form.formState.errors.phone?.message}>
          <input {...form.register("phone")} className={inputClassName} placeholder="08xxxxxxxxxx" />
        </Field>

        <Field label="Nama hewan" error={form.formState.errors.petName?.message}>
          <input {...form.register("petName")} className={inputClassName} placeholder="Milo" />
        </Field>

        <Field label="Jenis hewan" error={form.formState.errors.petType?.message}>
          <select {...form.register("petType")} className={inputClassName}>
            <option value="kucing">Kucing</option>
            <option value="anjing">Anjing</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </Field>

        <Field label="Berat hewan (kg)" error={form.formState.errors.weight?.message}>
          <input {...form.register("weight", { valueAsNumber: true })} className={inputClassName} type="number" min="0.5" step="0.1" />
        </Field>

        <Field label="Pilih layanan" error={form.formState.errors.serviceId?.message}>
          <select {...form.register("serviceId")} className={inputClassName}>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - {formatCurrency(service.price)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Pilih tanggal" error={form.formState.errors.bookingDate?.message}>
          <input {...form.register("bookingDate")} className={inputClassName} type="date" min={minDate} />
        </Field>

        <Field label="Pilih jam" error={form.formState.errors.bookingTime?.message}>
          <select {...form.register("bookingTime")} className={inputClassName}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>

        <div className="soft-card flex items-center gap-4 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/80 p-4 md:col-span-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <PawPrint className="h-5 w-5" />
          </span>
          <p className="text-sm leading-7 text-slate-600">
            Isi data dengan lengkap agar admin bisa mengonfirmasi slot dan kebutuhan perawatan hewan Anda dengan cepat.
          </p>
        </div>

        {feedback ? (
          <div
            className={`rounded-[1.5rem] px-4 py-3 text-sm font-medium md:col-span-2 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-900"
                : "bg-rose-50 text-rose-900"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
        >
          {form.formState.isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {form.formState.isSubmitting ? "Menyimpan booking..." : "Book Sekarang"}
        </button>
      </form>
    </motion.div>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60";
