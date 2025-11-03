import { useState, useEffect } from "react";
import type { InvoiceItemType, InvoiceType } from "@/@types";
import { useAuthUser, useGetAllInvoices } from "@/hooks/queries";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { MousePointerClick } from "lucide-react";
import { TERM_OPTIONS } from "@/utils/data";
import { useCreateInvoice, useUpdateInvoice } from "@/hooks/mutations";
import BillFromSection from "@/components/invoices/BillFromSection";
import BillToSection from "@/components/invoices/BillToSection";
import InvoiceItems from "@/components/invoices/InvoiceItems";
import Loader from "@/components/Loader";

type PropsType = {
  currentInvoice?: InvoiceType;
  handleUpdateInvoice?: (invoiceData: InvoiceType) => void;
};

const CreateInvoice = ({ currentInvoice, handleUpdateInvoice }: PropsType) => {
  const { authUser } = useAuthUser();
  const [invoiceData, setInvoiceData] = useState<InvoiceType | null>(
    currentInvoice ||
      (authUser && {
        invoiceNumber: "",
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        billFrom: {
          businessName: authUser?.businessName || "",
          email: authUser?.email || "",
          address: authUser?.address || "",
          phoneNumber: authUser?.phoneNumber || "",
        },
        billTo: {
          clientName: "",
          email: "",
          address: "",
          phoneNumber: "",
        },
        items: [{ name: "", quantity: 1, price: 0, taxPercentage: 0 }],
        notes: "",
        paymentTerms: "15 working days",
      }) ||
      null
  );
  const [generatingInvNumber, setGeneratingInvNumber] = useState(
    !currentInvoice
  );

  const location = useLocation();
  const { invoices } = useGetAllInvoices();
  const { createInvoiceMutation, isCreateInvoiceLoading } = useCreateInvoice();
  const { isUpdateInvoiceLoading } = useUpdateInvoice();

  useEffect(() => {
    const AIGeneratedData = location.state?.AIGeneratedData;
    if (AIGeneratedData) {
      try {
        setInvoiceData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            billTo: {
              ...prevData.billTo,
              clientName: AIGeneratedData.clientName || "",
              email: AIGeneratedData.email || "",
              address: AIGeneratedData.address || "",
              phoneNumber: AIGeneratedData.phoneNumber || "",
            },
            items: (AIGeneratedData.items || []).map(
              (item: InvoiceItemType) => ({
                name: item?.name || "",
                quantity: item?.quantity || 1,
                price: item?.price || 0,
                textPercentage: item?.taxPercentage || 0,
              })
            ),
          };
        });
      } catch (err) {
        console.error("Error updating invoice data:", err);
      }
    }
    if (currentInvoice) {
      setGeneratingInvNumber(false);
      setInvoiceData({
        ...currentInvoice,
        issueDate: new Date(currentInvoice.issueDate),
        dueDate: new Date(currentInvoice.dueDate),
      });
    } else {
      const generateNewInvNumber = async () => {
        setGeneratingInvNumber(true);
        try {
          let maxInvNumber = 0;
          invoices.forEach((invoice: InvoiceType) => {
            const invoiceNumber = parseInt(invoice.invoiceNumber.split("-")[1]);
            if (!isNaN(invoiceNumber) && invoiceNumber > maxInvNumber) {
              maxInvNumber = invoiceNumber;
            }
          });
          const newInvNumber = `INV-${String(maxInvNumber + 1).padStart(
            3,
            "0"
          )}`;
          setInvoiceData((prevData) => {
            if (!prevData) return prevData;
            return {
              ...prevData,
              invoiceNumber: newInvNumber,
              issueDate: moment(new Date().toISOString().split("T")[0]).format(
                "YYYY-MM-DD"
              ),
              dueDate: moment(new Date().toISOString().split("T")[0]).format(
                "YYYY-MM-DD"
              ),
            };
          });
        } catch (err) {
          console.error("Error generating invoice number:", err);
        } finally {
          setGeneratingInvNumber(false);
        }
      };
      generateNewInvNumber();
    }
  }, [location, currentInvoice, invoices]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: "billFrom" | "billTo" | null,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (section) {
      setInvoiceData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [name]: value,
          },
        };
      });
    } else if (index !== undefined) {
      const newItems = [...(invoiceData?.items || [])];
      newItems[index] = { ...newItems[index], [name]: value };
      setInvoiceData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          items: newItems,
        };
      });
    } else {
      setInvoiceData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };

  const handleFieldsetChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const { subTotal, taxTotal, total } = (() => {
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;
    if (invoiceData?.items) {
      invoiceData.items.forEach((item) => {
        subTotal += (item.price || 0) * (item.quantity || 0);
        taxTotal +=
          (item.price || 0) *
          (item.quantity || 0) *
          ((item.taxPercentage || 0) / 100);
        total +=
          (item.price || 0) *
          (item.quantity || 0) *
          (1 + (item.taxPercentage || 0) / 100);
      });
    }
    return { subTotal, taxTotal, total };
  })();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!invoiceData) {
        throw new Error("Please fill in all the fields!");
      }
      if (currentInvoice) {
        if (!currentInvoice._id) {
          throw new Error("Missing invoice id");
        }
        if (handleUpdateInvoice) {
          handleUpdateInvoice(invoiceData);
        }
      } else {
        try {
          createInvoiceMutation(invoiceData);
        } catch (err) {
          console.error("Error creating invoice:", err);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  if (isCreateInvoiceLoading || isUpdateInvoiceLoading) return <Loader />;

  return (
    <section className="lg:max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
      <form onSubmit={handleFormSubmit} className="space-y-8 pb-[100vh]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-600">
            {currentInvoice ? "Edit Invoice" : "Create Invoice"}
          </h2>
          <button
            type="submit"
            className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white"
          >
            {currentInvoice ? "Update Invoice" : "Create Invoice"}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm shadow-gray-10 border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                invoice number
              </legend>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData?.invoiceNumber}
                readOnly
                className="input block w-full p-2.5 bg-emerald-50 border border-slate-300 text-slate-600 
                text-sm rounded-lgfocus:ring-emerald-500 focus:border-emerald-500"
                placeholder={generatingInvNumber ? "Generating..." : ""}
              />
            </fieldset>
            <fieldset className="fieldset relative">
              <MousePointerClick
                className="absolute w-5 h-5 top-10 transform -translate-y-1/2 
              right-1 text-slate-600 z-2"
              />
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                issue date
              </legend>
              <input
                type="date"
                name="issueDate"
                value={
                  invoiceData?.issueDate
                    ? typeof invoiceData.issueDate === "string"
                      ? invoiceData.issueDate
                      : moment(invoiceData.issueDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    null
                  )
                }
                className="input block w-full p-2.5 bg-emerald-50 border border-slate-300 text-slate-600 
                text-sm rounded-lgfocus:ring-emerald-500 focus:border-emerald-500"
              />
            </fieldset>
            <fieldset className="fieldset relative">
              <MousePointerClick
                className="absolute w-5 h-5 top-10 transform -translate-y-1/2
              right-1 text-slate-600 z-2"
              />
              <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
                due date
              </legend>
              <input
                type="date"
                name="dueDate"
                value={
                  invoiceData?.dueDate
                    ? typeof invoiceData.dueDate === "string"
                      ? invoiceData.dueDate
                      : moment(invoiceData.dueDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    null
                  )
                }
                className="input block w-full p-2.5 bg-emerald-50 border border-slate-300 text-slate-600 
                text-sm rounded-lgfocus:ring-emerald-500 focus:border-emerald-500"
              />
            </fieldset>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BillFromSection
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
          />
          <BillToSection
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
          />
        </div>
        <InvoiceItems
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
          handleInputChange={handleInputChange}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-60">
          <div
            className="bg-white p-6 rounded-lg shadow-sm shadow-gray-100 border
          border-slate-200 space-y-4"
          >
            <h4 className="text-md font-medium text-slate-600 mb-2 capitalize">
              notes & terms
            </h4>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-slate-600 capitalize">
                notes
              </legend>
              <textarea
                name="notes"
                value={invoiceData?.notes}
                onChange={handleFieldsetChange}
                className="textarea h-24 bg-emerald-50 border border-slate-300 text-slate-600 text-sm 
                rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="notes..."
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend capitalize">
                payment terms
              </legend>
              <select
                name="paymentTerms"
                className="select bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border=emerald-500"
              >
                <option value="" disabled={true}>
                  Pick a term
                </option>
                {TERM_OPTIONS.map((option) => {
                  return (
                    <option key={option.id} value={option.value}>
                      {option.value}
                    </option>
                  );
                })}
              </select>
            </fieldset>
          </div>
          <div
            className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-sm
          shadow-gray-100 border border-slate-200"
          >
            <article className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal:</span>
                <span>{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax:</span>
                <span>{taxTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-slate-900 border-t border-slate-200 pt-4 mt-4">
                <span>Total:</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </article>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateInvoice;
