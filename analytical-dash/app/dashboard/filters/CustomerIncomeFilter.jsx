import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

export default function CustomerIncomeFilter({ min, max, value, onChange, isMobile: isMobileProp }) {
  const isMobileHook = useIsMobile();
  const isMobile = typeof isMobileProp === "boolean" ? isMobileProp : isMobileHook;

  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  useEffect(() => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  }, [value[0], value[1]]);

  function handleInputChange(e, type) {
    let val = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (isNaN(val)) val = 0;

    if (type === "min") {
      setLocalMin(val);
      if (val <= localMax && val >= min && val <= max)
        onChange([val, localMax]);
    } else {
      setLocalMax(val);
      if (val >= localMin && val >= min && val <= max)
        onChange([localMin, val]);
    }
  }

  function handleBlur(type) {
    let newMin = Math.max(min, Math.min(localMin, max));
    let newMax = Math.max(min, Math.min(localMax, max));
    if (newMin > newMax) newMin = newMax;
    setLocalMin(newMin);
    setLocalMax(newMax);
    onChange([newMin, newMax]);
  }

  const inputClass =
    "border rounded px-2 py-1 text-sm transition-all duration-200 " +
    (isMobile
      ? "w-20 text-sm"
      : "w-24 text-sm");

  return (
    <div className={isMobile ? "flex flex-col gap-2 w-full" : "flex items-center gap-2"}>
      <div className={isMobile ? "flex items-center gap-1" : undefined}>
        <input
          type="number"
          className={inputClass}
          min={min}
          max={max}
          value={localMin}
          onChange={(e) => handleInputChange(e, "min")}
          onBlur={() => handleBlur("min")}
          placeholder="Min"
          inputMode="numeric"
        />
        <span className="text-xs text-gray-400">{isMobile ? "to" : "—"}</span>
        <input
          type="number"
          className={inputClass}
          min={min}
          max={max}
          value={localMax}
          onChange={(e) => handleInputChange(e, "max")}
          onBlur={() => handleBlur("max")}
          placeholder="Max"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}