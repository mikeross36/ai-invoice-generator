import { z } from "zod";

const invoiceItemSchema = z.object({
  name: z.string().min(1, "Item description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be non-negative"),
  taxPercentage: z.number().min(0).max(100, "Tax must be between 0 and 100"),
  total: z.number().min(0, "Total must be non-negative"),
});

const invoiceSchema = z.object({
  user: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  issueDate: z.date().refine((date) => date instanceof Date, {
    message: "Invalid date",
  }),
  dueDate: z.date().refine((date) => date instanceof Date, {
    message: "Invalid date",
  }),
  billFrom: z.object({
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().email({ message: "Invalid email" }),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  }),
  billTo: z.object({
    clientName: z.string().min(1, "Client name is required"),
    email: z.string().email({ message: "Invalid email" }),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  }),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  notes: z.string().min(1, "Notes are required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  subTotal: z.number().min(0, "Sub total must be non-negative"),
  taxTotal: z.number().min(0, "Tax total must be non-negative"),
  total: z.number().min(0, "Total must be non-negative"),
});

export const createInvoiceSchema = invoiceSchema;
