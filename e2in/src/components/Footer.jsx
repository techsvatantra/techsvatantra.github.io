import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === "/" && targetId.startsWith("#")) {
      const elementId = targetId.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (targetId.startsWith("#")) {
      navigate(`/${targetId}`);
    } else {
      navigate(targetId);
    }
  };

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Personal Care", href: "/coming-soon", type: "route" },
        { name: "24/7 Care", href: "/coming-soon", type: "route" },
        { name: "Meal Preparation", href: "/coming-soon", type: "route" },
        { name: "Companionship", href: "/coming-soon", type: "route" },
        { name: "Medication Management", href: "/coming-soon", type: "route" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/coming-soon", type: "route" },
        { name: "Our Team", href: "/coming-soon", type: "route" },
        { name: "Careers", href: "/careers", type: "route" },
        { name: "Testimonials", href: "/coming-soon", type: "route" },
        { name: "Blog", href: "/coming-soon", type: "route" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/#contact", type: "hash" },
        { name: "FAQs", href: "/coming-soon", type: "route" },
        { name: "Resources", href: "/coming-soon", type: "route" },
        { name: "Privacy Policy", href: "/privacy-policy", type: "route" },
        { name: "Terms of Service", href: "/coming-soon", type: "route" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/share/1Ewed65ri1/?mibextid=wwXIfr" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-brand font-bold text-primary">e2i</span>
              <span className="text-xl font-semibold text-white ml-1">home care</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Providing compassionate and professional home care services that enhance the quality of life for our clients and give peace of mind to their families.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  onClick={(e) => social.href === "javascript:void(0);" && e.preventDefault()}
                  target={social.href === "javascript:void(0);" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`bg-gray-800 p-2 rounded-full ${
                    social.href === "javascript:void(0);"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary transition-colors duration-300"
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.type === "hash" ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} e2i home care. All rights reserved.</p>
              <p className="mt-2">
                Made with <Heart className="h-4 w-4 inline-block text-primary" /> for families who care.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary text-sm">
                Privacy Policy
              </Link>
              <Link to="/coming-soon" className="text-gray-400 hover:text-primary text-sm">
                Terms of Service
              </Link>
              <Link to="/coming-soon" className="text-gray-400 hover:text-primary text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;