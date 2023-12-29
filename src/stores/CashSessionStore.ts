import { generateClient, type GraphQLQuery } from "@aws-amplify/api";
import { defineStore } from "pinia";
import type {
  CreateCashSessionInput,
  CreateCashSessionMutation,
  GetCashSessionQuery,
  GetCashSessionQueryVariables
} from "../API";
import { createCashSession } from "../graphql/mutations";
import { getCashSession } from "../graphql/queries";

export const useCashSessionStore = defineStore("cashSession", () => {
  const client = generateClient();
  async function create(sessionName: string) {
    try {
      const input: CreateCashSessionInput = {
        sessionName
      };

      const result = await client.graphql<GraphQLQuery<CreateCashSessionMutation>>({
        query: createCashSession,
        variables: {
          input
        }
      });

      return result.data!.createCashSession!;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred during session creation process.");
    }
  }

  async function getSession(id: string) {
    try {
      const variables: GetCashSessionQueryVariables = {
        id
      };

      const graphQlResult = await client.graphql<GraphQLQuery<GetCashSessionQuery>>({
        query: getCashSession,
        variables
      });
      return graphQlResult.data!.getCashSession ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { create, getSession };
});
