import { clsx } from 'clsx'

export function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  badge, 
  icon: Icon,
  className 
}) {
  return (
    <div className={clsx('flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8', className)}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-orange-500 items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            {badge}
          </div>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

export function PageDescription({ children, className }) {
  return (
    <p className={clsx('text-slate-500 dark:text-slate-400 text-sm', className)}>
      {children}
    </p>
  )
}

export function PageActions({ children, className }) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {children}
    </div>
  )
}
