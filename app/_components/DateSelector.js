"use client";

import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex min-w-0 flex-col justify-between">
      <DayPicker
        className="reservation-calendar w-full overflow-x-auto px-2 py-8 sm:px-6 sm:py-10"
        mode="range"
        onSelect={setRange}
        selected={range}
        disabled={[{ before: today }, ...bookedDates]}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="bg-accent-500 text-primary-900 flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
          <p className="flex items-baseline gap-2 whitespace-nowrap">
            {discount > 0 ? (
              <>
                <span className="text-xl font-semibold sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold sm:text-2xl">
                ${regularPrice}
              </span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2.5 py-1.5 text-lg sm:px-3 sm:py-2 sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="whitespace-nowrap">
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border-primary-900 hover:bg-accent-600 self-end border px-4 py-2 text-sm font-semibold transition-colors sm:self-auto"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
