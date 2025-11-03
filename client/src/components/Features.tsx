import { Element } from "react-scroll";
import { FEATURES } from "@/utils/data";
import { ArrowRight } from "lucide-react";

const Features = () => {
  return (
    <Element name="features">
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-600 mb-4">
              Powerful Features to Drive Success
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered invoicing platform offers a wide range of features.
              Everything you need to manage your invoices, track payments, and
              generate reports.
            </p>
          </div>
          <div className="grid justify-items-center grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {FEATURES.map((feature) => {
              if (!feature) {
                throw new Error("Feature not found");
              }
              return (
                <div
                  key={feature.id}
                  className="card w-72 bg-white card-lg shadow-sm hover:shadow-lg
                    transition-all duration-300 ease-in-out hover:-translate-y-1"
                >
                  <div className="card-body">
                    <div className="w-16 h-16 flex items-center jsutify-center bg-slate-50 rounded-2xl">
                      <feature.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="card-title">{feature.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="justify-end card-actions">
                      <a
                        href="#"
                        className="inline-flex items-center mt-4 text-emerald-600 transition-colors
                        duration-200 hover:text-emerald-900 capitalize cursor-pointer"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Features;
