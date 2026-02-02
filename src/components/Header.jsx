import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        color: isScrolled ? 'var(--primary)' : 'white',
                        transition: 'color 0.3s'
                    }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>Marmara Sürdürülebilir</span>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', opacity: 0.9 }}>Çevre Sempozyumu</span>
                    </div>
                </motion.a>
                <nav>
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
            </div>
        </header>
    );
};

export default Header;
