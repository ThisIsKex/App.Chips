import type { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
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
  async function create(sessionName: string) {
    try {
      const input: CreateCashSessionInput = {
        sessionName
      };

      const result = await API.graphql<GraphQLQuery<CreateCashSessionMutation>>({
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

      const graphQlResult = await API.graphql<GraphQLQuery<GetCashSessionQuery>>({
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
