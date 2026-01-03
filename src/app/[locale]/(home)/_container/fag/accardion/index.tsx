"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FagItem } from "@/src/services/interface";

interface FaqAccordionProps {
  items?: FagItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  if (!items?.length) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-ui-6/27! rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex  cursor-pointer items-center justify-between p-5 text-left group"
            aria-expanded={openId === item.id}
          >
            <span className="text-base lg:text-lg font-semibold text-ui-5 group-hover:text-ui-4 transition-colors duration-200">
              {item.translations?.[0]?.title}
            </span>
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="shrink-0 ml-4"
            >
              {openId === item.id ? (
                <Minus className="w-6 h-6 text-ui-5" />
              ) : (
                <Plus className="w-6 h-6 text-ui-1 group-hover:text-ui-4 transition-colors duration-200" />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <motion.p
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-600 text-sm lg:text-base leading-relaxed"
                  >
                    {item.translations?.[0]?.description}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
