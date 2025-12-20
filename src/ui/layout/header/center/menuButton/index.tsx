"use client";
import { useToggleState, useToggleStore } from "@/src/lib/zustand/useMultiToggleStore";
import { motion } from "framer-motion";
import { useState } from "react";


export default function HamburgerButton() {
  const [hovered, setHovered] = useState(false);
  const isOpen = useToggleState("main-sidebar");
  const { open } = useToggleStore();

  const handleOpen = () => {
    document.body.classList.toggle("overflow-hidden");
    open("main-sidebar");
  };
  return (
    <motion.button
      type="button"
      onClick={handleOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-12 h-12 flex lg:hidden items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Menu"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-ui-1/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hamburger lines */}
      <div className="relative w-6 h-5 flex flex-col justify-between">
        {/* Top line */}
        <motion.span
          className="w-full h-0.5 bg-white rounded-full origin-center"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 9 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Middle line */}
        <motion.span
          className="w-full h-0.5 bg-white rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -20 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Bottom line */}
        <motion.span
          className="w-full h-0.5 bg-white rounded-full origin-center"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -9 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-lg"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
