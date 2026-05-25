"use client";

import React from "react";
import { 
  FaFilter, 
  FaChevronUp, 
  FaChevronDown, 
  FaRegSmile, 
  FaBrain, 
  FaRegEye,
  FaAndroid,
  FaApple,
  FaGlobe,
  FaWindows,
  FaDesktop
} from "react-icons/fa";
import { RatingInfo } from "./RatingInfo";
import { UseAppsBrowserReturn, getLanguageName, PriceFilter } from "@/src/lib/useAppBrowser";
import { getCategoryName } from "@/src/lib/categoryTranslations";

interface FilterSidebarProps {
  browser: UseAppsBrowserReturn;
  lang: "en" | "es";
  totalApps: number;
}

// --- HELPERS: PLATFORM FORMATTING ---
function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p === "android") return <FaAndroid className="w-5 h-5" />;
  if (p === "ios") return <FaApple className="w-5 h-5" />;
  if (p === "web") return <FaGlobe className="w-5 h-5" />;
  if (p === "windows") return <FaWindows className="w-5 h-5" />;
  return <FaDesktop className="w-5 h-5" />;
}

function formatPlatformName(platform: string) {
  const p = platform.toLowerCase();
  if (p === "ios") return "iPhone / iPad";
  if (p === "web") return "Navegador web";
  // Capitalize other platforms by default
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

// --- RATING GROUP COMPONENT ---
interface RatingGroupProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mode: "min" | "max";
  Icon: React.ElementType;
  activeColorClass: string;
  textColorClass: string;
}

function RatingGroup({ label, value, onChange, mode, Icon, activeColorClass, textColorClass }: RatingGroupProps) {
  const current = value ? Number(value) : null;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className={`w-4 h-4 ${textColorClass}`} />
        <p className="text-[11px] font-bold text-brandGrayDark uppercase tracking-wide">{label}</p>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(num => {
          const isActive = current !== null && num === current;
          let isInRange = false;
          if (current !== null && !isActive) {
            if (mode === "min") {
              isInRange = num > current;
            } else {
              isInRange = num < current;
            }
          }

          let buttonClass = "flex-1 h-8 rounded text-xs font-bold transition-all border flex items-center justify-center ";

          if (isActive) {
            buttonClass += `${activeColorClass} text-white border-transparent shadow-sm`;
          } else if (isInRange) {
            buttonClass += `${activeColorClass} bg-opacity-30 ${textColorClass} border-transparent`;
          } else {
            buttonClass += "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50";
          }

          return (
            <button 
              key={num} 
              onClick={() => onChange(isActive ? "" : num.toString())}
              className={buttonClass}
              title={mode === "min" ? `${num} or more` : `${num} or less`}
            >
              {mode === "min" ? num + "+" : "≤" + num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN SIDEBAR COMPONENT ---
export function FilterSidebar({ browser, lang, totalApps }: FilterSidebarProps) {
  const { state, actions, data, t } = browser;

  return (
    <>
      <style jsx>{`
        .range-slider-input { pointer-events: none; }
        .range-slider-input::-webkit-slider-thumb {
          pointer-events: auto; appearance: none; height: 1.25rem; width: 1.25rem;
          background: #ffffff; border-radius: 9999px; border: 1px solid #d1d5db;
          cursor: pointer; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        .range-slider-input::-moz-range-thumb {
          pointer-events: auto; appearance: none; height: 1.25rem; width: 1.25rem;
          background: #ffffff; border-radius: 9999px; border: 1px solid #d1d5db;
          cursor: pointer; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
      `}</style>

      {/* MOBILE TOGGLE BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => actions.setShowFilters(!state.showFilters)}
          className="flex items-center justify-between w-full p-4 bg-white border border-brandGray rounded-xl shadow-sm text-brandGrayDark font-semibold"
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-brandBlue" />
            <span>
              {t.filters}{" "}
              {data.hasActiveFilters && (
                <span className="ml-1 text-xs bg-brandBlue text-white px-2 py-0.5 rounded-full">
                  {t.active}
                </span>
              )}
            </span>
          </div>
          {state.showFilters ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </button>
      </div>

      {/* SIDEBAR FILTERS */}
      <aside className={`lg:block lg:w-72 w-full lg:shrink-0 bg-white border border-brandGray rounded-2xl p-4 space-y-6 self-start shadow-sm transition-all duration-300 ${state.showFilters ? 'block' : 'hidden'}`}>
        
        {/* Header - Sidebar */}
        <div className={`flex items-center justify-between pb-3 border-b border-brandGray ${!data.hasActiveFilters ? 'hidden lg:flex' : ''}`}>
          <div className="hidden lg:flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brandBlue/10 text-brandBlue shrink-0">
              <FaFilter className="w-3 h-3" />
            </span>
            <h2 className="text-sm font-semibold text-brandGrayDark">{t.filters}</h2>
          </div>
          
          {/* Espaciador para empujar "Borrar todo" a la derecha en móvil cuando el título se oculta */}
          <div className="lg:hidden flex-1"></div>

          {data.hasActiveFilters && (
            <button onClick={actions.resetAllFilters} className="text-[10px] font-medium text-red-500 hover:text-red-600 underline whitespace-nowrap ml-2">
              {t.removeAll}
            </button>
          )}
        </div>

        {/* PRICE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-brandGrayDark tracking-wide">{t.priceRange}</h3>
            {(state.priceFilter !== "all" || state.priceMin !== data.globalMin || state.priceMax !== data.globalMax) && (
              <button onClick={() => { actions.setPriceFilter("all"); actions.setPriceMin(data.globalMin); actions.setPriceMax(data.globalMax); }} className="text-[10px] text-gray-400 hover:text-brandBlue">
                {t.clear}
              </button>
            )}
          </div>

          <div className={`space-y-4 ${data.isPriceDisabled ? "opacity-50 grayscale" : ""}`}>
            <div className="relative w-full h-8 flex items-center">
              <div className="absolute left-0 w-full h-1.5 bg-gray-200 rounded-full"></div>
              <div className="absolute h-1.5 bg-brandBlue rounded-full" style={{ left: `${data.isPriceDisabled ? 0 : data.getPercent(state.priceMin)}%`, right: `${data.isPriceDisabled ? 0 : 100 - data.getPercent(state.priceMax)}%` }}></div>
              <input type="range" min={data.globalMin} max={data.globalMax} value={data.isPriceDisabled ? data.globalMin : state.priceMin} onChange={actions.handlePriceMinChange} disabled={data.isPriceDisabled} className={`range-slider-input absolute w-full h-full appearance-none bg-transparent ${data.getPercent(state.priceMin) > 50 ? 'z-40' : 'z-20'}`} />
              <input type="range" min={data.globalMin} max={data.globalMax} value={data.isPriceDisabled ? data.globalMin : state.priceMax} onChange={actions.handlePriceMaxChange} disabled={data.isPriceDisabled} className="range-slider-input absolute w-full h-full appearance-none bg-transparent z-30" />
            </div>
            <div className="flex justify-between text-xs text-brandGrayDark font-medium">
              <span>{data.isPriceDisabled ? 0 : state.priceMin}€</span>
              <span>{data.isPriceDisabled ? 0 : state.priceMax}€</span>
            </div>
          </div>

          <div className="mt-4 space-y-1 text-xs">
            {[
              { id: "all", label: t.allPrices, count: data.priceTypeCounts.all },
              { id: "free", label: t.free, count: data.priceTypeCounts.free },
              { id: "paid", label: t.paid, count: data.priceTypeCounts.paid }
            ].map((opt) => (
              <button key={opt.id} type="button" onClick={() => actions.setPriceFilter(opt.id as PriceFilter)} className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 transition-colors ${state.priceFilter === opt.id ? "bg-brandBlue/10 text-brandBlue font-medium" : "text-brandGrayDark hover:bg-gray-50"}`}>
                <span>{opt.label}</span><span className="text-gray-400 font-normal">({opt.count})</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-brandGray" />

        {/* CATEGORY */}
        <div>
          <h3 className="text-xs font-semibold text-brandGrayDark mb-2">{t.category}</h3>
          <div className="space-y-1">
            <button onClick={() => actions.setSelectedCategory("")} className={`w-full text-left px-2 py-1.5 rounded-lg text-xs ${!state.selectedCategory ? "bg-brandBlue/10 text-brandBlue font-medium" : "text-brandGrayDark hover:bg-gray-50"}`}>
              {t.all} ({totalApps})
            </button>

            {Array.from(data.categoryCounts.entries()).map(([value, count]) => {
              const isActive = state.selectedCategory?.toLowerCase() === value.toLowerCase();
              return (
                <button
                  key={value}
                  onClick={() => actions.setSelectedCategory(value)}
                  className={`w-full flex justify-between items-center px-2 py-1.5 rounded-lg text-xs transition-colors ${isActive ? "bg-brandBlue/10 text-brandBlue font-medium" : "text-brandGrayDark hover:bg-gray-50"}`}
                >
                  <span className="truncate">{getCategoryName(value, lang)}</span>
                  <span className="text-gray-400">({count as number})</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-brandGray" />

        {/* PLATFORMS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-brandGrayDark">{t.platform}</h3>
            {state.selectedPlatforms.length > 0 && <button onClick={() => actions.setSelectedPlatforms([])} className="text-[10px] text-gray-400 hover:text-brandBlue">{t.clear}</button>}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {Array.from(data.platformCounts.entries()).map(([value, count]) => {
              const active = state.selectedPlatforms.some(p => p.toLowerCase() === value.toLowerCase());
              return (
                <button 
                  key={value} 
                  type="button" 
                  onClick={() => actions.togglePlatform(value)} 
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                    active 
                      ? "bg-brandBlue/10 border-brandBlue text-brandBlue shadow-sm" 
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {getPlatformIcon(value)}
                  <span className="text-[11px] font-medium text-center leading-tight">
                    {formatPlatformName(value)} <span className="opacity-60 whitespace-nowrap">({count as number})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-brandGray" />

        {/* LANGUAGE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-brandGrayDark">{t.language}</h3>
            {state.selectedLanguage && <button onClick={() => actions.setSelectedLanguage("")} className="text-[10px] text-gray-400 hover:text-brandBlue">{t.clear}</button>}
          </div>
          <div className="space-y-1 text-xs">
            <button type="button" onClick={() => actions.setSelectedLanguage("")} className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 ${!state.selectedLanguage ? "bg-brandBlue/10 text-brandBlue font-medium" : "text-brandGrayDark hover:bg-gray-50"}`}>
              <span>{t.all}</span>
            </button>
            {Array.from(data.languageCounts.entries()).map(([value, count]) => {
              const isActive = state.selectedLanguage?.toLowerCase() === value.toLowerCase();
              return (
                <button 
                  key={value} 
                  type="button" 
                  onClick={() => actions.setSelectedLanguage(value)} 
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 ${isActive ? "bg-brandBlue/10 text-brandBlue font-medium" : "text-brandGrayDark hover:bg-gray-50"}`}
                >
                  <span>{getLanguageName(value, lang)}</span>
                  <span className="text-gray-400 font-normal">({count as number})</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-brandGray" />

        {/* RATINGS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-semibold text-brandGrayDark">{t.accessibility}</h3>
              <RatingInfo />
            </div>
            {(state.minEase || state.maxCognitive || state.maxSensory) && <button onClick={() => { actions.setMinEase(""); actions.setMaxCognitive(""); actions.setMaxSensory(""); }} className="text-[10px] text-gray-400 hover:text-brandBlue">{t.clear}</button>}
          </div>

          <div className="space-y-6 pt-1">
            <RatingGroup
              label={t.minEase}
              value={state.minEase}
              onChange={actions.setMinEase}
              mode="min"
              Icon={FaRegSmile}
              activeColorClass="bg-brandBlue"
              textColorClass="text-brandBlue"
            />
            <RatingGroup
              label={t.maxCog}
              value={state.maxCognitive}
              onChange={actions.setMaxCognitive}
              mode="max"
              Icon={FaBrain}
              activeColorClass="bg-purple-400"
              textColorClass="text-purple-400"
            />
            <RatingGroup
              label={t.maxSens}
              value={state.maxSensory}
              onChange={actions.setMaxSensory}
              mode="max"
              Icon={FaRegEye}
              activeColorClass="bg-teal-600"
              textColorClass="text-teal-600"
            />
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden pt-4 border-t border-brandGray">
          <button
            onClick={() => actions.setShowFilters(false)}
            className="w-full py-3 bg-brandBlue text-white rounded-xl font-bold text-sm shadow-md"
          >
            {t.showResults} ({data.filteredApps.length})
          </button>
        </div>
      </aside>
    </>
  );
}