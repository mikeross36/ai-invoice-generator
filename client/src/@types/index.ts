import type { LucideProps } from "lucide-react";

export const ERoutes = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  PROFILE: "/profile",
  UPDATE_PASSWORD: "/update-password",
  DASHBOARD: "/dashboard",
  INVOICES: "/invoices",
  CREATE_INVOICE: "/invoices/create-invoice",
  INVOICE_DETAILS: "/invoices",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  CONTACT: "/contact",
  ABOUT: "/about",
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegisterDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export type NavItemType = {
  id: string;
  name: string;
  icon: React.ComponentType<LucideProps>;
};

export type UserType = {
  _id?: string;
  username: string;
  email: string;
  businessName?: string;
  address?: string;
  phoneNumber?: string;
};

export type InvoiceItemType = {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  taxPercentage: number;
  total?: number;
};

export type InvoiceType = {
  _id?: string;
  user?: UserType;
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
  status?: string;
  notes: string;
  paymentTerms: string;
  subTotal: number;
  taxTotal: number;
  total: number;
};

export type RecentInvoiceType = {
  _id: string;
  invoiceNumber: string;
  issueDate: Date | string;
  dueDate: Date | string;
  status: string;
  total: number;
  billTo: {
    clientName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
};
