'use client';

import { branding } from '@/config';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const c = branding.colors;

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                sessionStorage.setItem('justLoggedIn', 'true');
                router.push('/');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid password');
                setIsLoading(false);
            }
        } catch {
            setError('Unable to connect. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-sm space-y-6">
                {/* Logo + Title */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center">
                        <Image
                            src="/download.png"
                            alt={branding.logoAlt}
                            width={245}
                            height={206}
                            style={{ width: '110px', height: 'auto' }}
                            priority
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: c.primaryDark }}>
                            Finance<span style={{ color: c.primary }}>360</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{branding.tagline}</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 text-center mb-5">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                style={{ '--tw-ring-color': c.primary } as React.CSSProperties}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5">
                                <p className="text-red-600 text-xs">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: c.primary }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.primaryAlt)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-xs">{branding.subtitle}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center space-y-1">
                    <p className="text-gray-400 text-xs">
                        Designed &amp; Built by {branding.designedBy} for {branding.companyName}
                    </p>
                    <p className="text-gray-400 text-xs">
                        &copy; {new Date().getFullYear()} {branding.copyrightHolder}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
