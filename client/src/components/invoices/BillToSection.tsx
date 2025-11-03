import type { SectionPropsType } from "./BillFromSection";

const BillToSection = ({
  invoiceData,
  handleInputChange,
}: SectionPropsType) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm shadow-gray-10 border-slate-200 space-y-4">
      <h4 className="text-md font-medium text-slate-600 mb-2 capitalize">
        bill to
      </h4>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          client name
        </legend>
        <input
          type="text"
          name="clientName"
          value={invoiceData?.billTo?.clientName}
          onChange={(e) => handleInputChange(e, "billTo", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="business name.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          client email
        </legend>
        <input
          type="email"
          name="email"
          value={invoiceData?.billTo?.email}
          onChange={(e) => handleInputChange(e, "billTo", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="email.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium text-slate-600 capitalize">
          client phone number
        </legend>
        <input
          type="text"
          name="phoneNumber"
          value={invoiceData?.billTo?.phoneNumber}
          onChange={(e) => handleInputChange(e, "billTo", 0)}
          className="input bg-emerald-50 border border-slate-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="phone number.."
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-lengend text-sm font-medium text-slate-600 capitalize">
          client address
        </legend>
        <textarea
          name="address"
          value={invoiceData?.billTo?.address}
          onChange={(e) => handleInputChange(e, "billTo", 0)}
          className="textarea bg-emerald-50 border border-gray-300 text-slate-600 text-sm rounded-lg 
                focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
          placeholder="address.."
        ></textarea>
      </fieldset>
    </div>
  );
};

export default BillToSection;
