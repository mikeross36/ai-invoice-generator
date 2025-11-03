import { Element } from "react-scroll";
import { FAQS } from "@/utils/data";

const FAQ = () => {
  return (
    <Element name="faq">
      <section className="py-20 lg:py-32 bg-slate-50 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p>
            Everything you need to manage your invoices, track payments and
            generate reports
          </p>
        </div>
        <div className="collapse collapse-arrow bg-gray-50 border border-slate-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How can I create an invoice?
          </div>
          <div className="collapse-content text-sm">
            You can create an invoice by clicking the 'Create Invoice' button in
            the dashboard.
          </div>
        </div>
        {FAQS.map((faq) => {
          return (
            <div
              key={faq.id}
              className="collapse collapse-arrow bg-gray-50 border border-slate-300"
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          );
        })}
      </section>
    </Element>
  );
};

export default FAQ;
