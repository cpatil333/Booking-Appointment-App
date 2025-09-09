import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime

  enum Role {
    USER
    ADMIN
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role!
    appointments: [Appointment!]!
  }

  type Appointment {
    id: ID!
    date: DateTime
    startTime: DateTime
    endTime: DateTime
    createdAt: DateTime
    userId: Int
    user: User!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AppointmentInput {
    date: DateTime
    startTime: DateTime
    endTime: DateTime
    userId: Int
  }
  type Query {
    users: [User!]!
    appointments: [Appointment!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signin(input: UserInput!): User!
    singup(input: LoginInput!): AuthPayload!
    bookAppointment(input: AppointmentInput!): Appointment
    cancelAppointment(id: ID!): Boolean
  }
`;
