'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  onClose: () => void;
}

type Mode = 'login' | 'signup' | 'forgot';

export default function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp, resetPassword, signInWithGoogle } = useAuth();

  function switchMode(next: Mode) {
    setMode(next);
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        onClose();
      } else if (mode === 'signup') {
        await signUp(email, password, name);
        setSuccess('Conta criada! Verifique seu email para confirmar o cadastro.');
      } else {
        await resetPassword(email);
        setSuccess('Email enviado! Verifique sua caixa de entrada para redefinir a senha.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.';
      if (message.includes('Invalid login')) setError('Email ou senha incorretos.');
      else if (message.includes('already registered')) setError('Este email já está cadastrado.');
      else if (message.includes('Password should be')) setError('A senha deve ter pelo menos 6 caracteres.');
      else if (message.includes('rate limit')) setError('Muitas tentativas. Aguarde alguns minutos.');
      else setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // redirect happens automatically
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao entrar com Google.';
      setError(message);
      setGoogleLoading(false);
    }
  }

  const titles: Record<Mode, string> = {
    login: 'Entrar no CodLearn',
    signup: 'Criar sua conta',
    forgot: 'Recuperar senha',
  };

  const subtitles: Record<Mode, string> = {
    login: 'Acesse seu progresso de qualquer dispositivo',
    signup: 'Salve seu progresso e acesse de qualquer lugar',
    forgot: 'Enviaremos um link para redefinir sua senha',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/10 to-blue-500/5 border-b border-border">
            {mode === 'forgot' && (
              <button
                onClick={() => switchMode('login')}
                className="absolute top-4 left-4 p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-lg">🎓</span>
              </div>
              <h2 className="text-xl font-bold">{titles[mode]}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{subtitles[mode]}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Google button — only on login/signup */}
            {mode !== 'forgot' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-muted/30 border border-border rounded-xl text-sm font-medium hover:bg-muted/60 hover:border-border/80 transition-all disabled:opacity-60"
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continuar com Google
                </button>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex-1 h-px bg-border" />
                  ou continue com email
                  <div className="flex-1 h-px bg-border" />
                </div>
              </>
            )}

            {/* Name field — signup only */}
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Seu nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como quer ser chamado?"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password — not shown on forgot */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Senha</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-primary hover:underline"
                    >
                      Esqueci minha senha
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Mínimo 6 caracteres' : '••••••••'}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400">
                ✓ {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar link de recuperação'}
            </button>

            {mode !== 'forgot' && (
              <div className="text-center text-sm text-muted-foreground">
                {mode === 'login' ? (
                  <>
                    Não tem conta?{' '}
                    <button type="button" onClick={() => switchMode('signup')} className="text-primary hover:underline font-medium">
                      Cadastre-se grátis
                    </button>
                  </>
                ) : (
                  <>
                    Já tem conta?{' '}
                    <button type="button" onClick={() => switchMode('login')} className="text-primary hover:underline font-medium">
                      Entrar
                    </button>
                  </>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
