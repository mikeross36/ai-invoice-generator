import mongoose from "mongoose";

export type UserType = mongoose.Document & {
  _id: string;
  username: string;
  email: string;
  password: string;
  businessName?: string;
  address?: string;
  phoneNumber?: string;
  comparePassword: (password: string) => Promise<boolean>;
};

export type InvoiceItemType = {
  name: string;
  quantity: number;
  price: number;
  taxPercentage: number;
  total: number;
};

export type InvoiceType = mongoose.Document & {
  user?: UserType | string;
  invoiceNumber: string;
  issueDate: Date | string;
  dueDate: Date | string;
  billFrom: {
    businessName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
  billTo: {
    clientName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
  items: InvoiceItemType[];
  total: number;
  notes: string;
  paymentTerms: string;
};

export type ProfileDataType = {
  username: string;
  email: string;
  businessName?: string;
  address?: string;
  phoneNumber?: string;
};

export type UpdatePasswordDataType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type InvoiceInsightsType = {
  insights: string[];
};
