"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items?: AccordionItem[];
}

const defaultItems: AccordionItem[] = [
  {
    id: "1",
    question: "STS Engineering hansı xidmətləri təqdim edir?",
    answer:
      "STS Engineering müəssisələr üçün texniki problemlərin həllini, avadanlıq təmiri və quraşdırılması, mühəndislik konsultasiyası və 24/7 texniki dəstək xidmətlərini təqdim edir.",
  },
  {
    id: "2",
    question: "Xidmət müqaviləsi necə bağlanır?",
    answer:
      "Xidmət müqaviləsi bağlamaq üçün bizimlə əlaqə saxlayın, ehtiyaclarınızı müzakirə edək və sizin üçün ən uyğun həll planını hazırlayaq.",
  },
  {
    id: "3",
    question: "Texniki dəstək nə qədər sürətlidir?",
    answer:
      "24/7 xidmət göstəririk və təcili hallarda 2 saat ərzində yerində dəstək təmin edirik.",
  },
  {
    id: "4",
    question: "Hansı sənaye sahələrində çalışırsınız?",
    answer:
      "Biz neft və qaz, kimya sənayesi, əczaçılıq, qida istehsalı və digər sənaye sahələrində geniş təcrübəyə malikik.",
  },
  {
    id: "5",
    question: "Qiymətlər necə müəyyən edilir?",
    answer:
      "Qiymətlər layihənin mürəkkəbliyi, avadanlıqların növü və xidmətin həcmindən asılı olaraq fərdi qaydada müəyyən edilir.",
  },
];

export default function FaqAccordion({
  items = defaultItems,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

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
            <span className="text-lg font-semibold text-ui-5 group-hover:text-ui-4 transition-colors duration-200">
              {item.question}
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
                    className="text-slate-600 leading-relaxed"
                  >
                    {item.answer}
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
