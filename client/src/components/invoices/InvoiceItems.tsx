import type { InvoiceType, InvoiceItemType } from "@/@types";
import { Plus, Trash2 } from "lucide-react";

type PropsType = {
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceType | null>>;
  invoiceData: InvoiceType | null;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: "billFrom" | "billTo" | null,
    index?: number
  ) => void;
};

const InvoiceItems = ({
  setInvoiceData,
  invoiceData,
  handleInputChange,
}: PropsType) => {
  const handleRemoveItem = (index: number) => {
    setInvoiceData((prevData: InvoiceType | null) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        items: prevData.items.filter((_, i) => i !== index),
      };
    });
  };

  const handleAddItem = () => {
    setInvoiceData((prevData: InvoiceType | null) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        items: [
          ...prevData.items,
          { name: "", quantity: 1, price: 0, taxPercentage: 0, total: 0 },
        ],
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm shadow-gray-10 border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-50">
        <h3 className="text-md font-medium text-slate-600 capitalize">
          invoice items
        </h3>
      </div>
      <div className="overflow-x-hidden">
        <table className="table text-slate-500">
          {/* head */}
          <thead className="text-xs text-slate-500 uppercase bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="font-medium text-left">item</th>
              <th className="font-medium text-center">qty</th>
              <th className="font-medium text-center">price</th>
              <th className="font-medium text-center">tax%</th>
              <th className="font-medium text-right">total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.items.map((item: InvoiceItemType, index: number) => {
              return (
                <tr key={index} className="text-xs md:text-sm cursor-pointer">
                  <td className="px-0">
                    <fieldset className="fieldset">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleInputChange(e, null, index)}
                        className="input w-full h-8 py-2 bg-emerald-50 border border-slate-200 
                              text-slate-600 text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="name.."
                      />
                    </fieldset>
                  </td>
                  <td className="px-0">
                    <fieldset className="fieldset">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(e, null, index)}
                        className="input w-full h-8 py-2 bg-emerald-50 border border-slate-200 text-center
                              text-slate-600 text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </fieldset>
                  </td>
                  <td className="px-0">
                    <fieldset className="fieldset">
                      <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={(e) => handleInputChange(e, null, index)}
                        className="input w-full h-8 py-2 bg-emerald-50 border border-slate-200 text-center
                              text-slate-600 text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </fieldset>
                  </td>
                  <td className="px-0">
                    <fieldset className="fieldset">
                      <input
                        type="number"
                        name="taxPercentage"
                        value={item.taxPercentage}
                        onChange={(e) => handleInputChange(e, null, index)}
                        className="input w-full h-8 py-2 bg-emerald-50 border border-slate-200 text-center
                              text-slate-600 text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </fieldset>
                  </td>
                  <td className="text-sm text-slate-600 text-right">
                    <span>
                      {(
                        (item.quantity || 0) *
                        (item.price || 0) *
                        (1 + (item.taxPercentage || 0) / 100)
                      ).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-1 sm:px-6 py-2">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      type="button"
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white"
                    >
                      <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-2 py-4 sm:px-6 border-t border-slate-200">
        <button
          type="button"
          onClick={handleAddItem}
          className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 border border-slate-300
             hover:border-slate-400 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add item
        </button>
      </div>
    </div>
  );
};

export default InvoiceItems;
