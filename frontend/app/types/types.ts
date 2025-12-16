export type CowRequest = {
  name: string;
  breed: string;
  age: number;
};

export type CowResponse = {
  id: number;
  name: string;
  breed: string;
  age: number;
};

export type MilkRecordRequest = {
  cowId: number;
  date: string;
  amount: number;
};

export type MilkRecordResponse = {
  id: number;
  date: string; 
  amount: number;
  cowId: number;
  cowName: string;
};

export type MilkReportItem = {
  cowId: number;
  cowName: string;
  totalMilk: number;
};

export type MilkReportResponse = MilkReportItem[];

export type MilkSaleRequest = {
  milkRecordId: number;
  amountSold: number;
  totalPrice: number;
  saleDate: string;
  buyerName: string;
};

export type MilkSaleResponse = {
  id: number;
  amountSold: number;
  totalPrice: number;
  saleDate: string;
  buyerName: string;
};
