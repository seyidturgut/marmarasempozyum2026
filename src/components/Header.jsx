import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Hakkımızda', href: '#hakkimizda' },
        { name: 'Etkinlikler', href: '#etkinlikler' },
        { name: 'Konuşmacılar', href: '#konusmacilar' },
        { name: 'SSS', href: '#sss' },
        { name: 'İletişim', href: '#iletisim' }
    ];

    return (
        <header className={isScrolled ? 'header-scrolled' : ''} style={{
            background: isScrolled ? '' : 'rgba(255,255,255,0.02)',
            backdropFilter: isScrolled ? '' : 'blur(4px)',
            zIndex: 9999
        }}>
            <div className="container header-inner">
                <motion.a
                    href="#"
                    className="logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src="/cropped-marmaralogo.png" alt="Marmara Çevre" style={{ height: '40px' }} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        lineHeight: '1.1',
                        color: (isScrolled && !isMenuOpen) ? 'var(--primary)' : (isMenuOpen ? 'var(--primary)' : 'white'),
                        transition: 'color 0.3s'
                    }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>Marmara Sürdürülebilir</span>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', opacity: 0.9 }}>Çevre Sempozyumu</span>
                    </div>
                </motion.a>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul>
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <motion.a
                                    href={link.href}
                                    style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    {link.name}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <div className="hamburger-box">
                        <motion.span
                            initial={false}
                            animate={{
                                rotate: isMenuOpen ? 45 : 0,
                                y: isMenuOpen ? 8 : 0,
                                backgroundColor: isMenuOpen ? '#ffffff' : (isScrolled ? '#0f5156' : '#ffffff')
                            }}
                            className="hamburger-line"
                        />
                        <motion.span
                            initial={false}
                            animate={{
                                opacity: isMenuOpen ? 0 : 1,
                                backgroundColor: isScrolled ? '#0f5156' : '#ffffff'
                            }}
                            className="hamburger-line"
                        />
                        <motion.span
                            initial={false}
                            animate={{
                                rotate: isMenuOpen ? -45 : 0,
                                y: isMenuOpen ? -8 : 0,
                                backgroundColor: isMenuOpen ? '#ffffff' : (isScrolled ? '#0f5156' : '#ffffff')
                            }}
                            className="hamburger-line"
                        />
                    </div>
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="mobile-nav-overlay"
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="mobile-menu-header" style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
                                <div className="logo">
                                    <img src="/cropped-marmaralogo.png" alt="Marmara Çevre" style={{ height: '40px' }} />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        lineHeight: '1.1',
                                        color: 'white'
                                    }}>
                                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>Marmara Sürdürülebilir</span>
                                        <span style={{ fontWeight: 600, fontSize: '0.85rem', opacity: 0.9 }}>Çevre Sempozyumu</span>
                                    </div>
                                </div>
                            </div>
                            <nav className="mobile-nav">
                                <ul>
                                    {navLinks.map((link, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                        >
                                            <a
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="mobile-nav-footer">
                                    <a href="#kayit" className="btn btn-primary" onClick={() => setIsMenuOpen(false)} style={{ background: 'white', color: 'var(--primary)' }}>Kayıt Ol</a>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;

