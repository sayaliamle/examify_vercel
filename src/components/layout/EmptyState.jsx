import { clsx } from 'clsx'
import { Button } from '../ui/Button'

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  actionLabel,
  className 
}) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-4', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
          <Icon size={32} className="text-surface-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-surface-500 dark:text-surface-400 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action} icon={Icon && <Icon size={18} />}>
          {actionLabel || 'Get Started'}
        </Button>
      )}
    </div>
  )
}

export function LoadingState({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-primary-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
      <p className="text-surface-500 dark:text-surface-400">{text}</p>
    </div>
  )
}

export function ErrorState({ 
  message = 'Something went wrong', 
  onRetry,
  className 
}) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-4', className)}>
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
        {message}
      </h3>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
