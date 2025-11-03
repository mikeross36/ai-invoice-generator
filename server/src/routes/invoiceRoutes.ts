import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
// import { validateSchema } from "../middlewares/validateSchema";
// import { createInvoiceSchema } from "../schemas/invoiceSchema";
import {
  createInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";

const invoiceRouter = express.Router();

invoiceRouter.use(authenticateUser);

invoiceRouter.post("/create", createInvoice);

invoiceRouter.get("/", getAllInvoices);

invoiceRouter.get("/:id", getInvoice);

invoiceRouter.patch("/update/:id", updateInvoice);

invoiceRouter.delete("/delete/:id", deleteInvoice);

export default invoiceRouter;
