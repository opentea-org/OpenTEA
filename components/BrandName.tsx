// components/BrandName.tsx
// The OpenTEA name with its colours: "Open" in the text colour, "TE" in blue and "A" in green.
// Uses the brand blue and brand green.
export function BrandName() {
  return (
    <>
      Open<span className="text-brandBlue">TE</span><span className="text-brandGreen">A</span>
    </>
  );
}
