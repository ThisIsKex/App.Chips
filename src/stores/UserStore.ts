import type { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { defineStore } from "pinia";
import type {
  CreateUserInput,
  CreateUserMutation,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelUserFilterInput
} from "../API";
import { createUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";

export interface UserResponse {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  userSessionId: string;
}

export const useUserStore = defineStore("user", () => {
  async function create(username: string, userSessionId: string) {
    try {
      const input: CreateUserInput = {
        username,
        userSessionId
      };

      const createUserResult = await API.graphql<GraphQLQuery<CreateUserMutation>>({
        query: createUser,
        variables: {
          input
        }
      });
      return createUserResult.data!.createUser!;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user.");
    }
  }

  async function listSessionUsers(sessionId: string) {
    try {
      const filter: ModelUserFilterInput = {
        userSessionId: { eq: sessionId }
      };

      const variables: ListUsersQueryVariables = {
        filter
      };

      const getUsersResult = await API.graphql<GraphQLQuery<ListUsersQuery>>({
        query: listUsers,
        variables
      });

      return getUsersResult.data?.listUsers?.items!.map((x) => x!) ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function findUserInSession(username: string, sessionId: string) {
    try {
      const filter: ModelUserFilterInput = {
        userSessionId: { eq: sessionId },
        username: { contains: username }
      };

      const variables: ListUsersQueryVariables = {
        filter
      };

      const getUsersResult = await API.graphql<GraphQLQuery<ListUsersQuery>>({
        query: listUsers,
        variables
      });

      const users = getUsersResult.data?.listUsers?.items!.map((x) => x!)!;
      if (users?.length !== 1) {
        return null;
      }

      return users[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { create, findUserInSession, listSessionUsers };
});
