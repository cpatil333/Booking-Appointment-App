import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BOOK_APPOINTMENT } from "../apollo/Mutation";
import { useSelector } from "react-redux";

export const BookingForm = ({ onAdd }) => {
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "" });
  const [bookAppointment] = useMutation(BOOK_APPOINTMENT);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await bookAppointment({
        variables: {
          input: {
            date: form.date,
            startTime: `${form.date}T${form.startTime}:00Z`,
            endTime: `${form.date}T${form.endTime}:00Z`,
            userId: parseInt(user?.id),
          },
        },
      });

      console.log("Appointment booked:", data.bookAppointment);
      setForm({ date: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error("Error booking appointment", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};
