import { Link as LinkScroll } from "react-scroll";
import { FileCode2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ERoutes } from "@/@types";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 max-w-7xl mx-auto">
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <LinkScroll
            to="home"
            smooth={true}
            className="flex items-end space-x-2 cursor-pointer"
          >
            <span className="w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md">
              <FileCode2 className="w-4 h-4 text-white" />
            </span>
            <span className="text-lg font-bold">PDF AI Invoice Generator</span>
          </LinkScroll>
          <p className="leading-relaxed max-w-sm text-sm">
            The simplest way to generate and manage invoices.
          </p>
        </div>

        <nav>
          <h6 className="footer-title">Services</h6>
          <LinkScroll
            to="features"
            smooth={true}
            className="text-sm cursor-pointer"
          >
            Features
          </LinkScroll>
          <LinkScroll to="testimonials" smooth={true} className="text-sm">
            Testimonials
          </LinkScroll>
          <LinkScroll to="faq" smooth={true} className="text-sm">
            FAQ
          </LinkScroll>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to={ERoutes.ABOUT} className="text-sm">
            About Us
          </Link>
          <Link to={ERoutes.CONTACT} className="text-sm">
            Contact
          </Link>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to={ERoutes.TERMS} className="text-sm">
            Terms of Service
          </Link>
          <Link to={ERoutes.PRIVACY} className="text-sm">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
