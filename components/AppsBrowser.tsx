"use client";

import React from "react";
import { AppsGrid } from "./AppGrid";
import { FilterSidebar } from "./FilterSidebar";
import { useAppsBrowser, SortOption } from "@/src/lib/useAppBrowser";

interface AppsBrowserProps {
  apps: any[];
  lang: "en" | "es";
}

export function AppsBrowser({ apps, lang }: AppsBrowserProps) {
  const browser = useAppsBrowser(apps, lang);
  const { state, actions, data, t } = browser;

  const pageButton = (disabled: boolean) =>
    `px-5 py-2.5 text-base font-bold rounded-lg border-2 transition-colors ${
      disabled
        ? "bg-gray-100 text-gray-700 border-gray-200 cursor-not-allowed"
        : "bg-white text-brandGrayDark border-gray-400 hover:border-brandBlue hover:text-brandBlue"
    }`;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS */}
        <FilterSidebar browser={browser} lang={lang} totalApps={apps.length} />

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-6">

          {/* SEARCH & SORT, each with a visible label */}
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="app-search" className="block mb-1 text-base font-bold text-brandGrayDark">
                {t.searchLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  id="app-search"
                  type="search"
                  value={state.search}
                  onChange={(e) => actions.setSearch(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full h-12 rounded-xl border-2 bg-white border-gray-400 pl-12 pr-4 text-base placeholder:text-gray-600 focus:outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/50"
                />
              </div>
            </div>

            <div className="w-full md:w-72 shrink-0">
              <label htmlFor="app-sort" className="block mb-1 text-base font-bold text-brandGrayDark">
                {t.sortLabel}
              </label>
              <div className="relative">
                <select
                  id="app-sort"
                  value={state.sortOption}
                  onChange={(e) => actions.setSortOption(e.target.value as SortOption)}
                  className="w-full h-12 appearance-none rounded-xl border-2 border-gray-400 bg-white pl-4 pr-10 text-base focus:outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/50 cursor-pointer"
                >
                  <option value="name">{t.sortName}</option>
                  <option value="ease">{t.sortEase}</option>
                  <option value="cognitive">{t.sortCog}</option>
                  <option value="sensory">{t.sortSens}</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Result count, announced to screen readers when it changes */}
          <p className="text-base font-bold text-brandGrayDark" aria-live="polite">
            {data.filteredApps.length} {data.filteredApps.length === 1 ? t.appCount : t.appsCount}
          </p>

          <AppsGrid apps={data.paginatedApps} lang={lang} />

          {/* PAGINATION */}
          {data.totalPages > 1 && (
            <nav aria-label={`${t.page} ${state.currentPage} ${t.of} ${data.totalPages}`} className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={actions.handlePrevPage}
                disabled={state.currentPage === 1}
                className={pageButton(state.currentPage === 1)}
              >
                {t.prev}
              </button>
              <span className="text-base font-medium text-brandGrayDark">
                {t.page} <span className="font-bold">{state.currentPage}</span> {t.of} {data.totalPages}
              </span>
              <button
                type="button"
                onClick={actions.handleNextPage}
                disabled={state.currentPage === data.totalPages}
                className={pageButton(state.currentPage === data.totalPages)}
              >
                {t.next}
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
