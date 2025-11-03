import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";
import logger from "../utils/logger";
import mongoose from "mongoose";
import Invoice from "../models/invoiceModel";
import { InvoiceType, InvoiceInsightsType } from "../@types";

const googleApiKey = process.env.GOOGLE_API_KEY as string;
const llm = process.env.LLM as string;

const ai = new GoogleGenAI({ apiKey: googleApiKey });

const serverErrMsg = "Internal server error";

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    // type 'GenerateContentParameters'.
    const prompt = `You are a financial expert invoice data extraction AI.
        Analyze the following text and extract the relevant information to create an invoice.
        The output MUST be a valid JSON object. The JSON object MUST contain the following properties:
        {
            "clientName": string,
            "email": string (if availabel),
            "address": string (if availabel),
            "items":[
                {
                    "name": string,
                    "quantity": number,
                    "price": number
                }
            ]
        }
        Here is the text to parse:
        -- TEXT START --
        ${JSON.stringify(text)}
        -- TEXT END --
        Extract the relevant information from the text and output only as a valid JSON object.`;

    const response = await ai.models.generateContent({
      model: llm,
      contents: [prompt],
    });
    if (!response) {
      return res.status(500).json({ message: "AI response error" });
    }
    let responseText = response.text;
    if (typeof responseText !== "string") {
      if (typeof responseText === "function") {
        responseText = response.text;
      } else {
        throw new Error("Failed to extract text from AI response");
      }
    }
    const pureJSON = responseText
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    if (!pureJSON) {
      throw new Error("Failed to extract JSON from AI response");
    }
    const parsedData = JSON.parse(pureJSON);
    return res.status(200).json(parsedData);
  } catch (err) {
    logger.error(`Error generating invoice: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};
// generateReminderContent func from frontend sends invoiceId to backend
// backend finds invoice in db and generates reminder content using AI
export const generateReminderContent = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.body;
    if (!invoiceId || !mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(400).json({ message: "Missing or invalid invoice Id" });
    }
    const invoice = (await Invoice.findById(invoiceId)) as InvoiceType;
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    const prompt = `You are a financial expert and polite invoice reminder AI.
      Write a short and friendly reminder text to a client about an ovedued or upcoming invoice.
      Use the following invoice data to create text:
      - Client Name: ${invoice.billTo.clientName}
      - Invoice Number: ${invoice.invoiceNumber}
      - Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
      - Total Amount: ${invoice.total.toFixed(2)}
      The tone should be friendly and profsional but clear and concice.
      Start the reminder with "Subject: Invoice Reminder for invoice ${
        invoice.invoiceNumber
      }".`;

    const response = await ai.models.generateContent({
      model: llm,
      contents: [prompt],
    });
    if (!response) {
      return res.status(500).json({ message: "AI response error" });
    }
    return res.status(200).json({ reminderText: response.text });
  } catch (err) {
    logger.error(`Error generating reminder: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const getInvoicesInsights = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find({ user: req.user?._id });
    if (invoices.length === 0) {
      return res.status(404).json({
        insights: ["No invoices found. Unable to get insights"],
      } as InvoiceInsightsType);
    }
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(
      (invoice) => invoice.status === "Paid"
    );
    const unpaidInvoices = invoices.filter(
      (invoice) => invoice.status === "Unpaid"
    );
    const paidTotal = paidInvoices.reduce(
      (acc, invoice) => acc + invoice.total,
      0
    );
    const unpaidTotal = unpaidInvoices.reduce(
      (acc, invoice) => acc + invoice.total,
      0
    );

    const dataSummary: InvoiceInsightsType = {
      insights: [
        `Total invoices: ${totalInvoices}`,
        `Total paid invoices: ${paidInvoices.length}`,
        `Total unpaid invoices ${unpaidInvoices.length}`,
        `Paid total: ${paidTotal.toFixed(2)}`,
        `Unpaid total: ${unpaidTotal.toFixed(2)}`,
        `Recent invoices (last 5): ${invoices
          .slice(-5)
          .map((invoice) => {
            return `${invoice.invoiceNumber} - ${invoice.total.toFixed(2)}`;
          })
          .join(",")}`,
      ],
    };

    const prompt = `You are a friendly and professional invoice insights AI for a small business owner.
    Based on the following summary of their invoice data, provide 2 or 3 concise and actionable suggestions 
    for the business owner to improve their business. Each insight should be a short string in a JSON array.
    The insights should be encouraging and helpful. Do not just repeat the data provided in the summary.
    For example, if there is a high unpaid total balance, you might suggest that they shoud focus on ther 
    collecton efforts and suggest sending reminders to their customers. If revenue is high, be encouraging.
    Here is the data summary:
    -- SUMMARY START --
    ${JSON.stringify(dataSummary)}
    -- SUMMARY END --

    Return your response as a valid JSON object with a single key named "insights" which is an array of strings.
    Example response: {"insights": [
      "Your revenue is looking strong this month. Keep up the good work!",
      "You have a high unpaid total balance. Consider sending reminders to your clients.",
      "Your collection efforts are looking strong. Keep up the good work!"
    ]}`;

    const response = await ai.models.generateContent({
      model: llm,
      contents: [prompt],
    });
    if (!response) {
      return res.status(500).json({ message: "AI response error" });
    }
    const responseText = response.text;
    const jsonData = responseText
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    if (!jsonData) {
      throw new Error("Failed to extract JSON data from AI response");
    }
    const insightsData = JSON.parse(jsonData) as string[];
    // console.log(insightsData);
    return res.status(200).json(insightsData);
  } catch (err) {
    logger.error(`Error generating insights: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};
