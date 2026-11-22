"use client";

import React from "react";
import {
  FaFilter,
  FaChevronUp,
  FaChevronDown,
  FaRegSmile,
  FaBrain,
  FaRegEye,
} from "react-icons/fa";
import { RatingInfo } from "./RatingInfo";
import { UseAppsBrowserReturn, getLanguageName, PriceFilter } from "@/src/lib/useAppBrowser";
import { getCategoryName } from "@/src/lib/categoryTranslations";
import { PlatformIcon, getPlatformName } from "@/src/lib/platforms";

interface FilterSidebarProps {
  browser: UseAppsBrowserReturn;
  lang: "en" | "es";
  totalApps: number;
}

type BrowserTexts = UseAppsBrowserReturn["t"];

// Shared styles, so every option looks and behaves the same way.
const optionBase = "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-base transition-colors";
const optionActive = "bg-brandBlue/10 text-brandBlue font-bold ring-2 ring-brandBlue";
const optionIdle = "text-brandGrayDark hover:bg-gray-100";
const clearButton = "text-sm font-medium text-brandBlue underline underline-offset-2 hover:text-brandGrayDark";

// --- RATING GROUP ---
// Name, one short hint and the buttons. When a value is chosen, a coloured tag
// next to the name says it in words ("4 o más"). The full explanation is in the (i) dialog.
interface RatingGroupProps {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  mode: "min" | "max";
  Icon: React.ElementType;
  activeColorClass: string;
  textColorClass: string;
  t: BrowserTexts;
}

function RatingGroup({ label, hint, value, onChange, mode, Icon, activeColorClass, textColorClass, t }: RatingGroupProps) {
  const current = value ? Number(value) : null;
  const rangeWord = mode === "min" ? t.orMore : t.orLess;

  return (
    <fieldset>
      <legend className="flex w-full items-center justify-between gap-2 mb-1">
        <span className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${textColorClass}`} aria-hidden="true" />
          <span className="text-base font-bold text-brandGrayDark">{label}</span>
        </span>
        {current !== null && (
          <span className={`rounded-full px-2 py-0.5 text-sm font-bold text-white ${activeColorClass}`}>
            {current} {rangeWord}
          </span>
        )}
      </legend>
      <p className="text-sm text-gray-700 mb-2">{hint}</p>

      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((num) => {
          const isActive = current === num;
          const isInRange = current !== null && !isActive && (mode === "min" ? num > current : num < current);

          let buttonClass = "flex-1 h-10 rounded-lg text-base font-bold transition-colors border-2 flex items-center justify-center ";
          if (isActive) {
            buttonClass += `${activeColorClass} text-white border-transparent`;
          } else if (isInRange) {
            buttonClass += `bg-gray-100 ${textColorClass} border-current`;
          } else {
            buttonClass += "bg-white text-brandGrayDark border-gray-300 hover:border-gray-500";
          }

          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(isActive ? "" : num.toString())}
              className={buttonClass}
              aria-pressed={isActive}
              aria-label={`${label}: ${num} ${rangeWord}`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// --- MAIN SIDEBAR ---
export function FilterSidebar({ browser, lang, totalApps }: FilterSidebarProps) {
  const { state, actions, data, t } = browser;

  const priceIsFiltered = state.priceFilter !== "all";
  const ratingsAreFiltered = Boolean(state.minEase || state.maxCognitive || state.maxSensory);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => actions.setShowFilters(!state.showFilters)}
          aria-expanded={state.showFilters}
          aria-controls="filters-panel"
          className="flex items-center justify-between w-full p-4 bg-white border-2 border-brandGray rounded-xl text-brandGrayDark text-base font-bold"
        >
          <span className="flex items-center gap-2">
            <FaFilter className="text-brandBlue" aria-hidden="true" />
            {t.filters}
            {data.hasActiveFilters && (
              <span className="ml-1 text-sm bg-brandBlue text-white px-2 py-0.5 rounded-full">{t.active}</span>
            )}
          </span>
          {state.showFilters ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
        </button>
      </div>

      {/* FILTER PANEL */}
      <aside
        id="filters-panel"
        aria-label={t.filters}
        className={`lg:block lg:w-80 w-full lg:shrink-0 bg-white border-2 border-brandGray rounded-2xl p-5 space-y-6 self-start ${state.showFilters ? "block" : "hidden"}`}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-brandGray">
          <h2 className="flex items-center gap-2 text-lg font-bold text-brandGrayDark">
            <FaFilter className="w-4 h-4 text-brandBlue" aria-hidden="true" />
            {t.filters}
          </h2>
          {data.hasActiveFilters && (
            <button type="button" onClick={actions.resetAllFilters} className="text-sm font-bold text-red-700 underline underline-offset-2 hover:text-red-900">
              {t.removeAll}
            </button>
          )}
        </div>

        {/* CATEGORY */}
        <section aria-labelledby="filter-category">
          <h3 id="filter-category" className="text-base font-bold text-brandGrayDark mb-2">{t.category}</h3>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => actions.setSelectedCategory("")}
              aria-pressed={!state.selectedCategory}
              className={`${optionBase} ${!state.selectedCategory ? optionActive : optionIdle}`}
            >
              <span>{t.all}</span>
              <span className="text-gray-700 font-normal">({totalApps})</span>
            </button>

            {Array.from(data.categoryCounts.entries()).map(([value, count]) => {
              const isActive = state.selectedCategory?.toLowerCase() === value.toLowerCase();
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => actions.setSelectedCategory(value)}
                  aria-pressed={isActive}
                  className={`${optionBase} ${isActive ? optionActive : optionIdle}`}
                >
                  <span>{getCategoryName(value, lang)}</span>
                  <span className="text-gray-700 font-normal">({count as number})</span>
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-brandGray" />

        {/* PRICE */}
        <section aria-labelledby="filter-price">
          <div className="flex items-center justify-between mb-2">
            <h3 id="filter-price" className="text-base font-bold text-brandGrayDark">{t.priceRange}</h3>
            {priceIsFiltered && (
              <button
                type="button"
                onClick={() => { actions.setPriceFilter("all"); actions.setPriceMin(data.globalMin); actions.setPriceMax(data.globalMax); }}
                className={clearButton}
              >
                {t.clear}
              </button>
            )}
          </div>
          <div className="space-y-1">
            {[
              { id: "all", label: t.allPrices, count: data.priceTypeCounts.all },
              { id: "free", label: t.free, count: data.priceTypeCounts.free },
              { id: "paid", label: t.paid, count: data.priceTypeCounts.paid },
            ].map((opt) => {
              const isActive = state.priceFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => actions.setPriceFilter(opt.id as PriceFilter)}
                  aria-pressed={isActive}
                  className={`${optionBase} ${isActive ? optionActive : optionIdle}`}
                >
                  <span>{opt.label}</span>
                  <span className="text-gray-700 font-normal">({opt.count})</span>
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-brandGray" />

        {/* ACCESSIBILITY */}
        <section aria-labelledby="filter-accessibility">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h3 id="filter-accessibility" className="text-base font-bold text-brandGrayDark">{t.accessibility}</h3>
              <RatingInfo />
            </div>
            {ratingsAreFiltered && (
              <button
                type="button"
                onClick={() => { actions.setMinEase(""); actions.setMaxCognitive(""); actions.setMaxSensory(""); }}
                className={clearButton}
              >
                {t.clear}
              </button>
            )}
          </div>

          <div className="space-y-5">
            <RatingGroup
              label={t.minEase}
              hint={t.easeHint}
              value={state.minEase}
              onChange={actions.setMinEase}
              mode="min"
              Icon={FaRegSmile}
              activeColorClass="bg-brandBlue"
              textColorClass="text-brandBlue"
              t={t}
            />
            <RatingGroup
              label={t.maxCog}
              hint={t.cogHint}
              value={state.maxCognitive}
              onChange={actions.setMaxCognitive}
              mode="max"
              Icon={FaBrain}
              activeColorClass="bg-purple-700"
              textColorClass="text-purple-700"
              t={t}
            />
            <RatingGroup
              label={t.maxSens}
              hint={t.sensHint}
              value={state.maxSensory}
              onChange={actions.setMaxSensory}
              mode="max"
              Icon={FaRegEye}
              activeColorClass="bg-teal-700"
              textColorClass="text-teal-700"
              t={t}
            />
          </div>
        </section>

        <hr className="border-brandGray" />

        {/* DEVICE: compact 2-column grid, icon + name */}
        <section aria-labelledby="filter-device">
          <div className="flex items-center justify-between mb-2">
            <h3 id="filter-device" className="text-base font-bold text-brandGrayDark">{t.platform}</h3>
            {state.selectedPlatforms.length > 0 && (
              <button type="button" onClick={() => actions.setSelectedPlatforms([])} className={clearButton}>
                {t.clear}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from(data.platformCounts.entries()).map(([value, count]) => {
              const active = state.selectedPlatforms.some((p) => p.toLowerCase() === value.toLowerCase());
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => actions.togglePlatform(value)}
                  aria-pressed={active}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-2 text-sm transition-colors ${
                    active ? "bg-brandBlue/10 border-brandBlue text-brandBlue font-bold" : "bg-white border-gray-300 text-brandGrayDark hover:border-gray-500"
                  }`}
                >
                  <PlatformIcon platform={value} className="w-5 h-5" />
                  <span className="text-center leading-tight">
                    {getPlatformName(value, lang)} <span className="font-normal text-gray-700">({count as number})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-brandGray" />

        {/* LANGUAGE */}
        <section aria-labelledby="filter-language">
          <div className="flex items-center justify-between mb-2">
            <h3 id="filter-language" className="text-base font-bold text-brandGrayDark">{t.language}</h3>
            {state.selectedLanguage && (
              <button type="button" onClick={() => actions.setSelectedLanguage("")} className={clearButton}>
                {t.clear}
              </button>
            )}
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => actions.setSelectedLanguage("")}
              aria-pressed={!state.selectedLanguage}
              className={`${optionBase} ${!state.selectedLanguage ? optionActive : optionIdle}`}
            >
              <span>{t.all}</span>
            </button>
            {Array.from(data.languageCounts.entries()).map(([value, count]) => {
              const isActive = state.selectedLanguage?.toLowerCase() === value.toLowerCase();
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => actions.setSelectedLanguage(value)}
                  aria-pressed={isActive}
                  className={`${optionBase} ${isActive ? optionActive : optionIdle}`}
                >
                  <span>{getLanguageName(value, lang)}</span>
                  <span className="text-gray-700 font-normal">({count as number})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mobile: close the panel and see the results */}
        <div className="lg:hidden pt-4 border-t-2 border-brandGray">
          <button
            type="button"
            onClick={() => actions.setShowFilters(false)}
            className="w-full py-3 bg-brandBlue text-white rounded-xl font-bold text-base"
          >
            {t.showResults} ({data.filteredApps.length})
          </button>
        </div>
      </aside>
    </>
  );
}
