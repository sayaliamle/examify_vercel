import { BookOpen, Video, Lightbulb, MessageCircle, Clock, Trophy, HelpCircle, Mail, Bug, LifeBuoy } from 'lucide-react'
import { PageHeader } from '../../../components/layout/PageHeader'

export function L2HelpResourcesPage() {
  const resources = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of L2 support operations',
      link: 'https://docs.example.com/l2-getting-started',
      external: true
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides for L2 tasks',
      link: 'https://www.example.com/l2-tutorials',
      external: true
    },
    {
      icon: Lightbulb,
      title: 'Best Practices',
      description: 'Discover tips for managing L1 agents',
      link: 'https://docs.example.com/l2-best-practices',
      external: true
    },
    {
      icon: MessageCircle,
      title: 'Team Chat',
      description: 'Connect with other L2 supervisors',
      link: 'https://chat.example.com/l2-team',
      external: true
    },
    {
      icon: Clock,
      title: 'SLA Information',
      description: 'Understand L2 SLA targets and metrics',
      link: 'https://docs.example.com/l2-sla',
      external: true
    },
    {
      icon: Trophy,
      title: 'Performance Tips',
      description: 'Tips to boost team performance',
      link: 'https://docs.example.com/l2-performance',
      external: true
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Frequently asked questions for L2',
      link: 'https://docs.example.com/l2-faq',
      external: true
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Reach out to L3 support team',
      link: 'mailto:support@example.com',
      external: true
    },
    {
      icon: Bug,
      title: 'Report a Bug',
      description: 'Submit a bug report or feature request',
      link: 'https://support.example.com/report-bug',
      external: true
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Resources"
        subtitle="Everything you need to succeed as an L2 supervisor"
        icon={LifeBuoy}
      />

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, idx) => {
          const Icon = resource.icon
          return (
            <a
              key={idx}
              href={resource.link}
              target={resource.external ? '_blank' : undefined}
              rel={resource.external ? 'noopener noreferrer' : undefined}
              className="card-modern-hover p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500 transition-all">
                  <Icon className="text-primary-500 group-hover:text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-surface-900 dark:text-surface-100 font-semibold mb-1 group-hover:text-primary-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">{resource.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-modern p-4 text-center">
          <p className="text-2xl font-bold text-primary-500">98%</p>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Team Success Rate</p>
        </div>
        <div className="card-modern p-4 text-center">
          <p className="text-2xl font-bold text-primary-500">4h</p>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Avg Response Time</p>
        </div>
        <div className="card-modern p-4 text-center">
          <p className="text-2xl font-bold text-primary-500">4.8★</p>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Team Rating</p>
        </div>
        <div className="card-modern p-4 text-center">
          <p className="text-2xl font-bold text-primary-500">5</p>
          <p className="text-surface-500 dark:text-surface-400 text-sm">L1 Agents</p>
        </div>
      </div>
    </div>
  )
}