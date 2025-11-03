import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logoutUser,
  updateUserProfile,
  updateUserPassword,
  updateInvoice,
  deleteInvoice,
  createInvoice,
  generateInvoice,
  generateReminderContent,
} from "@/services/api";
import toast from "react-hot-toast";
import type {
  ProfileDataType,
  UpdatePasswordDataType,
  InvoiceType,
} from "@/@types";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async () => {
      return await logoutUser();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (data) {
        return toast.success(data.message);
      }
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      toast.error("Error logging out user");
      throw err;
    },
  });
  return {
    logoutMutation: mutateAsync,
    isLogoutUserLoading: isPending,
    error,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (profileData: ProfileDataType) => {
      if (!profileData || typeof profileData !== "object") {
        throw new Error("Missing or invalid profile data!");
      }
      return await updateUserProfile(profileData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (data) {
        return toast.success(data.message);
      }
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error("Error updating user profile");
      throw err;
    },
  });
  return {
    updateProfileMutation: mutateAsync,
    isUpdateProfileLoading: isPending,
    updateProfileError: error,
  };
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (updatePasswordData: UpdatePasswordDataType) => {
      if (!updatePasswordData || typeof updatePasswordData !== "object") {
        throw new Error("Missing or invalid update password data!");
      }
      return await updateUserPassword(updatePasswordData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (data?.message) return toast.success(data.message);
      toast.success("Password updated successfully");
    },
    onError: (err) => {
      toast.error("Error updating user password");
      throw err;
    },
  });
  return {
    updatePasswordMutation: mutateAsync,
    isUpdatePasswordLoading: isPending,
    updatePasswordError: error,
  };
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({
      invoiceId,
      invoiceData,
    }: {
      invoiceId: string;
      invoiceData: InvoiceType;
    }) => {
      if (!invoiceId) {
        throw new Error("Invalid invoice id");
      }
      if (!invoiceData || typeof invoiceData !== "object") {
        throw new Error("Missing or invalid invoice data!");
      }
      return await updateInvoice(invoiceId, invoiceData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["updatedInvoice"] });
      if (data?.message) {
        return toast.success(data.message);
      }
      toast.success("Invoice updated successfully");
    },
    onError: (err) => {
      toast.error("Error updating invoice");
      throw err;
    },
  });
  return {
    updateInvoiceMutation: mutateAsync,
    isUpdateInvoiceLoading: isPending,
    updateInvoiceError: error,
  };
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (invoiceId: string) => {
      if (!invoiceId) {
        throw new Error("Invalid invoice id");
      }
      return await deleteInvoice(invoiceId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deletedInvoice"] });
      if (data?.message) {
        return toast.success(data.message);
      }
      toast.success("Invoice deleted successfully");
    },
    onError: (err) => {
      toast.error("Error deleting invoice");
      throw err;
    },
  });
  return {
    deleteInvoiceMutation: mutateAsync,
    isDeleteInvoiceLoading: isPending,
    deleteInvoiceError: error,
  };
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (invoiceData: InvoiceType | null) => {
      if (!invoiceData || typeof invoiceData !== "object") {
        throw new Error("Missing or invalid invoice data!");
      }
      return await createInvoice(invoiceData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createdInvoice"] });
      if (data?.message) {
        return toast.success(data.message);
      }
      toast.success("Invoice created successfully");
    },
    onError: (err) => {
      toast.error("Error creating invoice");
      throw err;
    },
  });

  return {
    createInvoiceMutation: mutateAsync,
    isCreateInvoiceLoading: isPending,
    createInvoiceError: error,
  };
};

export const useGenerateInvoice = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (text: string) => {
      if (!text || typeof text !== "string" || text.trim() === "") {
        throw new Error("Invalid or missing text!");
      }
      return await generateInvoice(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generatedInvoice"] });
      toast.success("Invoice generated successfully");
    },
    onError: (err) => {
      toast.error("Error generating invoice");
      throw err;
    },
  });
  return {
    generateInvoiceMutation: mutateAsync,
    isGenerateInvoiceLoading: isPending,
    generateInvoiceError: error,
  };
};

export const useGenerateReminder = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (invoiceId: string) => {
      if (!invoiceId || typeof invoiceId !== "string") {
        throw new Error("Missing or invalid invoice id!");
      }
      return await generateReminderContent(invoiceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminderContent"] });
      toast.success("Reminder generated successfully");
    },
    onError: (err) => {
      toast.error("Error generating reminder");
      throw err;
    },
  });
  return {
    generateReminderMutation: mutateAsync,
    isGenerateReminderLoading: isPending,
    generateReminderError: error,
  };
};
