import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "@/hooks/queries";
import { ERoutes } from "@/@types";
import DashboardLayout from "./dashboard/DashboardLayout";
import Loader from "@/components/Loader";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { authUser, isLoading } = useAuthUser();
  if (isLoading) return <Loader />;

  if (!authUser) {
    return <Navigate to={ERoutes.LOGIN} replace />;
  }

  return <DashboardLayout>{children ? children : <Outlet />}</DashboardLayout>;
};

export default ProtectedRoute;
