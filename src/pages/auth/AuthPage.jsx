import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

// ─── Asian Paints T20 World Cup Pre-Match Palette ─────────────────────────────
// Deep Navy #090E1A · Vivid Teal #F97316 · Electric Cyan #FB923C
// Coral Burst #38BDF8 · Amber Gold #A78BFA · Soft White #F0F6FF
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_ROLES = [
  { role: 'super_admin', label: 'Super Admin', color: '#A855F7', path: '/super/dashboard' },
  { role: 'admin_college', label: 'College Admin', color: '#3B82F6', path: '/college/dashboard' },
  { role: 'admin_public', label: 'Platform Admin', color: '#FB923C', path: '/platform/dashboard' },
  { role: 'teacher', label: 'Teacher', color: '#22C55E', path: '/teacher/dashboard' },
  { role: 'student_college', label: 'Student (College)', color: '#F97316', path: '/student-college/dashboard' },
  { role: 'student_public', label: 'Student (Public)', color: '#EC4899', path: '/student/dashboard' },
  { role: 'support_agent', label: 'Support Agent', color: '#6B7280', path: '/support/dashboard' },
]

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Branding content for each mode
const brandingContent = {
  login: {
    title: 'Welcome back',
    subtitle: 'The modern examination platform',
    tagline: 'Trusted by 500+ institutions worldwide',
    features: [
      { icon: 'shield', title: 'AI-Powered Proctoring', desc: 'Ensure exam integrity automatically', color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
      { icon: 'bolt', title: 'Instant Results', desc: 'Real-time grading and feedback', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
      { icon: 'chart', title: 'Deep Analytics', desc: 'Insights that drive improvement', color: '#38BDF8', bg: 'rgba(56,189,248,0.15)' },
    ]
  },
  register: {
    title: 'Start your journey',
    subtitle: 'Join thousands of learners today',
    tagline: 'Join 50,000+ students and educators',
    features: [
      { icon: 'book', title: 'Access All Exams', desc: 'Practice with thousands of questions', color: '#FB923C', bg: 'rgba(251,146,60,0.15)' },
      { icon: 'bulb', title: 'AI Study Coach', desc: 'Personalized learning assistance', color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
      { icon: 'badge', title: 'Earn Certificates', desc: 'Verified credentials for your profile', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
    ]
  }
}

const FeatureIcon = ({ type, color }) => {
  const icons = {
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    bolt: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    bulb: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    badge: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
  }
  return (
    <svg fill="none" stroke={color} viewBox="0 0 24 24" width="22" height="22">
      {icons[type]}
    </svg>
  )
}

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, loginAsRole, register } = useAuth()
  
  // Determine initial mode from URL
  const [isLogin, setIsLogin] = useState(location.pathname !== '/register')
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ 
    name: '', email: '', phone: '', password: '', confirmPassword: '' 
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoPanel, setShowDemoPanel] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)

  // Sync URL with mode
  useEffect(() => {
    const path = isLogin ? '/login' : '/register'
    if (location.pathname !== path) {
      navigate(path, { replace: true })
    }
  }, [isLogin, location.pathname, navigate])

  // Handle mode toggle with animation
  const toggleMode = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsLogin(!isLogin)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getRedirectPath = (role, supportTier) => {
    if (role === 'support_agent') {
      return `/support/${supportTier || 'l1'}/dashboard`
    }
    const paths = {
      super_admin: '/super/dashboard',
      admin_college: '/college/dashboard',
      admin_public: '/platform/dashboard',
      teacher: '/teacher/dashboard',
      student_college: '/student-college/dashboard',
      student_public: '/student/dashboard',
    }
    return paths[role] || '/super/dashboard'
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!loginData.email || !loginData.password) {
      toast.error('Please enter email and password')
      return
    }
    
    setIsLoading(true)
    try {
      const data = await login(loginData.email, loginData.password)
      toast.success('Login successful!')
      const role = data?.user?.role || data?.role
      const supportTier = data?.user?.support_tier
      navigate(getRedirectPath(role, supportTier))
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error('Please fill in all required fields')
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (!agreeToTerms) {
      toast.error('Please agree to the Terms & Privacy Policy')
      return
    }
    
    setIsLoading(true)
    try {
      if (register) {
        await register(registerData)
      }
      toast.success('Registration successful! Please verify your email.')
      setIsLogin(true)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role, path) => {
    loginAsRole(role)
    toast.success(`Logged in as ${role.replace(/_/g, ' ')}`)
    navigate(path)
  }

  const handleGoogleAuth = () => {
    toast('Google authentication coming soon!', { icon: '🚀' })
  }

  const content = isLogin ? brandingContent.login : brandingContent.register

  return (
    <div className="min-h-screen overflow-hidden relative font-sans" style={{ background: '#0D081B' }}>
      {/* Container for both panels */}
      <div className="min-h-screen flex relative">
        
        {/* Left Branding Panel (Space Image Setup) */}
        <div 
          className="absolute inset-y-0 w-1/2 hidden lg:flex flex-col p-12 z-20 transition-transform duration-[600ms] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80')",
            transform: isLogin ? 'translateX(0%)' : 'translateX(100%)',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.05, 0.32, 1.05)',
            left: 0,
            justifyContent: 'flex-end',
          }}
        >
          {/* Dark gradient overlay for text readability against space */}
          <div 
            className="absolute inset-0 z-0" 
            style={{ background: 'linear-gradient(to top, #0D081B 0%, rgba(13,8,27,0.4) 60%, transparent 100%)' }} 
          />
          
          <div className="relative z-10 w-full mb-8">
            {/* The main tagline adapted to the adventure theme requested */}
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 uppercase tracking-tight text-white transition-all duration-500 leading-tight">
               {isLogin ? 'Sign In To Your' : 'Begin Your'}<br/>
               <span style={{ color: '#A855F7' }}>ADVENTURE!</span>
            </h1>
            <p className="text-lg mb-8 text-gray-300 font-medium">
              {content.subtitle} — {content.tagline}
            </p>

            <div className="space-y-4">
              {content.features.map((feature, idx) => (
                <div 
                  key={feature.title}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{ 
                    opacity: isAnimating ? 0 : 1, 
                    transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)', 
                    transitionDelay: (idx * 100) + 'ms'
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                    <FeatureIcon type={feature.icon} color="#A855F7" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{feature.title}</p>
                    <p className="text-xs text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle button on branding panel */}
            <div className="mt-10">
              <button
                onClick={toggleMode}
                disabled={isAnimating}
                className="px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 disabled:opacity-50 text-white shadow-xl hover:shadow-purple-500/20"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div 
          className="w-full lg:w-1/2 lg:ml-auto min-h-screen flex flex-col justify-center items-center p-6 lg:p-16 relative overflow-hidden transition-all duration-[600ms]"
          style={{ 
            background: '#0D081B', // Solid matching dark background
            transform: isLogin ? 'translateX(0%)' : 'translateX(-100%)',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.05, 0.32, 1.05)',
          }}
        >
          {/* Back to Home */}
          <Link 
            to="/" 
            className="absolute top-6 left-6 flex items-center gap-2 text-sm transition-colors hover:opacity-80 z-30 font-medium"
            style={{ color: '#A855F7' }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <div className="w-full max-w-[420px] relative z-10">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
                Exam<span style={{ color: '#A855F7' }}>SaaS</span>
              </h1>
            </div>
            
            {/* Login Form */}
            <div 
              className="transition-all duration-500"
              style={{ 
                opacity: isLogin ? 1 : 0,
                transform: isLogin ? 'translateX(0)' : 'translateX(50px)',
                position: isLogin ? 'relative' : 'absolute',
                pointerEvents: isLogin ? 'auto' : 'none',
                width: '100%'
              }}
            >
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 text-white uppercase tracking-tight">SIGN IN</h2>
                <p className="text-sm text-gray-400 font-medium">Sign in with your email address</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ 
                      background: '#1C1535',
                      color: '#F0F6FF',
                      border: 'none',
                      '--tw-ring-color': '#A855F7'
                    }}
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ 
                      background: '#1C1535',
                      color: '#F0F6FF',
                      border: 'none',
                      '--tw-ring-color': '#A855F7'
                    }}
                  />
                </div>
                
                <div className="text-right pt-1 pb-4">
                  <button type="button" className="text-xs font-medium hover:underline" style={{ color: '#A855F7' }}>
                    Forgot password?
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-[14px] font-bold text-base transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)' }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              
              <div className="flex items-center gap-3 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-medium text-gray-400">Or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="flex-1 py-3.5 rounded-[14px] font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                  style={{ background: '#1C1535', color: '#FFF' }}
                >
                  <GoogleIcon />
                  Google
                </button>
                {/* Visual placeholder to match the Facebook button in the mockup */}
                <button
                  type="button"
                  onClick={() => toast('Facebook login disabled')}
                  className="flex-1 py-3.5 rounded-[14px] font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                  style={{ background: '#1C1535', color: '#FFF' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#3B82F6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
              </div>
              
              {/* Mobile toggle */}
              <p className="lg:hidden text-center mt-8 text-sm text-gray-400">
                Don't have an account?{' '}
                <button onClick={toggleMode} className="font-semibold hover:underline" style={{ color: '#A855F7' }}>Create one</button>
              </p>
              
              {/* Demo Login Toggle */}
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => setShowDemoPanel(!showDemoPanel)}
                  className="w-full text-center text-xs py-2 rounded-lg transition-all font-medium"
                  style={{ color: '#888', background: 'rgba(255,255,255,0.02)' }}
                >
                  {showDemoPanel ? 'Hide Demo Accounts' : 'Show Demo Accounts'} ▾
                </button>
                
                {showDemoPanel && (
                  <div className="mt-4 p-4 rounded-xl animate-fadeIn" style={{ background: '#1C1535' }}>
                    <p className="text-xs text-center mb-3 text-gray-400">Click to login as any role</p>
                    <div className="grid grid-cols-2 gap-2">
                      {DEMO_ROLES.map(r => (
                        <button
                          key={r.role}
                          onClick={() => handleDemoLogin(r.role, r.path)}
                          className="px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all hover:scale-[1.02]"
                          style={{ background: 'rgba(255,255,255,0.05)', color: r.color }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Register Form */}
            <div 
              className="transition-all duration-500"
              style={{ 
                opacity: !isLogin ? 1 : 0,
                transform: !isLogin ? 'translateX(0)' : 'translateX(-50px)',
                position: !isLogin ? 'relative' : 'absolute',
                pointerEvents: !isLogin ? 'auto' : 'none',
                width: '100%',
                top: 0
              }}
            >
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 text-white uppercase tracking-tight">SIGN UP</h2>
                <p className="text-sm text-gray-400 font-medium">Create your account with email address</p>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ background: '#1C1535', color: '#F0F6FF', border: 'none', '--tw-ring-color': '#A855F7' }}
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ background: '#1C1535', color: '#F0F6FF', border: 'none', '--tw-ring-color': '#A855F7' }}
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Password (Min 8 chars)"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ background: '#1C1535', color: '#F0F6FF', border: 'none', '--tw-ring-color': '#A855F7' }}
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Confirm Password"
                    className="w-full px-5 py-4 rounded-[14px] text-sm outline-none transition-all focus:ring-2 placeholder-gray-500"
                    style={{ background: '#1C1535', color: '#F0F6FF', border: 'none', '--tw-ring-color': '#A855F7' }}
                  />
                </div>
                
                <div className="flex items-start gap-3 py-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded"
                    style={{ accentColor: '#A855F7' }}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400">
                    By registering you agree with our{' '}
                    <Link to="/terms" className="text-[#A855F7] hover:underline">Terms and Conditions</Link>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-[14px] font-bold text-base transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)' }}
                >
                  {isLoading ? 'Creating...' : 'Sign Up'}
                </button>
              </form>
              
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-medium text-gray-400">Or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="flex-1 py-3.5 rounded-[14px] font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                  style={{ background: '#1C1535', color: '#FFF' }}
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => toast('Facebook login disabled')}
                  className="flex-1 py-3.5 rounded-[14px] font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                  style={{ background: '#1C1535', color: '#FFF' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#3B82F6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
              </div>
              
              {/* Mobile toggle */}
              <p className="lg:hidden text-center mt-8 text-sm text-gray-400">
                Already have an account?{' '}
                <button onClick={toggleMode} className="font-semibold hover:underline" style={{ color: '#A855F7' }}>Sign in</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
