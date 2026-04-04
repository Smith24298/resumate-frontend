"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import clsx from "clsx";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  ScanSearch,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";

interface SidebarProps {
  firstName: string;
  email: string;
}

const SIDEBAR_COLLAPSED_KEY = "resumate.sidebar.collapsed";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  { id: "resumes", label: "Resumes", icon: FileText, path: "/dashboard" },
  {
    id: "ai-tools",
    label: "AI Tools",
    icon: Sparkles,
    path: "/dashboard",
    future: true,
  },
  {
    id: "ats-analyzer",
    label: "ATS Analyzer",
    icon: ScanSearch,
    path: "/ats-analyzer",
  },
];

type NavItemDef = (typeof navItems)[number];

interface NavItemProps {
  item: NavItemDef;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function NavItem({ item, isActive, collapsed, onClick }: NavItemProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      className={clsx(
        "group relative w-full overflow-visible rounded-xl transition-all duration-200",
        collapsed
          ? "mx-auto flex h-11 w-11 items-center justify-center"
          : "flex items-center gap-3 px-3 py-2.5",
        isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
      )}
    >
      {isActive ? (
        <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#1e40af]" />
      ) : null}

      <span
        className={clsx(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          "group-hover:scale-105",
          collapsed ? "h-10 w-10" : "h-9 w-9",
          isActive
            ? "border border-blue-200 bg-blue-50 text-blue-700"
            : "border border-transparent bg-slate-100 text-slate-600 group-hover:bg-slate-200",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      {!collapsed ? (
        <>
          <span className="flex-1 text-left text-sm font-medium">
            {item.label}
          </span>
          {item.future ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500">
              beta
            </span>
          ) : null}
        </>
      ) : (
        <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          {item.label}
        </span>
      )}
    </button>
  );
}

interface SidebarCollapsedProps {
  activeItemId: string;
  onToggle: () => void;
  onNavigate: (path: string) => void;
}

function SidebarCollapsed({
  activeItemId,
  onToggle,
  onNavigate,
}: SidebarCollapsedProps) {
  return (
    <aside className="hidden lg:flex w-[62px] min-h-screen sticky top-0 flex-col items-center justify-between border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
      <div className="flex w-full flex-col items-center gap-5 px-2 py-4">
        <button
          type="button"
          onClick={onToggle}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 transition-all duration-200 hover:scale-105 hover:bg-slate-200 hover:text-slate-900"
          aria-label="Expand sidebar"
          title="Expand sidebar (Ctrl+B)"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>

        <div className="grid h-9 w-9 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <nav className="flex w-full flex-1 flex-col items-center gap-4 px-2 py-4">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeItemId === item.id}
            collapsed
            onClick={() => onNavigate(item.path)}
          />
        ))}
      </nav>

      <div className="flex w-full flex-col items-center gap-4 px-2 py-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700 shadow-sm">
          Pro
        </div>

        <button
          type="button"
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:text-slate-900"
          aria-label="Settings"
          title="Settings"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all duration-200 group-hover:scale-105 group-hover:bg-slate-200">
            <Settings className="h-4 w-4" />
          </span>
          <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            Settings
          </span>
        </button>

        <div className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10 border border-slate-200",
              },
            }}
          />
          <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            Manage profile
          </span>
        </div>
      </div>
    </aside>
  );
}

export function Sidebar({ firstName, email }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeItemId =
    navItems.find((item) => location.pathname.startsWith(item.path))?.id ||
    "dashboard";

  if (collapsed) {
    return (
      <SidebarCollapsed
        activeItemId={activeItemId}
        onToggle={() => setCollapsed(false)}
        onNavigate={(path) => navigate(path)}
      />
    );
  }

  return (
    <aside className="hidden lg:flex sticky top-0 min-h-screen flex-col border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out w-[224px] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
      <div className="border-b border-slate-200 px-3 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight text-slate-900">
                Resumate
              </div>
              <div className="truncate text-[11px] text-slate-500">
                AI Resume Workspace
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 transition-all duration-200 hover:scale-105 hover:border-blue-200 hover:text-slate-900"
            aria-label="Collapse sidebar"
            title="Collapse sidebar (Ctrl+B)"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-3 pt-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-10 w-10 border border-slate-200",
                  },
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-900">
                {firstName || "Workspace user"}
              </div>
              <div className="truncate text-xs text-slate-500">
                {email || "Signed in"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-2 py-4">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeItemId === item.id}
            collapsed={false}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      <div className="border-t border-slate-200 px-3 py-3 space-y-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
          Toggle sidebar: Ctrl + B
        </div>
      </div>
    </aside>
  );
}
