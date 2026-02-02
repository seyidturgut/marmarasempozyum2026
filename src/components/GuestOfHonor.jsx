import React from 'react';
import { motion } from 'framer-motion';

const GuestOfHonor = () => {
    return (
        <section id="onur-konugu" className="guest-section section-py overflow-hidden">
            <div className="container">
                <div className="guest-layout">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="guest-text-content"
                    >
                        <div className="guest-badge">
                            ONUR KONUĞU
                            <div className="guest-badge-line"></div>
                        </div>

                        <h2 className="guest-name">Prof. Dr. Levent Kurnaz</h2>
                        <h3 className="guest-role">İklim Bilimci</h3>

                        <div className="guest-bio-long">
                            <p>
                                Prof. Dr. Levent Kurnaz, İstanbul'da doğdu. Boğaziçi Üniversitesi'nden 1988'de elektrik/elektronik mühendisi olarak mezun oldu. Aynı üniversiteden 1990'da elektrik/elektronik ve fizik alanında yüksek lisans derecesi aldı. 1994'te ABD'de Pittsburgh Üniversitesi'nde fizik doktorasını tamamladı.
                            </p>
                            <p>
                                1995-1997 yılları arasında Tulane Üniversitesi Kimya Bölümü'nde doktora sonrası araştırmalar yaptı. 1997'den beri Boğaziçi Üniversitesi, Fen-Edebiyat Fakültesi, Fizik Bölümü'nde öğretim üyesidir. Prof. Dr. Kurnaz, aynı zamanda üniversitenin İklim Değişikliği ve Politikaları Uygulama ve Araştırma Merkezi müdürüdür.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="guest-image-wrapper"
                    >
                        <div className="guest-image-frame">
                            <img src="/panelist/profdrlevent-e1769500618560.webp" alt="Prof. Dr. Levent Kurnaz" className="guest-image" />
                            <div className="guest-image-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GuestOfHonor;
