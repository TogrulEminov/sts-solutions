"use client";
import { motion } from "framer-motion";
import Logo from "../../logo";
import SocialComponent from "./social";
import { Link } from "@/src/i18n/navigation";
import Customlink from "next/link";
import CustomLink from "next/link";
import {
  IContactInformation,
  ServicesCategoryItem,
  Social,
} from "@/src/services/interface";
import { useTranslations } from "next-intl";
import { clearPhoneRegex } from "@/src/lib/domburify";
interface Props {
  socialData: Social[] | undefined;
  contactData: IContactInformation | undefined;
  servicesData: ServicesCategoryItem[] | undefined;
}
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

export default function Footer({
  contactData,
  servicesData,
  socialData,
}: Props) {
  const t = useTranslations();
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
          <SocialComponent socialData={socialData} />
        </motion.div>

        <motion.div
          className="grid  grid-cols-1  lg:grid-cols-4 gap-5 lg:gap-10"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants}
          >
            <strong className="font-inter font-medium text-base text-white">
              {t("footer.mainLinks")}
            </strong>
            <div className="flex flex-col space-y-3">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/about"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  {t("pages.about")}
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/services"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  {t("pages.services")}
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/projects"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  {t("pages.projects")}
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/solutions"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  {t("pages.solutions")}
                </Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link
                  href={"/blog"}
                  className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                >
                  {t("pages.blogs")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
          {servicesData?.length && (
            <motion.div
              className="flex flex-col space-y-4"
              variants={itemVariants}
            >
              <strong className="font-inter font-medium text-base text-white">
                {t("footer.services")}
              </strong>
              <div className="flex flex-col space-y-3">
                {servicesData?.map((services) => {
                  return (
                    <motion.div
                      variants={linkVariants}
                      whileHover="hover"
                      key={services?.documentId}
                    >
                      <Link
                        href={{
                          pathname: "/services/[category]",
                          params: {
                            category: services?.translations?.[0]?.slug,
                          },
                        }}
                        className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                      >
                        {services?.translations?.[0]?.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants}
          >
            <strong className="font-inter font-medium text-base text-white">
              {t("footer.contact")}
            </strong>
            <div className="flex flex-col space-y-3">
              {contactData?.phone && (
                <motion.div variants={linkVariants} whileHover="hover">
                  <Customlink
                    href={`tel:${clearPhoneRegex(contactData?.phone)}`}
                    aria-label="Contact us with phone"
                    className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                  >
                    {t("footer.phone")}: {contactData?.phone}
                  </Customlink>
                </motion.div>
              )}
              {contactData?.email && (
                <motion.div variants={linkVariants} whileHover="hover">
                  <Customlink
                    href={"/"}
                    aria-label="Contact us with email"
                    className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                  >
                    {t("footer.email")}: {contactData?.email}
                  </Customlink>
                </motion.div>
              )}
              {contactData?.translations?.[0]?.adress && (
                <motion.div variants={linkVariants} whileHover="hover">
                  <Customlink
                    aria-label="Our company adress"
                    href={contactData?.adressLink || "#"}
                    className="font-inter text-base text-white/40 font-medium transition-colors hover:text-white/60"
                  >
                    {t("footer.address")}:
                    {contactData?.translations?.[0]?.adress}
                  </Customlink>
                </motion.div>
              )}
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
              © {new Date().getFullYear()} STS Solution.{" "}
              {t("footer.rightsReserved")}
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
                href={"https://wa.me/+994553183569"}
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
