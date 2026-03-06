import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PetWash",
    template: "%s | PetWash",
  },
  description: "Website modern untuk layanan grooming dan pencucian hewan profesional bernama PetWash.",
  keywords: ["pet grooming", "pet wash", "grooming hewan", "booking grooming", "PetWash"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakartaSans.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
