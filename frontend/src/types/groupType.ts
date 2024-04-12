export interface groupsType {
  _id: string;
  name: string;
  amount: number;
  types: string;
  member: number;
  round: number;
  members: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    imageUrl: {
      public_id: string;
      url: string;
    }; // Assuming 'image' is the URL of the image
  }[];
  status: string;
  createdOn: string;
  isCompleted: boolean;
  winners: string[];
  createdBy: string;
  rounds: {
    round_no: number;
    totalCollected: number;
    winner: string;
    winnerSelection_date: Date;
    distributedAmount: number;
  }[];
}
