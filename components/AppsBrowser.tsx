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

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS */}
        <FilterSidebar browser={browser} lang={lang} totalApps={apps.length} />

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-6">
          
          {/* SEARCH & SORT */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </span>
              <input 
                type="text" 
                value={state.search} 
                onChange={(e) => actions.setSearch(e.target.value)} 
                placeholder={t.searchPlaceholder} 
                className="w-full h-12 rounded-xl border bg-white border-brandGray pl-11 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-shadow" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="text-xs font-medium text-brandGrayDark bg-brandGray/30 px-2 py-1 rounded-md">
                  {data.filteredApps.length} {data.filteredApps.length === 1 ? t.appCount : t.appsCount}
                </span>
              </div>
            </div>
            
            <div className="relative w-full md:w-56 shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z" clipRule="evenodd" />
                </svg>
              </span>
              <select 
                value={state.sortOption} 
                onChange={(e) => actions.setSortOption(e.target.value as SortOption)} 
                className="w-full h-12 appearance-none rounded-xl border border-brandGray bg-white pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/50 cursor-pointer"
              >
                <option value="name">{t.sortName}</option>
                <option value="ease">{t.sortEase}</option>
                <option value="cognitive">{t.sortCog}</option>
                <option value="sensory">{t.sortSens}</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>

          <AppsGrid apps={data.paginatedApps} lang={lang} />

          {/* PAGINATION */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={actions.handlePrevPage} 
                disabled={state.currentPage === 1} 
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${state.currentPage === 1 ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-brandBlue"}`}
              >
                {t.prev}
              </button>
              <span className="text-sm font-medium text-gray-600">
                {t.page} <span className="text-gray-900">{state.currentPage}</span> {t.of} {data.totalPages}
              </span>
              <button 
                onClick={actions.handleNextPage} 
                disabled={state.currentPage === data.totalPages} 
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${state.currentPage === data.totalPages ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-brandBlue"}`}
              >
                {t.next}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}