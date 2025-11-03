import type { InvoiceType } from "@/@types";

export type SectionPropsType = {
  invoiceData: InvoiceType | null;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: "billFrom" | "billTo" | null,
    index?: number
  ) => void;
};

const BillFromSection = ({
  invoiceData,
  handleInputChange,
}: SectionPropsType) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm shadow-gray-10 border-slate-200 space-y-4">
      <h4 className="text-md font-medium text-slate-600 mb-2 capitalize">
        bill from
      </h4>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          business name
        </legend>
        <input
          type="text"
          name="businessName"
          value={invoiceData?.billFrom?.businessName}
          onChange={(e) => handleInputChange(e, "billFrom", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="business name.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          email
        </legend>
        <input
          type="email"
          name="email"
          value={invoiceData?.billFrom?.email}
          onChange={(e) => handleInputChange(e, "billFrom", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="email.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          phone number
        </legend>
        <input
          type="text"
          name="phoneNumber"
          value={invoiceData?.billFrom?.phoneNumber}
          onChange={(e) => handleInputChange(e, "billFrom", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="phone number.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-lengend text-sm font-medium text-slate-600 capitalize">
          address
        </legend>
        <textarea
          name="address"
          value={invoiceData?.billFrom?.address}
          onChange={(e) => handleInputChange(e, "billFrom", 0)}
          className="textarea bg-emerald-50 border border-gray-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="address.."
        ></textarea>
      </fieldset>
    </div>
  );
};

export default BillFromSection;
