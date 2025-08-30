import React, { useState, useEffect } from "react";
import { isValidHex, normalizeHex } from "../lib/utils/validation";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ColorPicker({
  label,
  value,
  onChange,
  placeholder,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "" || isValidHex(newValue)) {
      setIsValid(true);
      onChange(normalizeHex(newValue));
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    if (inputValue && isValidHex(inputValue)) {
      const normalized = normalizeHex(inputValue);
      setInputValue(normalized);
      onChange(normalized);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder || "#000000"}
          className={`w-full bg-slate-700 border rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${
            isValid
              ? "border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20"
              : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
          }`}
        />
        {!isValid && (
          <p className="text-red-400 text-xs mt-1">Invalid HEX color format</p>
        )}
      </div>

      <div className="flex flex-col items-center space-y-1">
        <div
          className="w-8 h-8 rounded-full border-2 border-slate-600"
          style={{
            backgroundColor: isValid && inputValue ? inputValue : "#374151",
            opacity: isValid && inputValue ? 1 : 0.5,
          }}
          title={inputValue || "No color selected"}
        />
        <span className="text-xs text-slate-400 sr-only">
          {inputValue || "No color selected"}
        </span>
      </div>
    </div>
  );
}
