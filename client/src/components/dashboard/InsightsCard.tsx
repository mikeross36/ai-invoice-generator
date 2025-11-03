import { useState, useEffect } from "react";
import { FileStack } from "lucide-react";
import { useGetInvoicesInsights } from "@/hooks/queries";
import Loader from "@/components/Loader";

const InsightsCard = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const { invoicesInsights, isLoading } = useGetInvoicesInsights();

  useEffect(() => {
    const getInsights = async () => {
      try {
        if (invoicesInsights === null || invoicesInsights === undefined) {
          setInsights([]);
        } else {
          setInsights(invoicesInsights.insights);
        }
      } catch (err) {
        console.error("Error fething invoices insights:", err);
      }
    };

    getInsights();
  }, [invoicesInsights]);

  return (
    <article className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm shadow-gray-100">
      <div className="flex items-center mb-4">
        <FileStack />
        <h3 className="text-lg font-semibold text-slate-600 capitalize">
          AI insights
        </h3>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="space-y-3 list-disc list-inside text-slate-600 ml-3">
          {insights && insights.length > 0 ? (
            insights.map((insight, index) => {
              return (
                <li key={index} className="text-sm">
                  {insight}
                </li>
              );
            })
          ) : (
            <li>
              <span>No insights available</span>
            </li>
          )}
        </ul>
      )}
    </article>
  );
};

export default InsightsCard;
