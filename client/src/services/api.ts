import axiosPrivate from "./axiosPrivate";
import { handleApiError } from "@/utils/handleApiError";
import { ERoutes } from "@/@types";
import type {
  ProfileDataType,
  UpdatePasswordDataType,
  InvoiceType,
} from "@/@types";

const API_ENDPOINTS = {
  AUTH_USER: "/auth/me",
  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
  LOGOUT_USER: "/auth/logout",
  UPDATE_PROFILE: "/auth/update-profile",
  UPDATE_PASSWORD: "/auth/update-password",
  GET_ALL_INVOICES: "/invoices",
  CREATE_INVOICE: "/invoices/create",
  GET_INVOICE: "/invoices",
  UPDATE_INVOICE: "/invoices/update",
  DELETE_INVOICE: "/invoices/delete",
  GENERATE_INVOICE: "/ai/generate-invoice",
  GENERATE_REMINDER: "/ai/generate-reminder",
  GET_INVOICES_INSIGHTS: "/ai/insights",
};

const resErrMsg = "Invalid response from server";

export const getAuthUser = async () => {
  try {
    const response = await axiosPrivate.get(API_ENDPOINTS.AUTH_USER);
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to fetch authenticated user");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosPrivate.post(API_ENDPOINTS.LOGOUT_USER);
    if (!response) {
      throw new Error(resErrMsg);
    }
    if (response.status === 200) {
      setTimeout(() => {
        window.location.href = ERoutes.HOME;
      }, 1500);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to logout user");
  }
};

export const updateUserProfile = async (profileData: ProfileDataType) => {
  if (!profileData || typeof profileData !== "object") {
    throw new Error("Missing or invalid profile data!");
  }
  try {
    const response = await axiosPrivate.patch(
      API_ENDPOINTS.UPDATE_PROFILE,
      profileData
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to update user profile");
  }
};

export const updateUserPassword = async (
  updatePasswordData: UpdatePasswordDataType
) => {
  if (!updatePasswordData || typeof updatePasswordData !== "object") {
    throw new Error("Missing or invalid update password data!");
  }
  try {
    const response = await axiosPrivate.patch(
      API_ENDPOINTS.UPDATE_PASSWORD,
      updatePasswordData
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to update user password");
  }
};

export const getAllInvoices = async () => {
  try {
    const response = await axiosPrivate.get(API_ENDPOINTS.GET_ALL_INVOICES);
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data.invoices;
  } catch (err) {
    handleApiError(err, "Failed to get all invoices");
  }
};

export const updateInvoice = async (
  invoiceId: string,
  invoiceData: InvoiceType
) => {
  try {
    const response = await axiosPrivate.patch(
      `${API_ENDPOINTS.UPDATE_INVOICE}/${invoiceId}`,
      invoiceData
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to update invoice");
  }
};

export const deleteInvoice = async (invoiceId: string) => {
  try {
    const response = await axiosPrivate.delete(
      `${API_ENDPOINTS.DELETE_INVOICE}/${invoiceId}`
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to delete invoice");
  }
};

export const createInvoice = async (invoiceData: InvoiceType) => {
  try {
    const response = await axiosPrivate.post(
      API_ENDPOINTS.CREATE_INVOICE,
      invoiceData
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    if (response.status === 201) {
      setTimeout(() => {
        window.location.href = ERoutes.INVOICES;
      }, 500);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to create invoice");
  }
};

export const getInvoice = async (invoiceId: string) => {
  try {
    const response = await axiosPrivate.get(
      `${API_ENDPOINTS.GET_INVOICE}/${invoiceId}`
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to get invoice");
  }
};

export const generateInvoice = async (text: string) => {
  try {
    const response = await axiosPrivate.post(API_ENDPOINTS.GENERATE_INVOICE, {
      text,
    });
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to generate invoice");
  }
};

export const generateReminderContent = async (invoiceId: string) => {
  try {
    const response = await axiosPrivate.post(API_ENDPOINTS.GENERATE_REMINDER, {
      invoiceId,
    });
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to generate reminder content");
  }
};

export const getInvoicesInsights = async () => {
  try {
    const response = await axiosPrivate.get(
      API_ENDPOINTS.GET_INVOICES_INSIGHTS
    );
    if (!response.data) {
      throw new Error(resErrMsg);
    }
    console.log(response.data);
    return response.data;
  } catch (err) {
    handleApiError(err, "Failed to get invoices insights");
  }
};
