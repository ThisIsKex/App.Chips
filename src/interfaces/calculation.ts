export interface Participant {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  debtor: string;
  creditor: string;
  amount: number;
}
