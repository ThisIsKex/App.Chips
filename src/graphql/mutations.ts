/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCashSession = /* GraphQL */ `mutation CreateCashSession(
  $input: CreateCashSessionInput!
  $condition: ModelCashSessionConditionInput
) {
  createCashSession(input: $input, condition: $condition) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCashSessionMutationVariables,
  APITypes.CreateCashSessionMutation
>;
export const updateCashSession = /* GraphQL */ `mutation UpdateCashSession(
  $input: UpdateCashSessionInput!
  $condition: ModelCashSessionConditionInput
) {
  updateCashSession(input: $input, condition: $condition) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCashSessionMutationVariables,
  APITypes.UpdateCashSessionMutation
>;
export const deleteCashSession = /* GraphQL */ `mutation DeleteCashSession(
  $input: DeleteCashSessionInput!
  $condition: ModelCashSessionConditionInput
) {
  deleteCashSession(input: $input, condition: $condition) {
    id
    sessionName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCashSessionMutationVariables,
  APITypes.DeleteCashSessionMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createExpense = /* GraphQL */ `mutation CreateExpense(
  $input: CreateExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  createExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExpenseMutationVariables,
  APITypes.CreateExpenseMutation
>;
export const updateExpense = /* GraphQL */ `mutation UpdateExpense(
  $input: UpdateExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  updateExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExpenseMutationVariables,
  APITypes.UpdateExpenseMutation
>;
export const deleteExpense = /* GraphQL */ `mutation DeleteExpense(
  $input: DeleteExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  deleteExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExpenseMutationVariables,
  APITypes.DeleteExpenseMutation
>;
