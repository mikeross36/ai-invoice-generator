import { useState, useEffect } from "react";
import { useGetAllInvoices } from "@/hooks/queries";
import type { RecentInvoiceType } from "@/@types";
import toast from "react-hot-toast";
import nextId from "react-id-generator";
import { FileCode2, Euro, Plus } from "lucide-react";
import { ERoutes } from "@/@types";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import Loader from "@/components/Loader";
import InsightsCard from "@/components/dashboard/InsightsCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    paidTotal: 0,
    unpaidTotal: 0,
  });
  const [recentInvoices, setRecentInvoices] = useState<RecentInvoiceType[]>([]);

  const { invoices, isLoading } = useGetAllInvoices();
  const navigate = useNavigate();

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        if (invoices.length > 0) {
          const totalInvoices = invoices.length;
          const paidInvoicesTotal = invoices
            .filter((invoice: RecentInvoiceType) => invoice.status === "Paid")
            .reduce(
              (acc: number, invoice: RecentInvoiceType) => acc + invoice.total,
              0
            );
          const unpaidInvoicesTotal = invoices
            .filter((invoice: RecentInvoiceType) => invoice.status === "Unpaid")
            .reduce(
              (acc: number, invoice: RecentInvoiceType) => acc + invoice.total,
              0
            );

          setStats((prev) => {
            return {
              ...prev,
              totalInvoices,
              paidTotal: paidInvoicesTotal,
              unpaidTotal: unpaidInvoicesTotal,
            };
          });

          const sorted = [...invoices].sort(
            (a: RecentInvoiceType, b: RecentInvoiceType) =>
              new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
          );

          setRecentInvoices(sorted.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        toast.error("Error fetching dashboard stats");
      }
    };

    getDashboardStats();
  }, [invoices]);

  const statsData = [
    {
      id: nextId(),
      icon: FileCode2,
      title: "Total Invoices",
      value: stats.totalInvoices,
      color: "cyan",
    },
    {
      id: nextId(),
      icon: Euro,
      title: "Paid Ivoices Total",
      value: `${stats.paidTotal.toFixed(2)}`,
      color: "emerald",
    },
    {
      id: nextId(),
      icon: Euro,
      title: "Unpaid Invoices Total",
      value: `${stats.unpaidTotal.toFixed(2)}`,
      color: "rose",
    },
  ];

  const colorClasses = {
    cyan: { bg: "bg-cyan-500", text: "text-white" },
    emerald: { bg: "bg-emerald-500", text: "text-white" },
    rose: { bg: "bg-rose-500", text: "text-white" },
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-600">Dashboard</h2>
        <p className="text-sm text-slate-500 capitalize">invoices summary</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => {
          return (
            <article
              key={stat.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-lg shadow-gray-300"
            >
              <menu className="flex items-center space-x-4">
                <span
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md ${
                    colorClasses[stat.color as keyof typeof colorClasses].bg
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      colorClasses[stat.color as keyof typeof colorClasses].text
                    }`}
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500 truncate">
                    {stat.title}:
                  </p>
                </div>
                <h4 className="md:text-lg font-bold text-slate-600 break-words">
                  {stat.value}
                </h4>
              </menu>
            </article>
          );
        })}
      </div>
      <InsightsCard />
      <div
        className="w-full bg-white rounded-lg border border-slate-200 shadow-sm
      shadow-gray-200 overflow-hidden"
      >
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-4 border-b 
        border-slate-200 bg-slate-50"
        >
          <h4 className="text-sm md:text-lg font-semibold text-slate-600 capitalize">
            recent invoices
          </h4>
          <button
            onClick={() => navigate(ERoutes.INVOICES)}
            className="btn btn-sm border border-slate-300 bg-emerald-500 hover:bg-emerald-600 text-white capitalize"
          >
            view all
          </button>
        </div>
        {recentInvoices.length > 0 ? (
          <div className="w-[90vw] md:w-auto overflow-x-auto">
            <table className="table text-slate-500">
              <thead className="text-xs text-slate-500 uppercase ">
                <tr className="border-b border-slate-200 bg-emerald-50">
                  <th className="font-semibold">client</th>
                  <th className="font-semibold">invoice#</th>
                  <th className="font-semibold">amount</th>
                  <th className="font-semibold">status</th>
                  <th className="font-semibold">due date</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => {
                  return (
                    <tr
                      onClick={() =>
                        navigate(`${ERoutes.INVOICE_DETAILS}/${invoice._id}`)
                      }
                      key={invoice._id}
                      className="text-xs md:text-sm hover:bg-emerald-50 cursor-pointer"
                    >
                      <td className="px-4 py-2 md:py-4 whitespace-nowrap">
                        <span className="text-xs md:text-sm font-medium text-slate-600">
                          {invoice.billTo.clientName}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:py-4 whitespace-nowrap">
                        <span className="text-xs md:text-sm font-medium text-slate-600">
                          #{invoice.invoiceNumber}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:py-4 whitespace-nowrap">
                        <span className="text-xs md:text-sm font-medium text-slate-600">
                          {invoice.total?.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs md:text-sm font-medium
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
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-500">
                        {moment(invoice.dueDate).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-100">
              <FileCode2 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600">
              No recent invoices
            </h3>
            <p className="text-slate-500 mb-6 max-w-md">
              You have&apos;t created any invoice yet.
            </p>
            <Link
              to={ERoutes.CREATE_INVOICE}
              type="button"
              className="btn btn-sm border border-slate-300 bg-emerald-500 hover:bg-emerald-600 text-white capitalize"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold capitalize">
                create invoice
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
