import { Element } from "react-scroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <Element name="home">
      <div className="bg-gray-50 text-slate-600">
        <Header />
        <main>
          <Hero />
          <Features />
          <Testimonials />
          <FAQ />
          <Footer />
        </main>
      </div>
    </Element>
  );
};

export default HomePage;
