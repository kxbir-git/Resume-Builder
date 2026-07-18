import { useEffect, useState } from "react";
import { defaultResume, type ResumeData } from "./mock-data";

const KEY = "resumecraft:resume";
const TEMPLATE_KEY = "resumecraft:template";
const ACCENT_KEY = "resumecraft:accent";

export function loadResume(): ResumeData {
  if (typeof window === "undefined") return defaultResume;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultResume;
    return JSON.parse(raw) as ResumeData;
  } catch {
    return defaultResume;
  }
}

export function saveResume(data: ResumeData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function useResume() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadResume());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveResume(data);
  }, [data, hydrated]);

  return [data, setData] as const;
}

export function useTemplate() {
  const [template, setTemplate] = useState<string>("modern");
  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TEMPLATE_KEY) : null;
    if (t) setTemplate(t);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);
  return [template, setTemplate] as const;
}

export function useAccent() {
  const [accent, setAccent] = useState<string>("coral");
  useEffect(() => {
    const a = typeof window !== "undefined" ? localStorage.getItem(ACCENT_KEY) : null;
    if (a) setAccent(a);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);
  return [accent, setAccent] as const;
}

export const accentMap: Record<string, string> = {
  coral: "#E76F51",
  amber: "#E9A53F",
  teal: "#2A9D8F",
  indigo: "#4F46E5",
  rose: "#E11D74",
  slate: "#334155",
};
