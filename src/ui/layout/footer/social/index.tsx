"use client"
import Icons from "@/public/icons";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Facebook",
    icon: Icons.Facebook,
    href: "https://facebook.com/yourcompany",
    ariaLabel: "Visit our Facebook page"
  },
  {
    name: "Instagram",
    icon: Icons.Instagram,
    href: "https://instagram.com/yourcompany",
    ariaLabel: "Visit our Instagram profile"
  },
  {
    name: "LinkedIn",
    icon: Icons.Linkedin,
    href: "https://linkedin.com/company/yourcompany",
    ariaLabel: "Visit our LinkedIn company page"
  },
  {
    name: "Twitter",
    icon: Icons.Twitter,
    href: "https://twitter.com/yourcompany",
    ariaLabel: "Visit our Twitter profile"
  },
  {
    name: "WhatsApp",
    icon: Icons.Whatsapp,
    href: "https://wa.me/1234567890",
    ariaLabel: "Contact us on WhatsApp"
  }
];

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
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const hoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function Social() {
  return (
    <motion.nav
      className="flex items-center gap-3"
      role="navigation"
      aria-label="Social media links"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <motion.div key={social.name} variants={itemVariants}>
            <motion.div
              variants={hoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={social.href}
                className="w-12 h-12 flex items-center justify-center bg-white/50 hover:bg-white/70 lg:bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label={social.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent aria-hidden="true"  fill="currentColor"/>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}