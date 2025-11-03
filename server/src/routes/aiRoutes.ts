import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
import {
  generateInvoice,
  generateReminderContent,
  getInvoicesInsights,
} from "../controllers/aiController";

const aiRouter = express.Router();

aiRouter.use(authenticateUser);

aiRouter.post("/generate-invoice", generateInvoice);

aiRouter.post("/generate-reminder", generateReminderContent);

aiRouter.get("/insights", getInvoicesInsights);

export default aiRouter;
