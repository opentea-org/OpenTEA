// src/lib/platforms.tsx
// Shared helpers to show a platform with its icon AND its name,
// so the meaning never depends only on the icon.
import {
  FaAndroid,
  FaApple,
  FaGlobe,
  FaWindows,
  FaLinux,
  FaMobileAlt,
} from "react-icons/fa";

type Lang = "en" | "es";

export function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  const p = (platform || "").toLowerCase();
  const props = { className, "aria-hidden": true as const };
  if (p.includes("android")) return <FaAndroid {...props} />;
  if (p.includes("ios") || p.includes("iphone") || p.includes("ipad")) return <FaApple {...props} />;
  if (p.includes("windows")) return <FaWindows {...props} />;
  if (p.includes("linux")) return <FaLinux {...props} />;
  if (p.includes("web") || p.includes("browser")) return <FaGlobe {...props} />;
  return <FaMobileAlt {...props} />;
}

export function getPlatformName(platform: string, lang: Lang): string {
  const p = (platform || "").toLowerCase();
  if (p === "ios") return "iPhone / iPad";
  if (p === "web") return lang === "en" ? "Web browser" : "Navegador web";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

/** Icon + name in a small chip. */
export function PlatformTag({ platform, lang }: { platform: string; lang: Lang }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-brandGrayLight px-2 py-1 text-sm text-brandGrayDark">
      <PlatformIcon platform={platform} />
      {getPlatformName(platform, lang)}
    </span>
  );
}
