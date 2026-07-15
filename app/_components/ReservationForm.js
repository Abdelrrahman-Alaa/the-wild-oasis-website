"use client";

import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationForm({ cabin }) {
  const { range } = useReservation();
  const { maxCapacity } = cabin;
  const hasSelectedDates = range.from && range.to;

  return (
    <div className="border-primary-800 flex min-w-0 flex-col border-t xl:border-t-0 xl:border-l">
      <div className="bg-primary-800 text-primary-200 flex min-h-12 items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <p className="text-sm sm:text-base">Logged in as</p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <div className="bg-primary-950 text-primary-300 border-primary-800 border-b px-5 py-3 text-sm sm:px-8 lg:px-12">
        {hasSelectedDates ? (
          <p>
            Your stay: {format(range.from, "MMM dd, yyyy")} &ndash;{" "}
            {format(range.to, "MMM dd, yyyy")}
          </p>
        ) : (
          <p>Select your arrival and departure dates from the calendar.</p>
        )}
      </div>

      <form className="bg-primary-900 flex flex-1 flex-col gap-6 px-5 py-7 text-base sm:px-8 sm:py-9 lg:px-12 lg:py-10 lg:text-lg">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-100 text-primary-900 focus:ring-accent-500 w-full rounded-sm border border-transparent px-4 py-3 shadow-sm transition outline-none focus:ring-2"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-100 text-primary-900 focus:ring-accent-500 min-h-32 w-full resize-y rounded-sm border border-transparent px-4 py-3 shadow-sm transition outline-none focus:ring-2"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          {!hasSelectedDates && (
            <p className="text-primary-300 text-sm sm:text-base">
              Start by selecting dates
            </p>
          )}

          <button
            disabled={!hasSelectedDates}
            className="bg-accent-500 text-primary-900 hover:bg-accent-600 w-full px-6 py-3.5 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 sm:w-auto sm:px-8 sm:py-4"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
