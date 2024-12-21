export interface CashSession {
    id: string;
    name: string;
    users: Array<User>;
    expenses: Array<Expense>;
}

export interface Expense {
    id: string;
    amount: number;
    userId: string;
}

export interface User {
    id: string;
    name: string;
}

export interface CreateCashSession {
    name: string;
    users: Array<string>;
}

export interface CreateExpense {
    amount: number;
    userId: string;
}

export interface JoinSession {
    userName: string;
}