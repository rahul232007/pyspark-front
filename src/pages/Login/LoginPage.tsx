import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, LogIn, Sparkles, CheckSquare, Square } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/common/Button/Button';
import { Modal } from '../../components/common/Modal/Modal';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'spark.coder@pyspark.game',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch {
      // Error handled in store
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setValue('email', 'spark.coder@pyspark.game');
    setValue('password', 'password123');
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-100">Welcome Back, Coder!</h2>
        <p className="text-xs text-slate-400 mt-1">Sign in to resume your Python quest & daily streak.</p>
      </div>

      {/* Demo Credentials Quick Button */}
      <div className="mb-6 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
        <div className="text-xs">
          <span className="font-bold text-cyan-300 block">Quick Demo Mode</span>
          <span className="text-slate-400">One-click auto-fill credentials</span>
        </div>
        <button
          type="button"
          onClick={handleDemoFill}
          className="px-3 py-1 text-xs font-black rounded-lg bg-cyan-400 text-slate-950 hover:brightness-110"
        >
          Fill Demo
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register('email')}
              type="email"
              placeholder="python.hero@domain.com"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full py-3"
          isLoading={isLoading}
          leftIcon={<LogIn className="w-4 h-4" />}
        >
          Enter Realm
        </Button>
      </form>

      {/* Google Auth Button */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => {
            login('google.user@gmail.com');
            navigate('/dashboard');
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-slate-400">
          Don't have a hero account yet?{' '}
          <Link to="/register" className="text-cyan-400 font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => {
          setShowForgotModal(false);
          setResetEmailSent(false);
        }}
        title="Reset Password"
        maxWidth="sm"
      >
        {!resetEmailSent ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your account email address and we'll send you a password reset magic link.
            </p>
            <input
              type="email"
              placeholder="your.email@pyspark.game"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setResetEmailSent(true)}
            >
              Send Reset Link
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-100">Reset Email Dispatched!</h4>
            <p className="text-xs text-slate-400">
              Check your inbox for password recovery instructions.
            </p>
            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setShowForgotModal(false)}
            >
              Back to Login
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
