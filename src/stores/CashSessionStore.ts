import type { CreateExpense, CashSession, CreateCashSession, JoinSession } from "@/interfaces/cashSession";
import axios from "axios";
import { defineStore } from "pinia";

export const useCashSessionStore = defineStore("cashSession", () => {
  async function create(cashSession: CreateCashSession): Promise<CashSession> {
    try {
      const response = await axios.post<CashSession>("/", cashSession)
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred during session creation process.");
    }
  }

  async function getSession(id: string): Promise<CashSession | null> {
    try {
      const response = await axios.get<CashSession>(`?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function addExpense(sessionId: string, createExpense: CreateExpense): Promise<CashSession | null> {
    try {
      const response = await axios.put<CashSession>(`/add-expense?id=${sessionId}`, createExpense);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function joinSession(sessionId: string, joinSession: JoinSession): Promise<CashSession | null> {
    try {
      const response = await axios.put<CashSession>(`/join-session?id=${sessionId}`, joinSession);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  async function deleteExpense(sessionId: string, expenseId: string): Promise<CashSession | null> {
    try {
      const response = await axios.put<CashSession>(`/delete-expense?id=${sessionId}`, { "expenseId": expenseId });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { create, getSession, addExpense, joinSession, deleteExpense };
});
