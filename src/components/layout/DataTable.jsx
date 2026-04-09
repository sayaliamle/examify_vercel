import { clsx } from 'clsx'
import { Skeleton } from '../ui/Skeleton'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

export function DataTable({ 
  columns, 
  data, 
  loading,
  emptyState: EmptyState,
  actions,
  onRowClick,
  className 
}) {
  if (loading) {
    return (
      <div className={clsx('rounded-2xl overflow-hidden', className)}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-800/50">
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-surface-100 dark:border-surface-800">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <Skeleton className="h-8 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (!loading && (!data || data.length === 0)) {
    return EmptyState ? <EmptyState /> : (
      <div className="card-modern p-12 text-center">
        <p className="text-surface-500">No data available</p>
      </div>
    )
  }

  return (
    <div className={clsx('rounded-2xl overflow-hidden card-modern', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 dark:bg-surface-800/50">
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
            {data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  'transition-colors',
                  onRowClick && 'cursor-pointer',
                  onRowClick && 'hover:bg-surface-50 dark:hover:bg-surface-800/50'
                )}
              >
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={clsx(
                      'px-6 py-4 text-sm text-surface-700 dark:text-surface-300',
                      col.className
                    )}
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DataTableFooter({ showing, total, className }) {
  return (
    <div className={clsx('px-6 py-4 border-t border-surface-200 dark:border-surface-700 text-sm text-surface-500', className)}>
      Showing {showing} of {total} results
    </div>
  )
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
}) {
  const getPages = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div className={clsx('flex items-center justify-center gap-2', className)}>
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {getPages().map((page, i) => (
        page === '...' ? (
          <span key={i} className="px-3 py-2 text-surface-400">...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange?.(page)}
            className={clsx(
              'w-10 h-10 rounded-xl text-sm font-medium transition-colors',
              currentPage === page
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400'
            )}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
