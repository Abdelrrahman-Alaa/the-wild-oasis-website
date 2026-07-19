import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();
  const user = session?.user;

  return (
    <div className="border-primary-800 bg-primary-950 grid overflow-hidden rounded-sm border xl:grid-cols-2">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {user ? <ReservationForm cabin={cabin} user={user} /> : <LoginMessage />}
    </div>
  );
}

export default Reservation;
