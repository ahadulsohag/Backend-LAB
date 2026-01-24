import { useState } from 'react';
import { authAPI } from '../services/api';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = isLogin
                ? await authAPI.login({ email: formData.email, password: formData.password })
                : await authAPI.register(formData);

            localStorage.setItem('user', JSON.stringify(data));
            onAuthSuccess(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="auth-card glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Enter your credentials to manage your farm' : 'Join our premium sustainable animal haven'}</p>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fff5f5', color: '#e53e3e', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #fed7d7' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
                            <input
                                type="text"
                                style={{ width: '100%' }}
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            style={{ width: '100%' }}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            style={{ width: '100%' }}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Account Type</label>
                            <select
                                style={{ width: '100%' }}
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="user">Animal Lover (User)</option>
                                <option value="admin">Farm Manager (Admin)</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--primary)',
                            color: 'white',
                            marginTop: '1rem',
                            fontSize: '1rem'
                        }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Now')}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account?" : "Already member of the farm?"}{' '}
                        <span
                            style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Create one for free' : 'Sign in here'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
