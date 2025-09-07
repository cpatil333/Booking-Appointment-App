import { gql } from "apollo-server";

export const typeDefs = gql`
scalar DateTime
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    appointments: [Appointment!]!
  }

  type Appointment {
    id: ID!
    date: DateTime
    time: String
    createdAt: DateTime
    userId: Int
    user: User!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    date: DateTime
    time: String
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
    signin(input: UserInput): User!
    singup(input: LoginInput): AuthPayload!
  }
`;
