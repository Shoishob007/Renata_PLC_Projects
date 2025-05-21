import { useState } from "react";

export default function CustomerIncomeFilter({ min, max, value, onChange }) {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

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

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className="border rounded px-2 py-1 w-24 text-sm"
        min={min}
        max={max}
        value={localMin}
        onChange={(e) => handleInputChange(e, "min")}
        onBlur={() => handleBlur("min")}
        placeholder="Min"
      />
      <span className="text-xs text-gray-400">—</span>
      <input
        type="number"
        className="border rounded px-2 py-1 w-24 text-sm"
        min={min}
        max={max}
        value={localMax}
        onChange={(e) => handleInputChange(e, "max")}
        onBlur={() => handleBlur("max")}
        placeholder="Max"
      />
      {/* <button
        className="ml-2 text-sm px-2 py-1 border rounded bg-gray-50 hover:bg-gray-100"
        type="button"
        onClick={() => {
          setLocalMin(min);
          setLocalMax(max);
          onChange([min, max]);
        }}
        title="Reset income filter"
      >
        Reset
      </button> */}
    </div>
  );
}
