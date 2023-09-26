import type { Participant, Transaction } from "../interfaces/calculation";
import type { ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

export function getUserExpenses(expenses: ExpenseResponse[], userId: string) {
  const userExpenses = expenses.filter((x) => x.expenseUserId === userId);
  const totalUserExpenses = userExpenses.map((x) => x.expenseAmount).reduce((a, b) => a + b, 0);
  return totalUserExpenses;
}

export function calculateTotalExpenses(
  expenses: ExpenseResponse[],
  users: UserResponse[],
  amountToPayPerUser: number
): Participant[] {
  const result: Participant[] = [];

  for (const user of users) {
    const totalUserExpenses = getUserExpenses(expenses, user.id);
    const balance = totalUserExpenses - amountToPayPerUser;
    result.push({ id: user.id, name: user.username, balance });
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
        debtor: debtor.name,
        creditor: creditor.name,
        amount: transactionAmount
      });

      creditor.balance -= transactionAmount;
      debtor.balance += transactionAmount;
    }
  }

  return transactions;
}
