import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const eventsData = [
    // 21 Nisan - 10 Items
    { day: '21 Nisan', fullDate: '21/04/2026', time: '10:00', title: 'Açılış Konuşmaları', image: '/events/su-teknolojileri.jpg', speakers: ['Protokol Üyeleri'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '11:30', title: 'Marmara\'da Sürdürülebilir Su Yönetimi', image: '/events/surdurulebilir-su.png', speakers: ['Prof. Dr. Veysel Eroğlu', 'Prof. Dr. Cumali Kınacı'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '13:30', title: 'Marmara Denizi\'nin Geleceği', image: '/events/marmara-denizi.png', speakers: ['Prof. Dr. Bayram Öztürk', 'Kemal Pınarbaşı'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '15:30', title: 'İzmit Körfezi: Hedef Sağlıklı Ekosistem', image: '/events/deniz-ekosistemi.png', speakers: ['Prof. Dr. Mustafa Sarı', 'Mesut Önem'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '16:30', title: 'İklim Değişikliği ve Kıyı Yönetimi', image: '/events/iklim-su.png', speakers: ['Prof. Dr. Mikdat Kadıoğlu'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '17:30', title: 'Su Okuryazarlığı ve Gelecek', image: '/events/akilli-sehir.png', speakers: ['Dr. Ayşe Özdemir'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '18:30', title: 'Deniz Salyası ve Marmara', image: '/events/marmara-denizi.png', speakers: ['Prof. Dr. Melek İşinibilir'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '19:30', title: 'Kirlilik ve Gözetim Sistemleri', image: '/events/endustriyel.png', speakers: ['Dr. Can Kaya'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '20:30', title: 'Su Kaynaklarında Ar-Ge', image: '/events/su-teknolojileri.jpg', speakers: ['TÜBİTAK Temsilcileri'] },
    { day: '21 Nisan', fullDate: '21/04/2026', time: '21:30', title: '21 Nisan Kapanış Değerlendirmesi', image: '/events/tarim-su.png', speakers: ['Düzenleme Kurulu'] },

    // 22 Nisan - 10 Items
    { day: '22 Nisan', fullDate: '22/04/2026', time: '09:30', title: 'Havzada Entegre Su Yönetimi', image: '/events/tarim-su.png', speakers: ['Prof. Dr. Bilgehan Nas', 'Prof. Dr. Ali Ertürk'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '11:00', title: 'Alternatif Su Kaynakları', image: '/events/atik-su.png', speakers: ['Prof. Dr. Bülent Keskinkılıç', 'Prof. Dr. Mehmet Kitiş'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '13:30', title: 'Su Yönetiminde Yeni Teknolojiler', image: '/events/akilli-sehir.png', speakers: ['Prof. Dr. Emrah Doğan', 'Doç. Dr. Rıfat Kurban'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '15:00', title: 'Tarımda Etkin Su Yönetimi', image: '/events/tarim-su.png', speakers: ['Prof. Dr. Vahit Kirişçi', 'Doç. Dr. Gökşen Çapar'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '16:00', title: 'Sıfır Atık ve Atıksu Geri Kazanımı', image: '/events/atik-su.png', speakers: ['Dr. Taner Koç'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '17:00', title: 'Akıllı Tarım ve Sulama', image: '/events/tarim-su.png', speakers: ['Dr. Engin Can'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '18:00', title: 'Geleceğin Su Teknolojileri', image: '/events/su-teknolojileri.jpg', speakers: ['Hakan Alp'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '19:00', title: 'Sektörel Su Ayak İzi', image: '/events/surdurulebilir-su.png', speakers: ['Dr. Selin Erten'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '20:00', title: 'Biyoçeşitlilik ve Su', image: '/events/deniz-ekosistemi.png', speakers: ['Dr. Umut Aras'] },
    { day: '22 Nisan', fullDate: '22/04/2026', time: '21:00', title: 'Büyük Final ve Ödül Töreni', image: '/events/su-teknolojileri.jpg', speakers: ['Tüm Konuşmacılar'] }
];

const Events = () => {
    const [activeTab, setActiveTab] = useState('21 Nisan');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const filteredEvents = eventsData.filter(event =>
        event.day === activeTab &&
        (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.speakers.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    useEffect(() => {
        if (isPaused || filteredEvents.length <= 3) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
                if (isAtEnd) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollTo({ left: scrollLeft + 340, behavior: 'smooth' });
                }
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused, activeTab, filteredEvents.length]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollAmount = 340;
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 5000);
        }
    };

    return (
        <section id="etkinlikler" className="program-section section-py">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="program-title"
                >
                    Sempozyum <span>Programı</span>
                </motion.h2>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Etkinlikler arama yapabilirsiniz."
                        className="program-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="search-icon-wrapper">
                        <Search size={20} />
                    </div>
                </div>

                <div className="program-tabs">
                    <button className={`program-tab ${activeTab === '21 Nisan' ? 'active' : ''}`} onClick={() => setActiveTab('21 Nisan')}>21 Nisan</button>
                    <button className={`program-tab ${activeTab === '22 Nisan' ? 'active' : ''}`} onClick={() => setActiveTab('22 Nisan')}>22 Nisan</button>
                </div>

                <div className="program-carousel-wrapper" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                    <button className="program-nav-btn prev" onClick={() => scroll('left')}><ChevronLeft size={24} /></button>

                    <div className="program-grid" ref={scrollRef}>
                        {filteredEvents.map((event, index) => (
                            <div key={`${event.day}-${event.time}-${index}`} className="program-card">
                                <img src={event.image} alt={event.title} className="program-card-image" />
                                <div className="program-card-content">
                                    <div className="program-card-meta">
                                        <span><Calendar size={14} /> {event.fullDate}</span>
                                        <span><Clock size={14} /> {event.time}</span>
                                    </div>
                                    <h3 className="program-card-title">{event.title}</h3>
                                    <div className="program-card-speakers">
                                        <ul className="speaker-list" style={{ margin: 0 }}>
                                            {event.speakers.map((speaker, sIndex) => (
                                                <li key={sIndex} style={{ fontSize: '0.85rem' }}>{speaker}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="program-card-footer">
                                        <button className="examine-btn">İNCELE</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="program-nav-btn next" onClick={() => scroll('right')}><ChevronRight size={24} /></button>
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-5 text-muted">Aradığınız kriterlere uygun etkinlik bulunamadı.</div>
                )}
            </div>
        </section>
    );
};

export default Events;
