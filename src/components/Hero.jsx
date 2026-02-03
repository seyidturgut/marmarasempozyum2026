import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassLogo from './GlassLogo';
import { Calendar } from 'lucide-react';

const LiquidLoader = ({ fill = "var(--secondary)", delay = 0 }) => {
    return (
        <div className="liquid-container" style={{ overflow: 'hidden' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="liquid-svg">
                <defs>
                    <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--secondary)" />
                        <stop offset="100%" stopColor="var(--primary-light)" />
                    </linearGradient>
                    <mask id="waveMask">
                        <motion.path
                            d="M 0 70 Q 12.5 65 25 70 T 50 70 T 75 70 T 100 70 T 125 70 T 150 70 T 175 70 T 200 70 V 100 H 0 Z"
                            animate={{ x: [-100, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            fill="white"
                        />
                        <motion.path
                            d="M 0 75 Q 12.5 70 25 75 T 50 75 T 75 75 T 100 75 T 125 75 T 150 75 T 175 75 T 200 75 V 100 H 0 Z"
                            animate={{ x: [0, -100] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            fill="white"
                            opacity="0.5"
                        />
                    </mask>
                </defs>
                <rect width="100" height="100" fill="url(#liquidGrad)" mask="url(#waveMask)" />
            </svg>
        </div>
    );
};

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [logoSize, setLogoSize] = useState(window.innerWidth < 768 ? 180 : 240);
    const videos = [
        "https://projetest.trtek.tr/wp-content/uploads//21758-321309738-1.mp4",
        "/video2.mp4"
    ];

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    useEffect(() => {
        const handleResize = () => {
            setLogoSize(window.innerWidth < 768 ? 180 : 240);
        };
        window.addEventListener('resize', handleResize);

        const eventDate = new Date('April 21, 2026 10:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section className="hero">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="hero-video-wrapper"
                    style={{ position: 'absolute', inset: 0, zIndex: -2 }}
                >
                    <video
                        key={videos[currentVideoIndex]}
                        autoPlay
                        muted
                        onEnded={handleVideoEnd}
                        playsInline
                        className="hero-video"
                    >
                        <source src={videos[currentVideoIndex]} type="video/mp4" />
                    </video>
                </motion.div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                        className="hero-logo-outer"
                    >
                        <GlassLogo size={logoSize} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="badge badge-sm"
                        style={{ marginTop: '-1rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Calendar size={14} strokeWidth={2.5} />
                        21-22 Nisan 2026 • Kocaeli
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="h1-compact"
                    >
                        Marmara'nın Yarını İçin,<br />Suyu Koru!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="p-compact"
                    >
                        Sürdürülebilir bir gelecek için bilim, teknoloji ve toplum buluşuyor.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="hero-actions hero-actions-compact"
                    >
                        <a href="#kayit" className="btn btn-primary btn-sm">Hemen Kayıt Olun</a>
                        <a href="#hakkimizda" className="btn btn-outline btn-sm">Detaylı Bilgi</a>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="countdown-frame-compact"
                >
                    <h3 className="countdown-title">Marmara Sürdürülebilir Çevre Sempozyumuna</h3>
                    <div className="countdown-grid-compact">
                        <div className="countdown-item-compact">
                            <LiquidLoader />
                            <span className="count-val-compact">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="count-label-compact">GÜN</span>
                        </div>
                        <div className="countdown-item-compact">
                            <LiquidLoader delay={0.2} />
                            <span className="count-val-compact">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="count-label-compact">SAAT</span>
                        </div>
                        <div className="countdown-item-compact">
                            <LiquidLoader delay={0.4} />
                            <span className="count-val-compact">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="count-label-compact">DAKİKA</span>
                        </div>
                        <div className="countdown-item-compact">
                            <LiquidLoader delay={0.6} />
                            <span className="count-val-compact">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="count-label-compact">SANİYE</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Hero;
