import { z } from "zod";

export const bookingFormSchema = z.object({
  ownerName: z.string().min(2, "Nama pemilik minimal 2 karakter."),
  phone: z
    .string()
    .min(8, "Nomor HP minimal 8 digit.")
    .regex(/^[0-9+\s-]+$/, "Nomor HP hanya boleh berisi angka, spasi, +, atau -."),
  petName: z.string().min(2, "Nama hewan minimal 2 karakter."),
  petType: z.enum(["kucing", "anjing", "lainnya"]),
  weight: z
    .number()
    .min(0.5, "Berat minimal 0.5 kg.")
    .max(100, "Berat maksimal 100 kg."),
  serviceId: z.string().min(1, "Silakan pilih layanan."),
  bookingDate: z
    .string()
    .min(1, "Silakan pilih tanggal booking.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Tanggal booking tidak valid."),
  bookingTime: z.string().min(1, "Silakan pilih jam booking."),
});

export const bookingStatusSchema = z.enum(["PENDING", "CONFIRMED", "SELESAI"]);

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type BookingStatusValue = z.infer<typeof bookingStatusSchema>;
