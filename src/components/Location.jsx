import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bus, Train, Info } from 'lucide-react';

const Location = () => {
    const transportLines = [
        { id: 'PS-K2', type: 'bus' },
        { id: 'PS-K3', type: 'bus' },
        { id: 'KM67', type: 'bus' },
        { id: '710S', type: 'bus' },
        { id: '806', type: 'bus' },
        { id: '740', type: 'bus' },
        { id: '710', type: 'bus' },
        { id: '680', type: 'bus' }
    ];

    const railSystems = [
        "T1 – Otogar",
        "T1 – Şehir Hastanesi"
    ];

    const regionalLines = [
        "Karamürsel – Gölcük – İzmit",
        "Değirmendere – Gölcük – Tütünçiftlik – Derince – İzmit"
    ];

    return (
        <section id="ulasim" className="location-section section-py">
            <div className="container">
                <div className="location-layout">
                    {/* Left: Map with Custom Frame */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="map-container"
                    >
                        <div className="map-premium-frame">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.213233649525!2d29.8937963!3d40.761207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f59e666a3d7%3A0xd795ceae47c87028!2sKocaeli%20Kongre%20Merkezi!5e0!3m2!1str!2str!4v1706898450123!5m2!1str!2str"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Kocaeli Kongre Merkezi"
                                className="styled-map"
                            ></iframe>
                            <div className="map-overlay-edge"></div>
                            <div className="map-location-tag">
                                <MapPin size={16} />
                                <span>Kocaeli Kongre Merkezi</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Transportation Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="transport-content"
                    >
                        <div className="transport-header">
                            <div className="transport-icon-circle">
                                <Bus size={24} />
                            </div>
                            <h2 className="transport-title">Ulaşım Hatları</h2>
                        </div>

                        <div className="transport-groups">
                            {/* Bus Lines Grid */}
                            <div className="transport-group">
                                <h4 className="group-label">Otobüs Hatları</h4>
                                <div className="bus-grid">
                                    {transportLines.map((line) => (
                                        <div key={line.id} className="bus-badge">
                                            {line.id}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rail Systems */}
                            <div className="transport-group">
                                <h4 className="group-label">Tramvay (Akçaray)</h4>
                                <div className="list-items">
                                    {railSystems.map((item, idx) => (
                                        <div key={idx} className="transport-list-item">
                                            <div className="item-dot"></div>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Regional */}
                            <div className="transport-group">
                                <h4 className="group-label">Bölgesel Hatlar</h4>
                                <div className="list-items">
                                    {regionalLines.map((item, idx) => (
                                        <div key={idx} className="transport-list-item">
                                            <div className="item-dot primary"></div>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="location-info-footer">
                            <Info size={16} />
                            <p>Kocaeli Kongre Merkezi, Kocaeli'nin merkezinde yer almakta olup tüm ulaşım kanallarına erişim kolaylığı sağlamaktadır.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Location;
