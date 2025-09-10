import React, { useState } from "react";
import { BookingForm } from "../pages/BookingForm";
import { AppointmentList } from "../pages/AppointmentList";
import { useLoaderData } from "react-router-dom";

export const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const appList = useLoaderData();
  console.log(appList);
  setAppointments(appList);
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
