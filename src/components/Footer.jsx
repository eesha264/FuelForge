import { Link } from 'react-router-dom'
import { Dumbbell, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-primary-50/40 border-t border-primary-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl flex items-center justify-center shadow-md shadow-primary-200/50">
                                <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-extrabold"><span className="text-dark-800">Fuel</span><span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Forge</span></span>
                        </Link>
                        <p className="text-dark-500 text-sm leading-relaxed mb-6">Premium fitness products to fuel your performance. From protein powders to yoga mats — everything for your goals.</p>
                        <div className="flex gap-2.5">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 bg-white border border-dark-100 hover:bg-primary-50 hover:border-primary-200 rounded-xl flex items-center justify-center text-dark-400 hover:text-primary-600 transition-all shadow-sm"><Icon className="w-4 h-4" /></a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-dark-800 uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[{ label: 'Home', to: '/' }, { label: 'All Products', to: '/products' }, { label: 'My Cart', to: '/cart' }, { label: 'My Orders', to: '/orders' }].map((link) => (
                                <li key={link.to}><Link to={link.to} className="text-dark-500 hover:text-primary-600 text-sm transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-dark-800 uppercase tracking-wider mb-4">Categories</h4>
                        <ul className="space-y-2.5">
                            {['Protein & Supplements', 'Yoga & Flexibility', 'Gym Equipment', 'Accessories', 'Apparel'].map((cat) => (
                                <li key={cat}><Link to={`/products?category=${encodeURIComponent(cat)}`} className="text-dark-500 hover:text-primary-600 text-sm transition-colors">{cat}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-dark-800 uppercase tracking-wider mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-dark-500"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary-400" />123 Fitness Ave, Health City, HC 10001</li>
                            <li className="flex items-center gap-3 text-sm text-dark-500"><Phone className="w-4 h-4 shrink-0 text-primary-400" />+1 (555) 123-4567</li>
                            <li className="flex items-center gap-3 text-sm text-dark-500"><Mail className="w-4 h-4 shrink-0 text-primary-400" />support@fuelforge.com</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-primary-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-dark-400 text-xs">© {new Date().getFullYear()} FuelForge. All rights reserved.</p>
                    <div className="flex gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((t) => (
                            <a key={t} href="#" className="text-dark-400 hover:text-primary-500 text-xs transition-colors">{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
