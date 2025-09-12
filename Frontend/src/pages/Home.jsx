import { useEffect, useState } from "react";
import { BookingForm } from "../pages/BookingForm";
import { AppointmentList } from "../pages/AppointmentList";
import { useSelector } from "react-redux";
import { GET_APPOINTMENT } from "../apollo/Query";
import { client } from "../apollo/apolloClient";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_APPOINTMENT,
          variables: {
            myAppointmentsId: parseInt(user.id),
          },
          fetchPolicy: "network-only",
        });
        setAppointments(data.myAppointments); // adjust to your response
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) return <p>Loading…</p>;
  const addAppointment = (newAppt) => {
    setAppointments([...appointments, newAppt]);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <div className="container">
      <h1>Online Appointment Booking</h1>
      <BookingForm onAdd={addAppointment} />
      <AppointmentList
        appointments={appointments}
        onCancel={cancelAppointment}
      />
    </div>
  );
};
