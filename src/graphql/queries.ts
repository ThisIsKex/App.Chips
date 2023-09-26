/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCashSession = /* GraphQL */ `query GetCashSession($id: ID!) {
  getCashSession(id: $id) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCashSessionQueryVariables,
  APITypes.GetCashSessionQuery
>;
export const listCashSessions = /* GraphQL */ `query ListCashSessions(
  $filter: ModelCashSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listCashSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      sessionName
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCashSessionsQueryVariables,
  APITypes.ListCashSessionsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    session {
      id
      sessionName
      createdAt
      updatedAt
      __typename
    }
    username
    createdAt
    updatedAt
    userSessionId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      createdAt
      updatedAt
      userSessionId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getExpense = /* GraphQL */ `query GetExpense($id: ID!) {
  getExpense(id: $id) {
    id
    session {
      id
      sessionName
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      username
      createdAt
      updatedAt
      userSessionId
      __typename
    }
    expenseAmount
    createdAt
    updatedAt
    expenseSessionId
    expenseUserId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExpenseQueryVariables,
  APITypes.GetExpenseQuery
>;
export const listExpenses = /* GraphQL */ `query ListExpenses(
  $filter: ModelExpenseFilterInput
  $limit: Int
  $nextToken: String
) {
  listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      expenseAmount
      createdAt
      updatedAt
      expenseSessionId
      expenseUserId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExpensesQueryVariables,
  APITypes.ListExpensesQuery
>;
