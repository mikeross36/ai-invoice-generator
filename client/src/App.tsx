import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ERoutes } from "@/@types";
import { Toaster } from "react-hot-toast";
import {
  HomePage,
  Dashboard,
  RegisterPage,
  LoginPage,
  ProfilePage,
  UpdatePassword,
  InvoicesPage,
  CreateInvoice,
  InvoiceDetails,
} from "./pages";
import { ProtectedRoute } from "./components";

const App = () => {
  return (
    <div className="w-full bg-white text-slate-600">
      <Router>
        <Routes>
          <Route path={ERoutes.HOME} element={<HomePage />} />
          <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
          <Route path={ERoutes.LOGIN} element={<LoginPage />} />
          <Route
            path={ERoutes.HOME}
            element={<ProtectedRoute children={undefined} />}
          >
            <Route path={ERoutes.PROFILE} element={<ProfilePage />} />
            <Route
              path={ERoutes.UPDATE_PASSWORD}
              element={<UpdatePassword />}
            />
            <Route path={ERoutes.DASHBOARD} element={<Dashboard />} />
            <Route path={ERoutes.INVOICES} element={<InvoicesPage />} />
            <Route path={ERoutes.CREATE_INVOICE} element={<CreateInvoice />} />
            <Route
              path={`${ERoutes.INVOICE_DETAILS}/:invoiceId`}
              element={<InvoiceDetails />}
            />
          </Route>
          <Route path="*" element={<Navigate to={ERoutes.HOME} replace />} />
        </Routes>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
                textTransform: "uppercase",
                color: "white",
                fontWeight: "medium",
                textAlign: "center",
              },
            },
            error: {
              style: {
                background: "red",
                textTransform: "uppercase",
                color: "white",
                fontWeight: "medium",
                textAlign: "center",
              },
            },
          }}
        />
      </Router>
    </div>
  );
};

export default App;
