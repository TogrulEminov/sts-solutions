"use client"
import { motion } from "framer-motion"
import Logo from "../../logo"
import Social from "./social"
import { Link } from "@/src/i18n/navigation"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

const linkVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
}

export default function Footer() {
  return (
    <footer className="py-20 bg-ui-2">
      <motion.div
        className="container flex flex-col space-y-15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <Logo isWhite={true} />
          <Social />
        </motion.div>

        <motion.div className="grid lg:grid grid-cols-4 gap-10" variants={containerVariants}>
          <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
            <strong className="font-manrope font-medium text-base text-white">Services</strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Business Strategy
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Financial Consulting
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  HR & Talent Management
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  IT Solutions
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Marketing & Branding
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
            <strong className="font-manrope font-medium text-base text-white">Quick Links</strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Services
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Solutions
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
            <strong className="font-manrope font-medium text-base text-white">Contact Us</strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Phone: (123) 456-7890
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Email: info@companyname.com
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/"}
                  className="font-manrope text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  Address: City, State, ZIP Code
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}