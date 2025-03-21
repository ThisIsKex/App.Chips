export interface Participant {
  id: string;
  name: string;
  balance: number;
}

export interface Debtor {
  id: string;
  name: string;
}

export interface Creditor {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  debtor: Debtor;
  creditor: Creditor;
  amount: number;
}
