import { Request, Response } from "express";
import { UserType, InvoiceType, InvoiceItemType } from "../@types";
import Invoice from "../models/invoiceModel";
import logger from "../utils/logger";

const serverErrMsg = "Internal server error";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserType;
    const existingInvoice = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    }).exec();
    if (existingInvoice) {
      return res
        .status(409)
        .json({ message: "Conflict: Invoice already exists!" });
    }
    const invoice = (await Invoice.create({
      user: user._id,
      ...req.body,
    })) as unknown as InvoiceType;
    return res.status(201).json({ invoice, message: "Invoice created" });
  } catch (err) {
    logger.error(`Error creating invoice: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

// export const createInvoice = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as UserType;
//     const {
//       invoiceNumber,
//       issueDate,
//       dueDate,
//       billFrom,
//       billTo,
//       items,
//       notes,
//       paymentTerms,
//     } = req.body;
//     if (
//       !invoiceNumber ||
//       !issueDate ||
//       !dueDate ||
//       !billFrom ||
//       !billTo ||
//       !items ||
//       !notes ||
//       !paymentTerms
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Invalid invoice data. All fields are required" });
//     }
//     let subTotal = 0;
//     let taxTotal = 0;
//     let total = 0;

//     items.forEach((item: InvoiceItemType) => {
//       subTotal += item.price * item.quantity;
//       taxTotal += (item.taxPercentage / 100) * item.price * item.quantity;
//       total += (1 + item.taxPercentage / 100) * item.price * item.quantity;
//     });

//     const invoice = (await Invoice.create({
//       user: user._id,
//       invoiceNumber,
//       issueDate,
//       dueDate,
//       billFrom,
//       billTo,
//       items,
//       notes,
//       paymentTerms,
//       subTotal,
//       taxTotal,
//       total,
//     })) as unknown as InvoiceType;
//     return res.status(201).json({ data: invoice, message: "Invoice created" });
//   } catch (err) {
//     logger.error(`Error creating invoice: ${err as string}`);
//     return res.status(500).json({ message:serverErrMsg });
//   }
// };

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserType;
    const invoices = await Invoice.find({ user: user._id })
      .populate("user", "username email")
      .exec();
    if (!invoices) {
      return res.status(404).json({ message: "Invoices not found" });
    }
    const totalInvoices = await Invoice.countDocuments({ user: user._id });
    return res.status(200).json({ totalInvoices, invoices });
  } catch (err) {
    logger.error(`Error getting all invoices: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceId = req.params.id;
    if (!invoiceId || typeof invoiceId !== "string") {
      return res.status(400).json({ message: "Invalid invoice id" });
    }
    const invoice = await Invoice.findById(req.params.id)
      .populate("user", "username email")
      .exec();
    if (!invoice) {
      throw new Error(`Invoice with id ${invoiceId} not found`);
    }
    return res.status(200).json(invoice);
  } catch (err) {
    logger.error(`Error getting invoice: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceId = req.params.id;
    if (!invoiceId || typeof invoiceId !== "string") {
      return res.status(400).json({ message: "Invalid invoice id" });
    }
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!invoice) {
      throw new Error(`Invoice with id ${invoiceId} not found`);
    }
    return res.status(200).json({ invoice, message: "Invoice updated" });
  } catch (err) {
    logger.error(`Error updating invoice: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceId = req.params.id;
    if (!invoiceId || typeof invoiceId !== "string") {
      return res.status(400).json({ message: "Invalid invoice id" });
    }
    const invoice = await Invoice.findById(req.params.id).exec();
    if (!invoice) {
      throw new Error(`Invoice with id ${invoiceId} not found`);
    }
    await Invoice.findByIdAndDelete(req.params.id).exec();
    return res.status(200).json({ message: "Invoice deleted" });
  } catch (err) {
    logger.error(`Error deleting invoice: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};
