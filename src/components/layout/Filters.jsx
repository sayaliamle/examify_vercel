import { clsx } from 'clsx'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function Filters({ 
  search, 
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  onFilterChange,
  onReset,
  className 
}) {
  const hasActiveFilters = search || filters.some(f => f.value)

  return (
    <div className={clsx('flex flex-col lg:flex-row gap-4', className)}>
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange?.('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {filters.map((filter) => (
          filter.type === 'select' ? (
            <select
              key={filter.key}
              value={filter.value}
              onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
              className="px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all min-w-[140px]"
            >
              <option value="">{filter.label}</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : filter.type === 'button' ? (
            <Button
              key={filter.key}
              variant={filter.variant || 'outline'}
              size="sm"
              onClick={filter.onClick}
              icon={filter.icon}
            >
              {filter.label}
            </Button>
          ) : null
        ))}

        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors flex items-center gap-1"
          >
            <X size={16} /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export function FilterBadge({ label, value, onRemove }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
      <button onClick={onRemove} className="hover:text-primary-700">
        <X size={14} />
      </button>
    </div>
  )
}
