"use client";
import { motion } from "framer-motion";
import Logo from "../../logo";
import Social from "./social";
import { Link } from "@/src/i18n/navigation";
import CustomLink from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const linkVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
};

export default function Footer() {
  return (
    <footer className="bg-ui-2">
      <motion.div
        className="container flex flex-col space-y-10 lg:space-y-15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="flex  flex-col space-y-6 md:flex-row md:items-center pt-10  lg:pt-15 md:justify-between"
          variants={itemVariants}
        >
          <Logo isWhite={true} />
          <Social />
        </motion.div>

        <motion.div
          className="grid  grid-cols-1  lg:grid-cols-4 gap-10"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants}
          >
            <strong className="font-inter font-medium text-base text-white">
              Services
            </strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Business Strategy
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Financial Consulting
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  HR & Talent Management
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  IT Solutions
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Marketing & Branding
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants}
          >
            <strong className="font-inter font-medium text-base text-white">
              Quick Links
            </strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Services
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Solutions
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants}
          >
            <strong className="font-inter font-medium text-base text-white">
              Contact Us
            </strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Phone: (123) 456-7890
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Email: info@companyname.com
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Address: City, State, ZIP Code
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-white/10 py-5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="font-inter font-medium text-center lg:text-start text-white/50 text-sm lg:text-base order-2 md:order-1"
            >
              © 2015-2025 GlobTm. All rights reserved
            </motion.p>

            {/* Site by */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="order-1 md:order-2"
            >
              <CustomLink
                href={"https://togruleminov.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter font-medium text-white/40 text-sm hover:text-white/60 transition-colors duration-300 flex items-center gap-1.5 group"
              >
                <span className="text-white/30">Site by</span>
                <span className="font-semibold text-white/60 group-hover:text-white transition-colors flex items-center gap-1">
                  TogrulEminov
                  <svg
                    className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </CustomLink>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
