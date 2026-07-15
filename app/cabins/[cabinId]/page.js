import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="mx-auto mt-2 max-w-6xl sm:mt-6 lg:mt-8">
      <div className="border-primary-800 mb-16 grid overflow-hidden border md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] lg:mb-24 lg:overflow-visible">
        <div className="relative aspect-4/3 md:aspect-auto md:min-h-105 lg:-translate-x-3 lg:scale-[1.08]">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div className="px-5 py-7 sm:px-8 md:px-8 md:py-10 lg:px-10">
          <h3 className="text-accent-100 lg:bg-primary-950 mb-6 text-4xl leading-tight font-black sm:text-5xl lg:-translate-x-36 lg:px-6 lg:py-3 lg:text-6xl xl:-translate-x-48 xl:text-7xl">
            Cabin {name}
          </h3>

          <p className="text-primary-300 mb-8 text-base leading-relaxed sm:text-lg lg:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-start gap-3 sm:items-center">
              <UsersIcon className="text-primary-600 mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex items-start gap-3 sm:items-center">
              <MapPinIcon className="text-primary-600 mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
              <span className="text-base sm:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-start gap-3 sm:items-center">
              <EyeSlashIcon className="text-primary-600 mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mx-auto max-w-3xl text-center text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
          Reserve {name} today. Pay on arrival.
        </h2>
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
