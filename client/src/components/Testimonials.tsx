import { Element } from "react-scroll";
import { TESTIMONIALS } from "@/utils/data";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <Element name="testimonials">
      <section className="py-20 lg:py-32 bg-white">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-600 mb-2 capitalize">
              what our client say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We are happy to share our clients feedback
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
            {TESTIMONIALS.map((testimonial) => {
              return (
                <div
                  key={testimonial.id}
                  className="card bg-amber-50 w-80 shadow-sm"
                >
                  <figure className="px-8 pt-8">
                    <img
                      src={testimonial.avatar}
                      alt="author avatar"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{testimonial.author}</h2>
                    <p className="text-slate-600 text-sm">
                      {testimonial.title}
                    </p>
                    <p>{testimonial.quote}</p>
                    <div className="card-actions">
                      <Quote className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </Element>
  );
};

export default Testimonials;
