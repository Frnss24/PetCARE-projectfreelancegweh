"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Trash2 } from "lucide-react";
import { bookingStatusOptions } from "@/lib/data";
import { formatBookingDate } from "@/lib/utils";
import type { BookingStatusValue } from "@/lib/validations/booking";

type BookingItem = {
  id: string;
  ownerName: string;
  phone: string;
  petName: string;
  petType: string;
  weight: number;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatusValue;
  serviceName: string;
};

type AdminBookingTableProps = {
  initialBookings: BookingItem[];
};

export function AdminBookingTable({ initialBookings }: AdminBookingTableProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: BookingStatusValue) {
    setLoadingId(id);

    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
    }

    setLoadingId(null);
  }

  async function deleteBooking(id: string) {
    setLoadingId(id);

    const response = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setBookings((current) => current.filter((booking) => booking.id !== id));
    }

    setLoadingId(null);
  }

  if (bookings.length === 0) {
    return (
      <div className="soft-card rounded-[2rem] p-8 text-center text-sm text-slate-500">
        Belum ada booking yang masuk.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Total booking" value={String(bookings.length)} />
        <SummaryCard
          label="Perlu konfirmasi"
          value={String(bookings.filter((booking) => booking.status === "PENDING").length)}
        />
        <SummaryCard
          label="Selesai"
          value={String(bookings.filter((booking) => booking.status === "SELESAI").length)}
        />
      </div>

      <div className="space-y-4 lg:hidden">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            loading={loadingId === booking.id}
            onUpdateStatus={updateStatus}
            onDelete={deleteBooking}
          />
        ))}
      </div>

      <div className="soft-card hidden overflow-hidden rounded-[2rem] lg:block">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Pemilik</th>
              <th className="px-6 py-4 font-medium">Hewan</th>
              <th className="px-6 py-4 font-medium">Layanan</th>
              <th className="px-6 py-4 font-medium">Jadwal</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-slate-100 text-slate-700">
                <td className="px-6 py-5">
                  <p className="font-semibold text-slate-900">{booking.ownerName}</p>
                  <p className="text-xs text-slate-500">{booking.phone}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-slate-900">{booking.petName}</p>
                  <p className="text-xs text-slate-500">
                    {booking.petType} · {booking.weight} kg
                  </p>
                </td>
                <td className="px-6 py-5">{booking.serviceName}</td>
                <td className="px-6 py-5">
                  {formatBookingDate(booking.bookingDate)} · {booking.bookingTime}
                </td>
                <td className="px-6 py-5">
                  <select
                    value={booking.status}
                    onChange={(event) => updateStatus(booking.id, event.target.value as BookingStatusValue)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                    disabled={loadingId === booking.id}
                  >
                    {bookingStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    type="button"
                    onClick={() => deleteBooking(booking.id)}
                    disabled={loadingId === booking.id}
                    className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                  >
                    {loadingId === booking.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type BookingCardProps = {
  booking: BookingItem;
  loading: boolean;
  onUpdateStatus: (id: string, status: BookingStatusValue) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function BookingCard({ booking, loading, onUpdateStatus, onDelete }: BookingCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="soft-card rounded-[2rem] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{booking.ownerName}</h3>
          <p className="text-sm text-slate-500">{booking.phone}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(booking.id)}
          disabled={loading}
          className="rounded-full bg-rose-50 p-3 text-rose-700"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-900">Hewan:</span> {booking.petName} ({booking.petType}, {booking.weight} kg)
        </p>
        <p>
          <span className="font-semibold text-slate-900">Layanan:</span> {booking.serviceName}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Jadwal:</span> {formatBookingDate(booking.bookingDate)} · {booking.bookingTime}
        </p>
      </div>
      <select
        value={booking.status}
        onChange={(event) => onUpdateStatus(booking.id, event.target.value as BookingStatusValue)}
        className="mt-5 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4"
        disabled={loading}
      >
        {bookingStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.article>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
};

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="soft-card rounded-[2rem] p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
