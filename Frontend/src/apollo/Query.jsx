import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      role
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query ($myAppointmentsId: ID!) {
    myAppointments(id: $myAppointmentsId) {
      id
      date
      startTime
      endTime
    }
  }
`;
