import { generateClient, type GraphQLQuery } from "@aws-amplify/api";
import { defineStore } from "pinia";
import type {
  CreateExpenseMutation,
  CreateExpenseMutationVariables,
  ListExpensesQuery,
  ListExpensesQueryVariables,
  ModelExpenseFilterInput
} from "../API";
import { createExpense } from "../graphql/mutations";
import { listExpenses } from "../graphql/queries";

export interface ExpenseResponse {
  id: string;
  expenseAmount: number;
  createdAt: string;
  updatedAt: string;
  expenseSessionId: string;
  expenseUserId: string;
}

export const useExpenseStore = defineStore("expense", () => {
  const client = generateClient();

  async function listSessionExpenses(
    sessionId: string,
    nextToken: string | null | undefined = null
  ) {
    try {
      const filter: ModelExpenseFilterInput = {
        expenseSessionId: { eq: sessionId }
      };

      const variables: ListExpensesQueryVariables = {
        filter,
        nextToken
      };

      const result = await client.graphql<GraphQLQuery<ListExpensesQuery>>({
        query: listExpenses,
        variables
      });

      return result.data?.listExpenses;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function listAllSessionExpenses(sessionId: string) {
    const resultItems: Array<ExpenseResponse> = [];

    let result = await listSessionExpenses(sessionId);
    if (!result?.items) {
      return [];
    }

    resultItems.push(...result.items.map((x) => x!));

    while (result?.nextToken) {
      result = await listSessionExpenses(sessionId, result?.nextToken);
      if (!result?.items) {
        continue;
      }

      resultItems.push(...result.items.map((x) => x!));
    }

    return resultItems;
  }

  async function create(sessionId: string, userId: string, expenseAmount: number) {
    try {
      const variables: CreateExpenseMutationVariables = {
        input: {
          expenseAmount,
          expenseSessionId: sessionId,
          expenseUserId: userId
        }
      };
      const result = await client.graphql<GraphQLQuery<CreateExpenseMutation>>({
        query: createExpense,
        variables
      });

      return result.data?.createExpense?.id != undefined;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { create, listSessionExpenses, listAllSessionExpenses };
});
