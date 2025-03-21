import type { Expense, User } from "@/interfaces/cashSession";
import type { Participant, Transaction } from "../interfaces/calculation";

export function getUserExpenses(expenses: Expense[], userId: string) {
  const userExpenses = expenses.filter((x) => x.userId === userId);
  const totalUserExpenses = userExpenses.map((x) => x.amount).reduce((a, b) => a + b, 0);
  return totalUserExpenses;
}

export function calculateTotalExpenses(
  expenses: Expense[],
  users: User[],
  amountToPayPerUser: number
): Participant[] {
  const result: Participant[] = [];

  for (const user of users) {
    const totalUserExpenses = getUserExpenses(expenses, user.id);
    const balance = totalUserExpenses - amountToPayPerUser;
    result.push({ id: user.id, name: user.name, balance });
  }

  return result;
}

export function calculateTransactions(participants: Participant[]): Transaction[] {
  const transactions: Transaction[] = [];
  const creditors: Participant[] = participants.filter((participant) => participant.balance > 0);
  const debtors: Participant[] = participants.filter((participant) => participant.balance < 0);

  for (const creditor of creditors) {
    for (const debtor of debtors) {
      const id = Math.floor(Math.random() * Date.now()).toString();
      let transactionAmount = 0;

      if (creditor.balance >= Math.abs(debtor.balance)) {
        transactionAmount = Math.abs(debtor.balance);
      } else {
        transactionAmount = creditor.balance;
      }

      if (transactionAmount === 0) {
        continue;
      }

      transactions.push({
        id,
        debtor: { id: debtor.id, name: debtor.name },
        creditor: { id: creditor.id, name: creditor.name },
        amount: transactionAmount
      });

      creditor.balance -= transactionAmount;
      debtor.balance += transactionAmount;
    }
  }

  return transactions;
}
