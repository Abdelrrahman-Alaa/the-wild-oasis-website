"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();
  const pathname = usePathname();
  const isCabinPage = /^\/cabins\/[^/]+\/?$/.test(pathname);

  if (!range.from || !range.to || isCabinPage) return null;

  return (
    <div className="bg-accent-500 text-primary-900 fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col gap-4 rounded-lg px-5 py-4 font-semibold shadow-xl shadow-slate-950 sm:bottom-6 sm:w-auto sm:flex-row sm:items-center sm:gap-8 sm:rounded-full sm:px-8 sm:py-5">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="hover:bg-accent-600 absolute top-3 right-3 rounded-full p-1 transition-all sm:static"
        onClick={resetRange}
        aria-label="Dismiss reservation reminder"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
