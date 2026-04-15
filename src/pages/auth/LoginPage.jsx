import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const EyeIcon = ({ visible }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

export function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoPanel, setShowDemoPanel] = useState(false)
  const { login, register, loginAsRole } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setIsRegister(window.location.pathname === '/register')
  }, [])

  const handleRealLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    
    setIsLoading(true)
    try {
      const data = await login(email, password)
      toast.success('Login successful!')
      
      const role = data?.user?.role
      const supportTier = data?.user?.support_tier
      
      const redirectPath = role === 'support_agent' 
        ? `/support/${supportTier || 'l1'}/dashboard`
        : getRedirectPath(role, data?.user)
      
      navigate(redirectPath)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

   const getRedirectPath = (role, user) => {
     const paths = {
       super_admin: '/super/dashboard',
       admin_college: '/college/dashboard',
       admin_public: '/platform/dashboard',
       teacher: '/teacher/dashboard',
       student_college: '/student-college/dashboard',
       student_public: '/student/dashboard',
       support_agent: `/support/${user?.support_tier || 'l1'}/dashboard`,
     }
     return paths[role] || '/super/dashboard'
   }

  const handleDemoLogin = (role, path) => {
    loginAsRole(role)
    toast.success(`Logged in as ${role.replace(/_/g, ' ')}`)
    navigate(path)
  }

  const handleGoogleLogin = () => {
    toast('Google login coming soon!', { icon: '🚀' })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('Please fill all fields')
      return
    }
    
    setIsLoading(true)
    try {
      await register({ name, email, password })
      toast.success('Registration successful!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .font-sans{font-family:'Plus Jakarta Sans',sans-serif;}
        .text-gradient{background:linear-gradient(135deg,#F97316,#EA580C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .btn-primary{background:linear-gradient(135deg,#F97316,#EA580C);transition:all 0.3s ease;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(249,115,22,0.4);}
        .glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);}
        .glass-dark{background:rgba(14,9,26,0.8);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);}
        .input-field{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);transition:all 0.3s ease;}
        .input-field:focus{border-color:#F97316;box-shadow:0 0 0 3px rgba(249,115,22,0.15);outline:none;}
        .social-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);transition:all 0.3s ease;}
        .social-btn:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);}
        .floating-shape{animation:float 6s ease-in-out infinite;}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-15px);}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        .animate-fade{animation:fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;}
        .animate-delay-1{animation-delay:0.15s;opacity:0;}
        .animate-delay-2{animation-delay:0.3s;opacity:0;}
        .animate-delay-3{animation-delay:0.45s;opacity:0;}
        .animate-delay-4{animation-delay:0.6s;opacity:0;}
        .feature-item{transition:all 0.3s ease;}
        .feature-item:hover{transform:translateX(8px);}
        .glow-btn{position:relative;overflow:hidden;}
        .glow-btn::before{content:'';position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.2);transform:translate(-50%,-50%);transition:width 0.6s,height 0.6s;}
        .glow-btn:hover::before{width:300px;height:300px;}
        .stars{position:absolute;width:100%;height:100%;overflow:hidden;}
        .star{position:absolute;background:white;border-radius:50%;animation:twinkle var(--duration) ease-in-out infinite, shoot var(--shoot-duration) linear infinite;}
        @keyframes twinkle{0%,100%{opacity:0.3;}50%{opacity:1;}}
        @keyframes shoot{0%{transform:translate(var(--start-x), var(--start-y));}100%{transform:translate(calc(var(--start-x) + var(--move-x)), calc(var(--start-y) + var(--move-y)));}}
      `}</style>
      
      {/* Left Panel - Hero Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 flex-col justify-center relative overflow-hidden"
        style={{ 
          background: "url('https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1920&q=80') center/cover",
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-black/60" />
        
        {/* Stars Background */}
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="star"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                '--duration': Math.random() * 3 + 2 + 's',
                '--shoot-duration': Math.random() * 15 + 10 + 's',
                '--start-x': (Math.random() - 0.5) * 100 + 'px',
                '--start-y': (Math.random() - 0.5) * 100 + 'px',
                '--move-x': (Math.random() - 0.5) * 200 + 'px',
                '--move-y': (Math.random() - 0.5) * 200 + 'px',
                animationDelay: Math.random() * 3 + 's',
                boxShadow: Math.random() > 0.7 ? `0 0 ${Math.random() * 3 + 2}px rgba(255,255,255,0.5)` : 'none'
              }}
            />
          ))}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orange-500/20 blur-3xl floating-shape" />
        <div className="absolute bottom-32 right-20 w-60 h-60 rounded-full bg-amber-500/20 blur-3xl floating-shape" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-yellow-500/10 blur-2xl floating-shape" style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10 max-w-lg px-16 animate-fade">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shadow-xl">
              <span className="text-2xl font-extrabold text-gradient">E</span>
            </div>
            <span className="text-2xl font-bold text-white">Examify</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            <span className="text-white">{isRegister ? 'START YOUR ' : 'SIGN IN TO YOUR '}</span>
            <span className="text-gradient">{isRegister ? 'JOURNEY!' : 'ADVENTURE!'}</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-base text-gray-300 mb-6 leading-relaxed">
            {isRegister 
              ? 'Join thousands of students and educators using our platform daily' 
              : 'The modern examination platform — Trusted by 500+ institutions worldwide'}
          </p>
          
          {/* Feature Points */}
          <div className="space-y-3">
            {(isRegister ? [
              { icon: ShieldIcon, text: 'Secure & Reliable', color: '#3B82F6' },
              { icon: LightningIcon, text: 'Easy Setup', color: '#22C55E' },
              { icon: ChartIcon, text: 'Track Progress', color: '#A855F7' },
            ] : [
              { icon: ShieldIcon, text: 'AI-Powered Proctoring', color: '#3B82F6' },
              { icon: LightningIcon, text: 'Instant Results', color: '#FBBF24' },
              { icon: ChartIcon, text: 'Deep Analytics', color: '#FB923C' },
            ]).map((feature, i) => (
              <div key={i} className="feature-item flex items-center gap-4 py-3 px-4 rounded-2xl" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${feature.color}20` }}>
                  <feature.icon style={{ color: feature.color }} />
                </div>
                <span className="text-white font-medium text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Create Account Button */}
          <Link 
            to={isRegister ? '/login' : '/register'}
            className="inline-flex items-center gap-3 px-6 py-3 mt-6 rounded-2xl text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 text-sm"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {isRegister ? 'Sign In' : 'Create Account'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Panel - Login Card */}
      <div 
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative"
        style={{ background: '#090E1A' }}
      >
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        
        {/* Back to Home */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: '#94a3b8' }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8 animate-fade">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shadow-lg">
              <span className="text-lg font-extrabold text-gradient">E</span>
            </div>
            <span className="text-xl font-bold text-white">Examify</span>
          </div>
          
          {/* Login Card */}
          <div className="glass-dark rounded-3xl p-6 animate-fade animate-delay-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-1 animate-fade animate-delay-2">{isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}</h2>
              <p className="text-xs animate-fade animate-delay-2" style={{ color: '#94a3b8' }}>
                {isRegister ? 'Create your account to get started' : 'Sign in with your email address'}
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={isRegister ? handleRegister : handleRealLogin} className="space-y-4">
              {isRegister && (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
                  />
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input-field w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                  style={{ color: '#64748b' }}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
              
              {!isRegister && (
                <div className="text-right -mt-1">
                  <button type="button" className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: '#F97316' }}>
                    Forgot password?
                  </button>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="glow-btn btn-primary w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (isRegister ? 'Create Account' : 'Sign In')}
              </button>
            </form>
            
            {/* Divider */}
            {!isRegister && (
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <span className="text-xs font-medium" style={{ color: '#64748b' }}>Or continue with</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              </div>
            )}
            
            {/* Social Login */}
            {!isRegister && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="social-btn flex-1 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2"
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => toast('Facebook login coming soon!')}
                  className="social-btn flex-1 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2"
                >
                  <FacebookIcon />
                  Facebook
                </button>
              </div>
            )}
            
            {/* Switch Login/Register */}
            <div className="mt-4 text-center">
              <span className="text-xs" style={{ color: '#64748b' }}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Link 
                  to={isRegister ? '/login' : '/register'} 
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#F97316' }}
                >
                  {isRegister ? 'Sign In' : 'Create Account'}
                </Link>
              </span>
            </div>
          </div>
          
          {/* Demo Login Toggle */}
          {!isRegister && (
            <div className="mt-4 animate-fade animate-delay-3">
            <button
              type="button"
              onClick={() => setShowDemoPanel(!showDemoPanel)}
              className="w-full text-center text-xs py-3 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.03)', color: '#64748b' }}
            >
              {showDemoPanel ? 'Hide Demo Accounts' : 'Show Demo Accounts'} ▾
            </button>
            
            {showDemoPanel && (
              <div className="mt-3 p-4 rounded-2xl glass-dark">
                <p className="text-xs text-center mb-3" style={{ color: '#64748b' }}>Click to login as any role</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { role: 'super_admin', label: 'Super Admin', color: '#A78BFA' },
                    { role: 'admin_college', label: 'College Admin', color: '#3B82F6' },
                    { role: 'admin_public', label: 'Platform Admin', color: '#F97316' },
                    { role: 'teacher', label: 'Teacher', color: '#22C55E' },
                    { role: 'student_college', label: 'Student', color: '#EC4899' },
                    { role: 'student_public', label: 'Public User', color: '#06B6D4' },
                  ].map(r => (
                    <button
                      key={r.role}
                      onClick={() => handleDemoLogin(r.role, r.role.includes('student_college') ? '/student-college/dashboard' : r.role.includes('student') ? '/student/dashboard' : r.role.includes('admin_college') ? '/college/dashboard' : r.role.includes('admin_public') ? '/platform/dashboard' : r.role.includes('super') ? '/super/dashboard' : r.role.includes('support') ? '/support/dashboard' : '/teacher/dashboard')}
                      className="px-2 py-2 rounded-lg text-xs font-semibold text-left transition-all hover:scale-[1.02]"
                      style={{ 
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${r.color}30`,
                        color: r.color
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
