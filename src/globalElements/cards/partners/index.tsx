"use client";
import Link from "next/link";
import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";

interface Props {
  image: string;
  title: string;
}

export default function PartnerCard({ image, title }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <Link
      ref={cardRef}
      href={""}
      className="relative shrink-0 mx-2 flex items-center justify-center overflow-hidden rounded-xl h-18 lg:h-24 w-40 lg:w-50 bg-gray-100 group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Paint reveal from cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, rgba(27, 175, 191, 0.15) 0%, transparent 100%)`,
          mixBlendMode: "multiply",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Color wave from cursor */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHovered
            ? `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
               rgba(27, 175, 191, 0.3) 0deg, 
               transparent 60deg, 
               transparent 300deg, 
               rgba(27, 175, 191, 0.3) 360deg)`
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: isHovered ? 1.12 : 1,
          filter: isHovered ? "grayscale(0) saturate(1.2)" : "grayscale(1)",
          rotate: isHovered ? [(mousePosition.x - 50) * 0.05] : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <CustomImage
          height={40}
          width={100}
          src={image}
          title={title}
          className="h-auto max-w-20 lg:max-w-25 w-full"
        />
      </motion.div>

      {/* Particle burst from cursor */}
      {isHovered && [1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-ui-1 rounded-full"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((i * 72 * Math.PI) / 180) * 50,
            y: Math.sin((i * 72 * Math.PI) / 180) * 50,
            opacity: [1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </Link>
  );
}