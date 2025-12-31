"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToggleState } from "@/src/lib/zustand/useMultiToggleStore";
import {
  FileText,
  Mail,
  Briefcase,
  Users,
  Image,
  HelpCircle,
  UserCircle,
  Trash2,
  ArrowRight,
  Target,
  Projector,
  Layers,
  Boxes,
  Info,
  Contact,
  Key,
} from "lucide-react";
const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user.role === "SUPER_ADMIN";
  const isSidebarOpen = useToggleState("admin-sidebar");

  const menuSections = [
    {
      title: "Əsas səhifələr",
      items: [
        {
          href: "/manage/categories",
          label: "Meta məlumatlar",
          icon: FileText,
        },
        { href: "/manage/contact", label: "Əlaqə", icon: Mail },
        { href: "/manage/projects", label: "Layihələr", icon: Projector },
        {
          href: "/manage/services-category",
          label: "Əsas xidmətlər",
          icon: Layers,
        },
        {
          href: "/manage/services-sub-category",
          label: "Alt xidmətlər",
          icon: Boxes,
        },
        { href: "/manage/contact", label: "Əlaqə", icon: Contact },
        { href: "/manage/blog", label: "Bloqlar", icon: FileText },
        { href: "/manage/solutions", label: "Həllərimiz", icon: Key },
      ],
    },
    {
      title: "Ana səhifə",
      items: [
        { href: "/manage/slider", label: "Slayder", icon: Image },
        {
          href: "/manage/about-home",
          label: "Haqqımızda ana səhifə məlumatları",
          icon: Info,
        },
        { href: "/manage/partners", label: "Partnyorlar", icon: Users },
        {
          href: "/manage/fag",
          label: "Tez-tez verilən suallar",
          icon: HelpCircle,
        },
      ],
    },
    {
      title: "Haqqımızda səhifəsi",
      items: [
        { href: "/manage/employee", label: "İşçilərimiz", icon: UserCircle },
        {
          href: "/manage/strategic-goals",
          label: "Strateji Hədəflər",
          icon: Target,
        },
      ],
    },
    {
      title: "Komponentlər",
      items: [
        { href: "/manage/position", label: "Vəzifələr", icon: Briefcase },
        { href: "/manage/socials", label: "Sosial şəbəkələr", icon: Users },
        {
          href: "/manage/section-content",
          label: "Bölüm başlıqları",
          icon: FileText,
        },
      ],
    },
  ];

  if (isSuperAdmin) {
    menuSections.push({
      title: "Sistem",
      items: [
        { href: "/manage/users", label: "İstifadəçilər", icon: Users },
        { href: "/manage/trash", label: "Zibil qutusu", icon: Trash2 },
      ],
    });
  }

  return (
    <div
      className={`fixed overflow-y-auto h-full z-40 bg-white pt-20 top-0 w-64 transition-transform duration-300 ease-in-out border-r border-gray-200 ${
        isSidebarOpen ? "-translate-x-full" : "translate-x-0"
      } scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
    >
      <div className="flex flex-col gap-6 p-3">
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3 py-1">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-700"
                            : "bg-gray-100 group-hover:bg-blue-50"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-blue-600"
                          }`}
                        />
                      </div>
                      <span className="flex-1 truncate">{item.label}</span>
                      {isActive && (
                        <ArrowRight className="w-4 h-4 text-white" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
