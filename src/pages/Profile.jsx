import { useState } from 'react'
import { User, MapPin, Lock, Save } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService'
import toast from 'react-hot-toast'

export default function Profile() {
    const { user, updateUser } = useAuth()
    const [saving, setSaving] = useState(false)
    const [tab, setTab] = useState('profile')

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
    })

    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const data = await authService.updateProfile(profile)
            updateUser(data.user || { ...user, ...profile })
            toast.success('Profile updated!')
        } catch { toast.error('Failed to update profile') }
        finally { setSaving(false) }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (passwords.newPass.length < 6) { toast.error('Min 6 characters'); return }
        if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return }
        setSaving(true)
        try {
            await authService.changePassword({ currentPassword: passwords.current, newPassword: passwords.newPass })
            toast.success('Password changed!')
            setPasswords({ current: '', newPass: '', confirm: '' })
        } catch { toast.error('Failed to change password') }
        finally { setSaving(false) }
    }

    const inputCls = "w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"

    return (
        <div className="min-h-screen bg-dark-50">
            <div className="bg-dark-900 py-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
                        <p className="text-dark-400 text-sm">{user?.email}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex gap-1 bg-dark-100 rounded-xl p-1 mb-8">
                    {[{ id: 'profile', icon: User, label: 'Profile' }, { id: 'address', icon: MapPin, label: 'Address' }, { id: 'password', icon: Lock, label: 'Password' }].map((t) => (
                        <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === t.id ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-500 hover:text-dark-700'}`}>
                            <t.icon className="w-4 h-4" />{t.label}
                        </button>
                    ))}
                </div>

                {tab === 'profile' && (
                    <form onSubmit={handleProfileSave} className="bg-white border border-dark-100 rounded-2xl p-6 space-y-4">
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name</label><input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputCls} /></div>
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputCls} /></div>
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Phone</label><input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputCls} /></div>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-300 text-white font-semibold rounded-xl transition-colors"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Changes'}</button>
                    </form>
                )}

                {tab === 'address' && (
                    <form onSubmit={handleProfileSave} className="bg-white border border-dark-100 rounded-2xl p-6 space-y-4">
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Address</label><input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className={inputCls} placeholder="123 Main Street" /></div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div><label className="block text-sm font-medium text-dark-700 mb-1.5">City</label><input type="text" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className={inputCls} /></div>
                            <div><label className="block text-sm font-medium text-dark-700 mb-1.5">State</label><input type="text" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} className={inputCls} /></div>
                            <div><label className="block text-sm font-medium text-dark-700 mb-1.5">ZIP Code</label><input type="text" value={profile.zipCode} onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })} className={inputCls} /></div>
                        </div>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-300 text-white font-semibold rounded-xl transition-colors"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Address'}</button>
                    </form>
                )}

                {tab === 'password' && (
                    <form onSubmit={handlePasswordChange} className="bg-white border border-dark-100 rounded-2xl p-6 space-y-4">
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Current Password</label><input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className={inputCls} required /></div>
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">New Password</label><input type="password" value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} className={inputCls} required /></div>
                        <div><label className="block text-sm font-medium text-dark-700 mb-1.5">Confirm New Password</label><input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className={inputCls} required /></div>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-300 text-white font-semibold rounded-xl transition-colors"><Lock className="w-4 h-4" />{saving ? 'Changing...' : 'Change Password'}</button>
                    </form>
                )}
            </div>
        </div>
    )
}
