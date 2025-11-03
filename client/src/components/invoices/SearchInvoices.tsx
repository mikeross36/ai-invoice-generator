import { Search } from "lucide-react";
import { STATUS_OPTIONS } from "@/utils/data";

type PropsType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInvoices = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: PropsType) => {
  return (
    <div className="p-4 sm:p-6 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-1 z-10 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="input pl-8 sm:w-full bg-emerald-50 border border-slate-300 text-slate-400 text-sm
                rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
          />
        </div>
        <div className="sm:flex-shrink-0">
          <select
            name="status"
            defaultValue="All"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select bg-emerald-50 border border-slate-300 text-slate-500 text-sm
                rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            {STATUS_OPTIONS.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchInvoices;
