export interface usersType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  is_approved: boolean;
  imageUrl: {
    public_id: string;
    url: string;
  };
  bank_account: {
    bank_name: string;
    account_holder_name: string;
    account_no: string;
  };
  address: string;
  city: string;
  ID: {
    front: {
      public_id: string;
      url: string;
    };
    back: {
      public_id: string;
      url: string;
    };
  };
}
