import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { InvoiceItemType, InvoiceType } from "@/@types";
import { useGetInvoice } from "@/hooks/queries";
import { AlertCircleIcon } from "lucide-react";
import { ERoutes } from "@/@types";
import { useUpdateInvoice } from "@/hooks/mutations";
import Loader from "@/components/Loader";
import ReminderModal from "@/components/invoices/ReminderModal";
import CreateInvoice from "@/pages/CreateInvoice";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const [editing, setEditing] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  const { invoiceId } = useParams();
  const { invoiceData, isLoading } = useGetInvoice(invoiceId ?? "");
  const { updateInvoiceMutation } = useUpdateInvoice();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!invoiceId) {
      console.error("Missing invoice id");
    }
    const fetchInvoice = async () => {
      try {
        setInvoice(invoiceData ?? null);
      } catch (err) {
        console.error("Error fething invoice:", err);
        if (err instanceof Error) {
          throw err;
        }
      }
    };
    fetchInvoice();
  }, [invoiceData, invoiceId]);

  const handleUpdateInvoice = async (invoiceData: InvoiceType) => {
    setEditing(true);
    try {
      updateInvoiceMutation({ invoiceId: invoiceId ?? "", invoiceData });
      setEditing(false);
      setInvoice(invoiceData);
    } catch (err) {
      console.error("Error updating invoice:", err);
      if (err instanceof Error) {
        throw err;
      }
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!invoice) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center 
    bg-slate-50 roundedlg"
      >
        <div className="w-16 h-16 flex items-center justify-centerbg-red-100 rounded-full mb-4">
          <AlertCircleIcon className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-600 capitalize">
          invoice not found
        </h3>
        <p className="text-slate-500 mb-6 max-w-md">
          The invoice you are looking for was not found
        </p>
        <button
          onClick={() => navigate(ERoutes.INVOICES)}
          className="btn btn-sm border border-slate-300 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <CreateInvoice
        currentInvoice={invoice}
        handleUpdateInvoice={handleUpdateInvoice}
      />
    );
  }

  return (
    <section className="w-full sm:px-6 md:px-8 lg:px-12 mx-auto">
      <ReminderModal
        reminderModalOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        selectedInvoiceId={invoiceId ?? ""}
      />
      <div className="w-full flex flex-col sm:flex-row items-start justify-between sm:items-center mb-6 print:hidden">
        <h3 className="text-xl font-semibold text-slate-600 mb-4 sm:mb-0">
          Invoice{" "}
          <span className="font-mono text-slate-400 ml-1">
            {invoice.invoiceNumber}
          </span>
        </h3>
        <div className="flex items-center gap-2">
          {invoice.status !== "Paid" && (
            <button
              onClick={() => setReminderModalOpen(true)}
              className="btn btn-sm btn-primary bg-white hover:bg-slate-100 text-slate-600
              border border-slate-300 hover:border-slate-400"
            >
              Get Reminder
            </button>
          )}
          <button
            onClick={() => setEditing(true)}
            className="btn btn-sm btn-primary bg-white hover:bg-slate-100 text-slate-600
            border border-slate-300 hover:border-slate-400 capitalize"
          >
            edit invoice
          </button>
          <button
            onClick={handlePrintInvoice}
            className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600
             border border-slate-300 hover:border-slate-400"
          >
            Print or Download
          </button>
        </div>
      </div>
      <div id="invoice-content-wrapper" className="max-w-7xl mx-auto">
        <div
          ref={invoiceRef}
          id="invoice-preview"
          className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-md border border-slate-200"
        >
          <article
            className="flex flex-col sm:flex-row items-statrt justify-between pb-4 
          border-b border-slate-200"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-600 uppercase">
                invoice
              </h3>
              <p className="text-sm text-slate-500">#{invoice.invoiceNumber}</p>
            </div>
            <div className="flex items-center gap-2 text-left mt-2 sm:mt-0">
              <p className="text-sm text-slate-500 capitalize">status</p>
              <span
                className={`inline-flex items-start sm:items-center px-2.5 py-0.5 rounded-full text-xs
                font-medium ${
                  invoice.status === "Paid"
                    ? "bg-emerald-100 text-emerald-800"
                    : invoice.status === "Panding"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {invoice.status}
              </span>
            </div>
          </article>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <article className="space-y-1">
              <h5 className="text-sm font-semibold text-slate-500 uppercase mb-2">
                bill from:
              </h5>
              <p className="text-sm font-semibold text-slate-600">
                {invoice.billFrom.businessName}
              </p>
              <p className="text-sm text-slate-600">
                {invoice.billFrom.address}
              </p>
              <p className="text-sm text-slate-600">{invoice.billFrom.email}</p>
              <p className="text-sm text-slate-600">
                {invoice.billFrom.phoneNumber}
              </p>
            </article>
            <article className="space-y-1 sm:text-right">
              <h5 className="text-sm font-semibold text-slate-500 uppercase mb-2">
                bill to:
              </h5>
              <p className="text-sm font-semibold text-slate-600">
                {invoice.billTo.clientName}
              </p>
              <p className="text-sm text-slate-600">{invoice.billTo.address}</p>
              <p className="text-sm text-slate-600">{invoice.billTo.email}</p>
              <p className="text-sm text-slate-600">
                {invoice.billTo.phoneNumber}
              </p>
            </article>
          </div>
          <div className="grid grid-cols-1 gap-1 my-4">
            <article className="flex items-center gap-1">
              <h5 className="text-xs font-semibold text-slate-500 uppercase">
                issue date:
              </h5>
              <p className="text-xs text-slate-600">
                {new Date(invoice.issueDate).toDateString()}
              </p>
            </article>
            <article className="flex items-center gap-1">
              <h5 className="text-xs font-semibold text-slate-500 uppercase">
                due date:
              </h5>
              <p className="text-xs text-slate-600">
                {new Date(invoice.dueDate).toDateString()}
              </p>
            </article>
            <article className="flex items-center gap-1">
              <h5 className="text-xs font-semibold text-slate-500 uppercase">
                payment terms:
              </h5>
              <p className="text-xs text-slate-600">{invoice.paymentTerms}</p>
            </article>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="table text-slate-500">
              {/* head */}
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="font-semibold">item</th>
                  <th className="font-semibold">qty</th>
                  <th className="font-semibold">price</th>
                  <th className="font-semibold">tax%</th>
                  <th className="font-semibold">total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item: InvoiceItemType) => {
                  return (
                    <tr
                      key={item._id}
                      className="text-xs md:text-sm hover:bg-slate-100 cursor-pointer"
                    >
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toFixed(2)}</td>
                      <td>{item.taxPercentage}</td>
                      <td>{item.total?.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <article className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm text-slate600">
                <span className="capitalize">subtotal:</span>
                <span>{invoice.subTotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate600">
                <span className="capitalize">tax:</span>
                <span>{invoice.taxTotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-semibold border-t border-slate-200 pt-3 mt-3">
                <span className="capitalize">total:</span>
                <span>{invoice.total?.toFixed(2)}</span>
              </div>
            </article>
          </div>
          {invoice.notes && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h5 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                notes
              </h5>
              <p className="text-sm text-slate-500">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @page {padding: 10px;}
        @media print { body * {visibility: hidden;}
          #invoice-content-wrapper, #invoice-content-wrapper * {visibility: visible;}
          #invoice-content-wrapper {position: absolute; left: 0; right: 0; top: 0; width: 100%;}
          #invoice-preview {box-shadow: none; border: none; border-radius: 0; padding: 0;}
        }`}</style>
    </section>
  );
};

export default InvoiceDetails;
