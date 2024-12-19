import * as React from "react"
import { ChevronDown } from "lucide-react"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  className?: string
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, children, align = "left", className = "" }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {trigger}
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)
Dropdown.displayName = "Dropdown"

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  active?: boolean
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, active, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          w-full px-4 py-2 text-sm text-left hover:bg-gray-100
          ${active ? "bg-gray-50 text-primary" : "text-gray-700"}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownItem.displayName = "DropdownItem"
