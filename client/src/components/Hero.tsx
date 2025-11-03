import { useAuthUser } from "@/hooks/queries";
import { Link } from "react-router-dom";
import { ERoutes } from "@/@types";
import invoiceTemplate from "@/assets/invoice-cover.jpg";

const Hero = () => {
  const { authUser } = useAuthUser();

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.05] bg-[size:60px_60px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-700 leading-tight mb-6 capitalize">
            ai powered invoicing made efortless
          </h1>
          <h3 className="text-lg sm:text-2xl text-slate-600 font-semibold mb-8 leading-relaxed max-w-3xl mx-auto">
            Let our AI create invoice for you in seconds, generate and track
            payments.
          </h3>
          <div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 
          sm:space-x-4 mb-8"
          >
            {authUser ? (
              <Link
                to={ERoutes.DASHBOARD}
                className=" bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold sm:text-lg hover:bg-emerald-900 
                transition-all duration-200 shadow-md hover:scale-105 hover:shadow-2xl transform capitalize"
              >
                dashboard
              </Link>
            ) : (
              <Link
                to={ERoutes.REGISTER}
                className=" bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold sm:text-lg hover:bg-emerald-900 
                transition-all duration-200 shadow-md hover:scale-105 hover:shadow-2xl transform capitalize"
              >
                Get started for free
              </Link>
            )}
            <a
              href="#features"
              className="border-2 border-gray-400 text-slate-600 px-7 py-4 rounded-xl font-bold
            sm:text-lg hover:bg-white hover:text-slate-700 transition-all duration-200 hover:scale-105"
            >
              Learn more
            </a>
          </div>
          <div className="mt-8 max-w-3xl mx-auto">
            <img
              src={invoiceTemplate}
              alt=""
              className="rounded-2xl shadow-2xl shadow-gray-300 border-4 border-gray-200/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
