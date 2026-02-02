import React from 'react';
import { motion } from 'framer-motion';

const stakeholders = [
    { name: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı', logo: '/paydaslar/cevrelogo.webp' },
    { name: 'Kocaeli Büyükşehir Belediyesi', logo: '/paydaslar/kbblogodikey.webp' },
    { name: 'Kocaeli Üniversitesi', logo: '/paydaslar/koulogo.webp' },
    { name: 'MARKA', logo: '/paydaslar/markalogoNew.webp' },
    { name: 'Sakarya Büyükşehir Belediyesi', logo: '/paydaslar/sakaryaBB-1-1.webp' },
    { name: 'YÖK', logo: '/paydaslar/yoklogo.webp' }
];

// Triple for infinite loop to ensure no gaps on any screen size
const tripleStakeholders = [...stakeholders, ...stakeholders, ...stakeholders];

const Stakeholders = () => {
    const itemWidth = 180; // Match CSS stakeholder-logo-box width
    const gap = 80;        // Match CSS slider-track gap
    const totalMove = (itemWidth + gap) * stakeholders.length;

    return (
        <section className="stakeholders-section">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="stakeholders-title">Sempozyum <span className="text-secondary">Paydaşlar</span></h2>
                </div>
            </div>

            <div className="slider-container">
                <motion.div
                    className="slider-track"
                    animate={{
                        x: [0, -totalMove]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {tripleStakeholders.map((item, idx) => (
                        <div key={idx} className="stakeholder-logo-box">
                            <img
                                src={item.logo}
                                alt={item.name}
                                title={item.name}
                                className="stakeholder-logo"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks for fade effect */}
                <div className="slider-mask mask-left"></div>
                <div className="slider-mask mask-right"></div>
            </div>
        </section>
    );
};

export default Stakeholders;
