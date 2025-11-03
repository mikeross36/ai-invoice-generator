import { useState } from "react";
import { useGenerateInvoice } from "@/hooks/mutations";
import { generateInvoice } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "@/@types";
import Loader from "@/components/Loader";

type PropsType = {
  aiModalOpen: boolean;
  onClose: () => void;
};

const GenerateWithAIModal = ({ aiModalOpen, onClose }: PropsType) => {
  const [text, setText] = useState<string>("");

  const { generateInvoiceMutation, isGenerateInvoiceLoading } =
    useGenerateInvoice();

  const navigate = useNavigate();

  const handleGenerateInvoice = async () => {
    try {
      const invoiceData = await generateInvoice(text);
      if (!invoiceData) {
        throw new Error("Invalid response from generate invoice api");
      }
      await generateInvoiceMutation(text);
      navigate(ERoutes.CREATE_INVOICE, {
        state: { AIGeneratedData: invoiceData },
      });
    } catch (err) {
      console.error("Error generating invoice:", err);
    }
  };

  if (!aiModalOpen) return null;

  if (isGenerateInvoiceLoading) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          onClick={onClose}
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-lg w-full 
        p-6 text-lefttransform transition-all"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center text-lg font-semibold text-slate-600">
              Generate Invoice with AI
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              close
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              {" "}
              Paste any text contains invoice information (client name, items,
              quantities, prices) and the AI will generate the invoice.
            </p>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-slate-600 capitalize">
                paste invoice text
              </legend>
              <textarea
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea h-24 bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg
                focus:ring-emerald-500 focus:border-emerald-500 block w-full"
                placeholder="invoice text..."
              ></textarea>
            </fieldset>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              type="button"
              className="btn btn-sm bg-white hover:bg-slate-50 text-slate-600
            border border-slate-300 hover:border-slate-400 capitalize"
            >
              cancel
            </button>
            <button
              onClick={handleGenerateInvoice}
              type="button"
              className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white capitalize"
            >
              generate invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateWithAIModal;
