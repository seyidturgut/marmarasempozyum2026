import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

const liveEventsData = [
    {
        title: "Su Yönetiminde Yeni Teknolojiler",
        speakers: ["Prof. Dr. Emrah Doğan", "Doç. Dr. Rıfat Kurban", "Prof. Dr. Mahmut Fırat"],
        time: "02-02 00:00 – 01:00",
        location: "Kocaeli Kongre Merkezi",
        status: "started",
        image: "/events/su-teknolojileri.jpg"
    },
    {
        title: "Tarımda Etkin Su Yönetimi",
        speakers: ["Prof. Dr. Vahit Kirişçi", "Doç. Dr. Gökşen Çapar"],
        time: "02-02 00:00 – 01:00",
        location: "Salon A",
        status: "started",
        image: "/events/tarim-su.png"
    },
    {
        title: "Sürdürülebilir Su Kaynakları",
        speakers: ["Prof. Dr. Ahmet Mete Saatçi", "Prof. Dr. İzzet Öztürk"],
        time: "02-02 01:00 – 02:00",
        location: "Salon B",
        status: "started",
        image: "/events/surdurulebilir-su.png"
    },
    {
        title: "İklim Değişikliği ve Su",
        speakers: ["Prof. Dr. Levent Kurnaz", "Prof. Dr. Mikdat Kadıoğlu"],
        time: "02-02 02:00 – 03:00",
        location: "Salon C",
        status: "started",
        image: "/events/iklim-su.png"
    },
    {
        title: "Deniz Ekosistemlerinin Korunması",
        speakers: ["Prof. Dr. Bayram Öztürk", "Dr. Ayşe Özdemir"],
        time: "02-02 03:00 – 04:00",
        location: "Salon F",
        status: "started",
        image: "/events/deniz-ekosistemi.png"
    },
    {
        title: "Akıllı Şehirlerde Su Döngüsü",
        speakers: ["Prof. Dr. Can Ayas", "Dr. Mehmet Kaya"],
        time: "02-02 03:30 – 04:30",
        location: "Teknoloji Merkezi",
        status: "started",
        image: "/events/akilli-sehir.png"
    },
    {
        title: "Endüstriyel Atıksu Arıtımı",
        speakers: ["Doç. Dr. Selin Erten", "Dr. Engin Can"],
        time: "02-02 04:00 – 05:00",
        location: "Salon G",
        status: "started",
        image: "/events/endustriyel.png"
    },
    {
        title: "Marmara Denizi ve Kirlilik Kontrolü",
        speakers: ["Prof. Dr. İzzet Öztürk", "Dr. Pelin Su"],
        time: "02-02 04:30 – 05:30",
        location: "Ana Konferans Salonu",
        status: "started",
        image: "/events/marmara-denizi.png"
    },
    {
        title: "Atık Su Geri Kazanımı",
        speakers: ["Doç. Dr. Mehmet İnce", "Dr. Ayşe Yılmaz"],
        time: "02-02 05:00 – 06:00",
        location: "Salon D",
        status: "soon",
        image: "/events/atik-su.png"
    },
    {
        title: "Yenilenebilir Enerji",
        speakers: ["Prof. Dr. Ali Vural", "Dr. Canan Dağdeviren"],
        time: "02-02 06:00 – 07:00",
        location: "Salon E",
        status: "soon",
        image: "/events/yenilenebilir-enerji.png"
    },
    {
        title: "Hidrojen Enerjisi Geleceği",
        speakers: ["Dr. Murat Čelik", "Prof. Dr. Fatma Gül"],
        time: "02-02 07:00 – 08:00",
        location: "Enerji Laboratuvarı",
        status: "soon",
        image: "/events/su-teknolojileri.jpg"
    },
    {
        title: "Sıfır Atık Politikaları",
        speakers: ["Dr. Esra Bilgiç", "Doç. Dr. Taner Koç"],
        time: "02-02 08:00 – 09:00",
        location: "Belediye Meclis Salonu",
        status: "soon",
        image: "/events/iklim-su.png"
    },
    {
        title: "Biyoçeşitlilik ve Su",
        speakers: ["Prof. Dr. Selçuk Can", "Dr. Nilgün Er"],
        time: "02-02 09:00 – 10:00",
        location: "Salon H",
        status: "soon",
        image: "/events/surdurulebilir-su.png"
    },
    {
        title: "Döngüsel Ekonomi Paneli",
        speakers: ["Dr. Arda Türkmen", "Selin Bakar"],
        time: "02-02 10:00 – 11:30",
        location: "Marmara Salonu",
        status: "soon",
        image: "/events/tarim-su.png"
    },
    {
        title: "Geleceğin Su Teknolojileri",
        speakers: ["Prof. Dr. Hakan Alp", "Dr. Yasemin Nur"],
        time: "02-02 11:30 – 12:30",
        location: "Ar-Ge Merkezi",
        status: "soon",
        image: "/events/marmara-denizi.png"
    },
    {
        title: "Toplumda Su Bilinci",
        speakers: ["Dr. Umut Aras", "Seda Güven"],
        time: "02-02 12:30 – 13:30",
        location: "Konferans Salonu B",
        status: "soon",
        image: "/events/akilli-sehir.png"
    }
];

const LiveEvents = () => {
    const scrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState('started');
    const [isPaused, setIsPaused] = useState(false);

    const filteredEvents = liveEventsData.filter(event => event.status === activeTab);

    // Auto-slide logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

                if (isAtEnd) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollTo({ left: scrollLeft + 400, behavior: 'smooth' });
                }
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [isPaused, activeTab]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            const scrollTo = direction === 'left'
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 5000); // Resume auto-slide after 5s
        }
    };

    return (
        <section className="live-events-section section-py overflow-hidden" style={{ background: '#f8fafc' }}>
            <div className="container">
                <div className="section-header text-center mb-4">
                    <h2 className="live-title">
                        Canlı <span className="text-secondary">Etkinlikler</span>
                        <svg className="title-underline" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 8C80 2 220 2 295 8" stroke="var(--secondary)" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                    </h2>

                    {/* Filter Tabs */}
                    <div className="filter-tabs mt-4">
                        <button
                            className={`filter-tab ${activeTab === 'started' ? 'active' : ''}`}
                            onClick={() => setActiveTab('started')}
                        >
                            Devam Edenler
                        </button>
                        <button
                            className={`filter-tab ${activeTab === 'soon' ? 'active' : ''}`}
                            onClick={() => setActiveTab('soon')}
                        >
                            Yakında Başlayacaklar
                        </button>
                    </div>
                </div>
            </div>

            <div className="carousel-outer-wrapper px-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className="carousel-inner-container">
                    <button className="carousel-nav-btn prev" onClick={() => scroll('left')}>
                        <ChevronLeft size={28} />
                    </button>

                    <div className="live-carousel-container" ref={scrollRef}>
                        <AnimatePresence mode='wait'>
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={`${activeTab}-${index}`}
                                    className={`live-event-card ${event.status === 'soon' ? 'card-soon' : ''}`}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="card-image-wrapper">
                                        <img src={event.image} alt={event.title} className="card-bg-image" />
                                        <div className="card-overlay"></div>
                                        <div className={`live-badge ${event.status === 'soon' ? 'badge-soon' : ''}`}>
                                            {event.status === 'soon' ? 'BİRAZDAN' : 'BAŞLADI'}
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">{event.title}</h3>
                                        <ul className="speaker-list">
                                            {event.speakers.map((speaker, sIndex) => (
                                                <li key={sIndex}>{speaker}</li>
                                            ))}
                                        </ul>
                                        <div className="event-details">
                                            <div className="detail-item">
                                                <Clock size={14} />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="detail-item">
                                                <MapPin size={14} />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button className="carousel-nav-btn next" onClick={() => scroll('right')}>
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LiveEvents;
