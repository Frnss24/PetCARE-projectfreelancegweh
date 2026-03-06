import prisma from "@/lib/prisma";
import { serviceCatalog } from "@/lib/data";

export type ServiceView = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  accent: string;
};

export async function ensureServicesSeeded() {
  await Promise.all(
    serviceCatalog.map((service) =>
      prisma.service.upsert({
        where: { slug: service.slug },
        update: {
          name: service.name,
          description: service.description,
          price: service.price,
          image: service.image,
        },
        create: {
          slug: service.slug,
          name: service.name,
          description: service.description,
          price: service.price,
          image: service.image,
        },
      }),
    ),
  );
}

export async function getServices(): Promise<ServiceView[]> {
  try {
    await ensureServicesSeeded();

    const services = await prisma.service.findMany({
      orderBy: { price: "asc" },
    });

    return services.map((service: {
      id: string;
      slug: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }) => {
      const seed = serviceCatalog.find((item) => item.slug === service.slug);

      return {
        id: service.id,
        slug: service.slug,
        name: service.name,
        description: service.description,
        shortDescription: seed?.shortDescription ?? service.description,
        price: service.price,
        image: service.image,
        accent: seed?.accent ?? "from-[#FDE7D8] to-[#DDF4F0]",
      };
    });
  } catch {
    return serviceCatalog.map((service) => ({
      id: service.slug,
      slug: service.slug,
      name: service.name,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price,
      image: service.image,
      accent: service.accent,
    }));
  }
}
