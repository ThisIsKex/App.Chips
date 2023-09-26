/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCashSession = /* GraphQL */ `subscription OnCreateCashSession(
  $filter: ModelSubscriptionCashSessionFilterInput
) {
  onCreateCashSession(filter: $filter) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCashSessionSubscriptionVariables,
  APITypes.OnCreateCashSessionSubscription
>;
export const onUpdateCashSession = /* GraphQL */ `subscription OnUpdateCashSession(
  $filter: ModelSubscriptionCashSessionFilterInput
) {
  onUpdateCashSession(filter: $filter) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCashSessionSubscriptionVariables,
  APITypes.OnUpdateCashSessionSubscription
>;
export const onDeleteCashSession = /* GraphQL */ `subscription OnDeleteCashSession(
  $filter: ModelSubscriptionCashSessionFilterInput
) {
  onDeleteCashSession(filter: $filter) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCashSessionSubscriptionVariables,
  APITypes.OnDeleteCashSessionSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onCreateExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateExpenseSubscriptionVariables,
  APITypes.OnCreateExpenseSubscription
>;
export const onUpdateExpense = /* GraphQL */ `subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onUpdateExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseSubscriptionVariables,
  APITypes.OnUpdateExpenseSubscription
>;
export const onDeleteExpense = /* GraphQL */ `subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onDeleteExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
