import React from 'react';
import { motion } from 'framer-motion';

const panelistsData = [
    {
        name: 'Prof. Dr. Barış Salihoğlu',
        title: 'Akademisyen',
        description: 'Ekosistem Modellemesi, Fiziksel Oşinografi, Mavi Ekonomi, İklim Değişikliği, Sürdürülebilir Kalkınma',
        image: '/panelist/baris_salihoglu.jpg'
    },
    {
        name: 'Prof. Dr. Mikdat Kadıoğlu',
        title: 'Meteoroloji Mühendisi',
        description: 'Türk meteoroloji ve Afet Yönetimi',
        image: '/panelist/mikdatkadioglu-e1769584027869.webp'
    },
    {
        name: 'Prof. Dr. Levent Kurnaz',
        title: 'İklim Bilimci',
        description: 'İklim Bilimci ve Fizik Profesörü',
        image: '/panelist/profdrlevent-e1769500618560.webp'
    },
    {
        name: 'Prof. Dr. Cumali Kınacı',
        title: 'Yönetim Kurulu Başkanı',
        description: 'Akademi Vakfı Yönetim Kurulu Başkanı',
        image: '/panelist/cumalikinaci.jpg'
    },
    {
        name: 'Afire Sever',
        title: 'Genel Müdür',
        description: 'T.C. Tarım ve Orman Bakanlığı Su Yönetimi Genel Müdürlüğü Genel Müdürü',
        image: '/panelist/afiresever.jpg'
    },
    {
        name: 'Prof. Dr. Veysel Eroğlu',
        title: 'Eski Bakan',
        description: 'Eski Türkiye Cumhuriyeti Orman ve Su İşleri Bakanı',
        image: '/panelist/veyseleroglu.jpg'
    }
];

const Speakers = () => {
    return (
        <section id="konusmacilar" className="section-py" style={{ background: '#f1f5f9' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header text-center mb-5"
                >
                    <h2 className="section-title">Sempozyum <span className="text-secondary">Panelistler</span></h2>
                    <p className="section-subtitle">Alanında uzman akademisyenler ve sektör liderleri.</p>
                </motion.div>

                <div className="speakers-grid">
                    {panelistsData.map((p, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="speaker-card"
                        >
                            <div className="speaker-image-container">
                                <img src={p.image} alt={p.name} className="speaker-image" />
                                <div className="speaker-overlay"></div>
                            </div>
                            <div className="speaker-content text-center">
                                <h3 className="speaker-name">{p.name}</h3>
                                <div className="speaker-title-badge">{p.title}</div>
                                <p className="speaker-bio" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>{p.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;
