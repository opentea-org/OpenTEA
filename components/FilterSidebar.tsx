// components/FilterSidebar.tsx

export function FilterSidebar({ 
  t, activeFilters, counts, onReset, children 
}: any) {
  return (
    <aside className="lg:block lg:w-72 w-full bg-white border border-brandGray rounded-2xl p-4 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-brandGray">
        <h2 className="text-sm font-semibold text-brandGrayDark">{t.filters}</h2>
        {activeFilters && <button onClick={onReset} className="text-[10px] text-red-500 underline">{t.removeAll}</button>}
      </div>
      {children}
    </aside>
  );
}