"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CreditCard,
  FileStack,
  LayoutDashboard,
  Mail,
  Ticket,
  Users,
} from "lucide-react";

interface AdminNavProps {
  pendingStudents: number;
  newLeads: number;
}

export function AdminNav({ pendingStudents, newLeads }: AdminNavProps) {
  const pathname = usePathname();

  const items = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, badge: 0, exact: true },
    { href: "/admin/students", label: "Students", icon: Users, badge: pendingStudents },
    { href: "/admin/content", label: "Content", icon: BookOpen, badge: 0 },
    { href: "/admin/mocks", label: "Mock builder", icon: FileStack, badge: 0 },
    { href: "/admin/leads", label: "Leads", icon: Mail, badge: newLeads },
    { href: "/admin/coupons", label: "Coupons", icon: Ticket, badge: 0 },
    { href: "/admin/payments", label: "Payments", icon: CreditCard, badge: 0 },
  ];

  return (
    <nav className="flex flex-wrap items-center gap-1" aria-label="Admin sections">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium transition ${
              active
                ? "bg-vermillion text-white shadow-xs"
                : "text-ink-soft hover:bg-paper-deep/60 hover:text-ink"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{item.label}</span>
            {item.badge > 0 ? (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums leading-none ${
                  active
                    ? "bg-white/25 text-white"
                    : "bg-gold/15 text-gold"
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
