import React, { useState } from "react";
import { ChevronDownIcon } from "./icons";

interface PresetSelectorProps<T> {
  label: string;
  presets: T[];
  value: T | "custom";
  onChange: (value: T | "custom") => void;
  onCustomChange?: (customValue: any) => void;
  customValue?: any;
  renderCustomField?: () => React.ReactNode;
  getDisplayName: (item: T) => string;
  placeholder?: string;
}

export function PresetSelector<T>({
  label,
  presets,
  value,
  onChange,
  onCustomChange,
  customValue,
  renderCustomField,
  getDisplayName,
  placeholder,
}: PresetSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selected: T | "custom") => {
    onChange(selected);
    setIsOpen(false);
  };

  const isCustom = value === "custom";

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-left text-slate-200 hover:border-cyan-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">
            {isCustom ? "Custom" : getDisplayName(value as T)}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-4 w-4 text-slate-400" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg">
            <ul className="max-h-60 overflow-auto">
              {presets.map((preset, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSelect(preset)}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
                  >
                    {getDisplayName(preset)}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect("custom")}
                  className="w-full text-left px-3 py-2 text-cyan-400 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none font-medium"
                >
                  Custom
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isCustom && renderCustomField && (
        <div className="mt-3 p-3 bg-slate-800/50 border border-slate-600 rounded-lg">
          {renderCustomField()}
        </div>
      )}
    </div>
  );
}
