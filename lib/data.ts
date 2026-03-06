export type ServiceSeed = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  accent: string;
};

export const serviceCatalog: ServiceSeed[] = [
  {
    slug: "basic-wash",
    name: "Basic Wash",
    shortDescription: "Mandi bersih dengan shampoo premium dan handuk hangat.",
    description:
      "Paket mandi rutin untuk menjaga bulu tetap bersih, wangi, dan nyaman untuk hewan peliharaan harian.",
    price: 75000,
    image: "/pets/basic-wash.svg",
    accent: "from-[#FDE7D8] via-[#FFF9F2] to-[#DDF4F0]",
  },
  {
    slug: "full-grooming",
    name: "Full Grooming",
    shortDescription: "Perawatan lengkap dari mandi, trimming, sampai blow dry styling.",
    description:
      "Layanan grooming menyeluruh untuk merapikan bulu, membersihkan area sensitif, dan memberi hasil akhir yang rapi.",
    price: 150000,
    image: "/pets/full-grooming.svg",
    accent: "from-[#DDF4F0] via-[#F7FEFB] to-[#FCE7F3]",
  },
  {
    slug: "anti-kutu-treatment",
    name: "Anti Kutu Treatment",
    shortDescription: "Treatment lembut untuk membantu mengatasi kutu dan gatal.",
    description:
      "Formulasi khusus untuk membantu membersihkan kutu dan menjaga kulit hewan lebih sehat tanpa membuat bulu kering.",
    price: 120000,
    image: "/pets/flea-treatment.svg",
    accent: "from-[#E8ECFF] via-[#FBFCFF] to-[#DDF4F0]",
  },
  {
    slug: "nail-clipping",
    name: "Nail Clipping",
    shortDescription: "Pemotongan kuku aman agar hewan tetap aktif dan nyaman.",
    description:
      "Layanan cepat untuk menjaga kuku tetap pendek, rapi, dan membantu mengurangi risiko lecet saat bermain.",
    price: 50000,
    image: "/pets/nail-clipping.svg",
    accent: "from-[#FFF1D6] via-[#FFF9F1] to-[#FFE4E6]",
  },
];

export const testimonials = [
  {
    name: "Alya Putri",
    role: "Pemilik Milo",
    quote:
      "Tim PetWash sabar banget. Milo biasanya tegang saat grooming, tapi kali ini pulang wangi dan tenang.",
    rating: 5,
  },
  {
    name: "Raka Mahendra",
    role: "Pemilik Bruno",
    quote:
      "Booking-nya cepat, admin responsif, dan hasil grooming Bruno rapi banget. Repeat pasti.",
    rating: 5,
  },
  {
    name: "Nina Kartika",
    role: "Pemilik Mochi",
    quote:
      "Saya suka karena mereka kasih update kondisi bulu dan kulit kucing saya sebelum treatment dimulai.",
    rating: 5,
  },
];

export const galleryItems = [
  {
    name: "Milo",
    beforeImage: "/gallery/milo-before.svg",
    afterImage: "/gallery/milo-after.svg",
  },
  {
    name: "Bruno",
    beforeImage: "/gallery/bruno-before.svg",
    afterImage: "/gallery/bruno-after.svg",
  },
];

export const bookingStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Selesai", value: "SELESAI" },
] as const;

export const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
