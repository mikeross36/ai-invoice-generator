import nextId from "react-id-generator";
import {
  Wand,
  Mails,
  FileCode2,
  Files,
  LayoutDashboard,
  FilePlus2,
  User,
  RotateCcwKey,
} from "lucide-react";

export const FEATURES = [
  {
    id: nextId(),
    icon: Wand,
    title: "AI invoice generator",
    description:
      "Paste any text and let our AI generate invoices for you in seconds",
  },
  {
    id: nextId(),
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Track your invoices, payments, and analytics in one place",
  },
  {
    id: nextId(),
    icon: Mails,
    title: "Email reminders",
    description: "Receive reminders for your outstanding invoices and payments",
  },
  {
    id: nextId(),
    icon: FileCode2,
    title: "Invoice history",
    description: "View a history of your previous invoices and payments",
  },
];

export const TESTIMONIALS = [
  {
    id: nextId(),
    quote:
      "I love this invoice generator! It's so easy to use and I get my invoices done in minutes. Highly recommended!",
    author: "Michael Rogers",
    title: "CEO, Acme Inc.",
    avatar:
      "https://images.unsplash.com/photo-1754051486494-cfdbf29a589c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: nextId(),
    quote:
      "This app saved me hours of manual work and allowed me to focus on my core business activities. Highly recommended!",
    author: "Sarah Johnson",
    title: "Manager, XYZ Corp",
    avatar:
      "https://images.unsplash.com/photo-1758183583798-b7038bca9272?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: nextId(),
    quote:
      "I was skeptical at first, but this app has completely transformed the way I manage my invoices. It's a game changer!",
    author: "Novak Djokovic",
    title: "Tennis Legend",
    avatar:
      "https://www.novosti.rs/data/images/2025-09-06/630106_tan2025-09-0523471712-3_f.jpg",
  },
];

export const FAQS = [
  // {
  //   id: nextId(),
  //   question: "How can I create an invoice?",
  //   answer:
  //     "You can create an invoice by clicking the 'Create Invoice' button in the dashboard.",
  // },
  {
    id: nextId(),
    question: "Can I add a payment method?",
    answer:
      "Yes, you can add a payment method by clicking the 'Add Payment Method' button in the dashboard.",
  },
  {
    id: nextId(),
    question: "How do I track my payments?",
    answer:
      "You can track your payments by clicking the 'Payments' button in the dashboard.",
  },
  {
    id: nextId(),
    question: "Can I view my invoice history?",
    answer:
      "Yes, you can view your invoice history by clicking the 'Invoice History' button in the dashboard.",
  },
  {
    id: nextId(),
    question: "Can I view my analytics?",
    answer:
      "Yes, you can view your analytics by clicking the 'Analytics' button in the dashboard.",
  },
  {
    id: nextId(),
    question: "Is the app secure?",
    answer:
      "Yes. Our app is secure and uses the latest encryption technologies to protect your data.",
  },
  {
    id: nextId(),
    question: "Can I get support?",
    answer:
      "Yes. You can contact our support team for any questions or concerns.",
  },
];

export const MENU_ITEMS = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "profile",
    name: "Profile",
    icon: User,
  },
  {
    id: "invoices",
    name: "Invoices",
    icon: Files,
  },
  {
    id: "invoices/create-invoice",
    name: "Create Invoice",
    icon: FilePlus2,
  },
  {
    id: "update-password",
    name: "Update Password",
    icon: RotateCcwKey,
  },
];

export const STATUS_OPTIONS = [
  {
    id: nextId(),
    value: "All",
  },
  {
    id: nextId(),
    value: "Unpaid",
  },
  {
    id: nextId(),
    value: "Paid",
  },

  {
    id: nextId(),
    value: "Pending",
  },
];

export const TERM_OPTIONS = [
  {
    id: nextId(),
    value: "15 working days",
  },
  {
    id: nextId(),
    value: "30 working days",
  },
  {
    id: nextId(),
    value: "45 working days",
  },
  {
    id: nextId(),
    value: "60 working days",
  },
];
