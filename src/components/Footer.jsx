import { Link } from 'react-router-dom'
import { Dumbbell, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-dark-900 border-t border-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Fuel<span className="text-primary-400">Forge</span>
                            </span>
                        </Link>
                        <p className="text-dark-400 text-sm leading-relaxed mb-6">
                            Premium fitness products to fuel your performance. From protein powders to yoga mats — everything you need to crush your goals.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 bg-dark-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-dark-400 hover:text-white transition-all"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'All Products', to: '/products' },
                                { label: 'My Cart', to: '/cart' },
                                { label: 'My Orders', to: '/orders' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Categories
                        </h4>
                        <ul className="space-y-2.5">
                            {['Protein & Supplements', 'Yoga & Flexibility', 'Gym Equipment', 'Accessories', 'Apparel'].map(
                                (cat) => (
                                    <li key={cat}>
                                        <Link
                                            to={`/products?category=${encodeURIComponent(cat)}`}
                                            className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                                        >
                                            {cat}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-dark-400">
                                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary-500" />
                                <span>123 Fitness Ave, Health City, HC 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-dark-400">
                                <Phone className="w-4 h-4 shrink-0 text-primary-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-dark-400">
                                <Mail className="w-4 h-4 shrink-0 text-primary-500" />
                                <span>support@fuelforge.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-xs">
                        © {new Date().getFullYear()} FuelForge. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-dark-500 hover:text-dark-300 text-xs transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-dark-500 hover:text-dark-300 text-xs transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-dark-500 hover:text-dark-300 text-xs transition-colors">
                            Refund Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
