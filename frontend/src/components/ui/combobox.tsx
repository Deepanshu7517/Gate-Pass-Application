"use client";
import { useState, useMemo, useRef, useEffect } from "preact/hooks";
import { Check, ChevronsUpDown } from "lucide-preact";
import { cn } from "../../lib/utils"; // adjust path to your utils
import { Button } from "./button";

type Option = { value: string; label: string };

type ComboboxProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className = "",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  // Close popover if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((option) => option.value === value)?.label || "";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full justify-between h-12 text-base",
          !value && "text-muted-foreground"
        )}
      >
        {selectedLabel || placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {/* Popover Dropdown */}
      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          {/* Search Box */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onInput={(e) =>
                setSearch((e.target as HTMLInputElement).value)
              }
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Option List */}
          <ul className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100",
                    value === option.value && "bg-gray-50 font-medium"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
