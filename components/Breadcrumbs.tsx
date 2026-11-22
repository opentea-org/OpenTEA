// components/Breadcrumbs.tsx
// Breadcrumbs ("migas de pan"): show where you are and how you got here.
// The last item is the current page and is not a link.
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

type Crumb = { label: string; href?: string };

const navLabel = { en: "You are here", es: "Estás aquí" };
const homeLabel = { en: "Home", es: "Inicio" };

export function Breadcrumbs({ items, lang }: { items: Crumb[]; lang: "en" | "es" }) {
  const crumbs: Crumb[] = [{ label: homeLabel[lang], href: "/" }, ...items];

  return (
    <nav aria-label={navLabel[lang]} className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-base text-brandGrayDark">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {isLast || !crumb.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-bold">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="underline underline-offset-2 hover:text-brandBlue">
                  {crumb.label}
                </Link>
              )}
              {!isLast && <FaChevronRight className="w-3 h-3 text-gray-600" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
