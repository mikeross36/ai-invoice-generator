import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

itemSchema.pre("save", function (next) {
  this.total = this.price * this.quantity * (1 + this.taxPercentage / 100);
  next();
});

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issueDate: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
      required: true,
    },
    billFrom: {
      businessName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String },
      phoneNumber: { type: String, required: true },
    },
    billTo: {
      clientName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    items: {
      type: [itemSchema],
      required: true,
    },
    notes: { type: String },
    paymentTerms: {
      type: String,
      default: "15 working days",
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Pending"],
      default: "Unpaid",
    },
    subTotal: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

invoiceSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    this.subTotal += item.price * item.quantity;
    this.taxTotal += item.price * item.quantity * (item.taxPercentage / 100);
    this.total += item.price * item.quantity * (1 + item.taxPercentage / 100);
  });
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
