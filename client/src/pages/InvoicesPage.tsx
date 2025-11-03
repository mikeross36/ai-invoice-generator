import { useState, useEffect, useMemo } from "react";
import type { InvoiceType } from "@/@types";
import { useGetAllInvoices } from "@/hooks/queries";
import { useUpdateInvoice, useDeleteInvoice } from "@/hooks/mutations";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "@/@types";
import { AlertCircleIcon, Edit, Trash2, TextInitial } from "lucide-react";

import { FileCode2 } from "lucide-react";
import moment from "moment";
import GenerateWithAIModal from "@/components/ai/GenerateWithAIModal";
import ReminderModal from "@/components/invoices/ReminderModal";
import Loader from "@/components/Loader";
import SearchInvoices from "@/components/invoices/SearchInvoices";

const InvoicesPage = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [allInvoices, setAllInvoices] = useState<InvoiceType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );

  const { invoices, isLoading, error } = useGetAllInvoices();
  const navigate = useNavigate();
  const { updateInvoiceMutation } = useUpdateInvoice();
  const { deleteInvoiceMutation } = useDeleteInvoice();

  useEffect(() => {
    const getInvoices = async () => {
      try {
        if (invoices && invoices.length > 0) {
          const sortedInvoices = [...invoices].sort(
            (a: InvoiceType, b: InvoiceType) =>
              a?.issueDate && b?.issueDate
                ? new Date(b.issueDate).getTime() -
                  new Date(a.issueDate).getTime()
                : 0
          );
          setAllInvoices(sortedInvoices);
        } else {
          console.warn("No invoices to sort");
        }
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      }
    };
    getInvoices();
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return allInvoices
      .filter(
        (invoice) => statusFilter === "All" || invoice.status === statusFilter
      )
      .filter(
        (invoice) =>
          invoice.invoiceNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.billTo.clientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
  }, [allInvoices, statusFilter, searchTerm]);

  const handleStatusChange = async (invoice: InvoiceType | null) => {
    if (!invoice) {
      console.error("handleStatusChange: invoice is null");
      return;
    }
    try {
      const newStatus = invoice.status === "Paid" ? "Unpaid" : "Paid";
      const updatedInvoice: InvoiceType = {
        ...invoice,
        status: newStatus,
      };
      if (typeof invoice._id === "string") {
        await updateInvoiceMutation({
          invoiceId: invoice._id,
          invoiceData: updatedInvoice,
        });
      }
      setAllInvoices((prev) =>
        prev.map((inv) => (inv._id === invoice._id ? updatedInvoice : inv))
      );
    } catch (err) {
      console.error("Error updating invoice status:", err);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await deleteInvoiceMutation(id);
        setAllInvoices((prev) => prev.filter((inv) => inv._id !== id));
      } catch (err) {
        console.error("Error deleting invoice:", err);
      }
    }
  };

  const handleReminderModalOpen = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setReminderModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="space-y-8  md:px-8 lg:px-12 mx-auto">
      <GenerateWithAIModal
        aiModalOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
      <ReminderModal
        reminderModalOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        selectedInvoiceId={selectedInvoiceId}
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-600 capitalize">
            all invoices
          </h2>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Manage all your invoices in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiModalOpen(true)}
            type="button"
            className="btn btn-sm btn-primary bg-white hover:bg-slate-50 text-slate-600
            border border-slate-300 hover:border-slate-400 hover:shadow-md transition-all duration-200"
          >
            Generate with AI
          </button>
          <button
            onClick={() => navigate(ERoutes.CREATE_INVOICE)}
            type="button"
            className="btn btn-sm border border-slate-300 bg-emerald-500 hover:bg-emerald-600 text-white capitalize"
          >
            create invoice
          </button>
        </div>
      </div>
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-start">
            <AlertCircleIcon className="w-6 h-6 text-red-500 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-600">Errro</h3>
              <p className="text-sm text-red-700">
                {typeof error === "string"
                  ? error
                  : error.message || error?.toString()}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white w-full border border-slate-200 rounded-lg shadow-sm">
        <SearchInvoices
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {filteredInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 flex items-center justify-center mb-4 bg-red-50 rounded-full">
              <FileCode2 className="w-8 h-8 text-slate" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              No invoices found
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-md">
              Search did not match any invoice
            </p>
            {invoices.length === 0 && (
              <button
                onClick={() => navigate(ERoutes.CREATE_INVOICE)}
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white capitalize"
              >
                create invoice
              </button>
            )}
          </div>
        ) : (
          <div className="w-[90vw] md:w-auto overflow-x-auto">
            <table className="table text-slate-500">
              {/* head */}
              <thead className="text-xs text-slate-500 uppercase bg-emerald-50">
                <tr className="border-b border-slate-200">
                  <th className="font-semibold">invoice#</th>
                  <th className="font-semibold">client</th>
                  <th className="font-semibold">amount</th>
                  <th className="font-semibold">due date</th>
                  <th className="font-semibold">status</th>
                  <th className="font-semibold text-right">actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => {
                  return (
                    <tr
                      key={invoice._id}
                      className="text-xs md:text-sm hover:bg-emerald-50 cursor-pointer"
                    >
                      <td
                        onClick={() =>
                          navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                        }
                      >
                        {invoice.invoiceNumber}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                        }
                      >
                        {invoice.billTo.clientName}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                        }
                      >
                        {invoice.total?.toFixed(2)}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                        }
                      >
                        {moment(invoice.dueDate).format("DD/MM/YYYY")}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                        }
                      >
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
                              ${
                                invoice.status === "Paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : invoice.status === "Panding"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-end gap-2"
                        >
                          <button
                            onClick={() => handleStatusChange(invoice)}
                            type="button"
                            className="btn btn-xs text-xs bg-white text-slate-600 border
                              border-slate-300 hover:border-slate-500"
                          >
                            {invoice.status === "Paid"
                              ? "as unpaid"
                              : "as paid"}
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `${ERoutes.INVOICE_DETAILS}/${invoice._id}`
                              )
                            }
                            type="button"
                            className="btn btn-xs bg-white text-slate-600 border
                              border-slate-300 hover:border-slate-500"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (typeof invoice._id === "string") {
                                handleDeleteInvoice(invoice._id);
                              }
                            }}
                            className="btn btn-xs bg-white hover:bg-slate-50 text-slate-600 border
                              border-slate-300 hover:border-slate-500"
                          >
                            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                          </button>
                          {invoice.status !== "Paid" && (
                            <button
                              onClick={() => {
                                if (typeof invoice._id === "string") {
                                  handleReminderModalOpen(invoice._id);
                                }
                              }}
                              className="btn btn-xs bg-white text-slate-600 border border-slate-300 hover:border-slate-500"
                            >
                              <TextInitial className="w-4 h-4 " />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvoicesPage;
