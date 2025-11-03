import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAuthUser,
  getAllInvoices,
  getInvoice,
  getInvoicesInsights,
} from "@/services/api";

export const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  if (error) {
    toast.error("Error fetching auth user");
    console.error("Error fetching auth user:", error);
  }
  return { authUser: data?.user ?? null, isLoading, error };
};

export const useGetAllInvoices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allInvoices"],
    queryFn: getAllInvoices,
  });
  if (error) {
    toast.error("Error fetching all invoices");
    console.error("Error fetching all invoices:", error);
  }
  // console.log(data);
  return {
    invoices: data ?? [],
    isLoading,
    error,
  };
};

export const useGetInvoice = (invoiceId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });
  if (error) {
    toast.error("Error fething invoice");
    console.error("Error fething invoice:", error);
  }
  return {
    invoiceData: data ?? null,
    isLoading,
    error,
  };
};

export const useGetInvoicesInsights = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["invoicesInsights"],
    queryFn: getInvoicesInsights,
  });
  if (error) {
    toast.error("Error fething invoices insights");
    console.error("Error fething invoices insights:", error);
  }
  return {
    invoicesInsights: data ?? null,
    isLoading,
    error,
  };
};
