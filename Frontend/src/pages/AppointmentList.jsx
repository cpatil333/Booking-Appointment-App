import React from "react";

export const AppointmentList = ({ appointments, onCancel }) => {
  return (
    <div className="container">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id} style={{listStyle:"none"}}>
              {appt.date} at {appt.startTime} - {appt.endTime}
              <button onClick={() => onCancel(appt.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
