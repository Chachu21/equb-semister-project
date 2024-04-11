export interface transactionsType {
  _id: string;
  tx_ref: string;
  email: string;
  fname: string;
  lname: string;
  amount: number;
  currency: string;
  Chapa_reference: string;
  status: string;
  verified_at: Date;
  user: string;
  equbGroup: string;
}
