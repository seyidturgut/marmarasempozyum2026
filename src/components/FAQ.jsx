import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
    { q: 'Marmara Sürdürülebilir Çevre Sempozyumu nedir?', a: 'Sempozyum; çevresel sürdürülebilirlik ve iklim dayanıklılığı odağında bilimsel bildiriler, paneller, Ar-Ge proje çağrıları ve bir çevre fuarını bir araya getiren ulusal ölçekte bütüncül bir etkinliktir.' },
    { q: '2026 yılı sempozyumunun ana teması nedir?', a: 'Sempozyumun 2026 yılı için belirlenen ana teması “Su Kıtlığı ve Sürdürülebilir Su Kaynakları Yönetimi”dir.' },
    { q: 'Sempozyum ne zaman ve nerede gerçekleştirilecektir?', a: 'Etkinlik, 21-22 Nisan 2026 tarihlerinde Kocaeli Kongre Merkezi’nde düzenlenecektir.' },
    { q: 'Bildiri özeti gönderimi için son tarih nedir?', a: 'Bildiri özetlerinin en geç 15 Mart 2026 tarihine kadar gönderilmesi gerekmektedir (Ertelenmesi durumunda son tarih 30 Mart 2026’dır).' },
    { q: 'Sempozyum kapsamında düzenlenen Ar-Ge Proje Çağrısı’nın amacı nedir?', a: 'Kocaeli Büyükşehir Belediyesi ve Kocaeli Üniversitesi iş birliğiyle ilan edilen bu çağrı; kentin çevresel sürdürülebilirliği, su ve atık yönetimi gibi alanlarda yenilikçi, uygulamaya dönük ve yüksek teknolojik hazırlık seviyesine sahip çözümler geliştirmeyi amaçlamaktadır.' },
    { q: 'Ar-Ge Proje Çağrısı için başvurular ne zaman başlıyor?', a: 'Proje başvuruları 10 Aralık 2025 tarihinde Kocaeli Üniversitesi BAP Birimi sistemi üzerinden çevrimiçi olarak alınmaya başlanacaktır.' },
    { q: 'Bildiriler hangi mecralarda yayınlanacaktır?', a: 'Kabul edilen bildiriler Kocaeli Üniversitesi Fen Bilimleri Enstitüsü Dergisi ve Şura Dergisi’nde yayınlanacaktır. Ayrıca kongre sonunda ISBN’li bir “Kongre Özet Kitabı” e-kitap olarak basılacaktır.' },
    { q: 'Sürdürülebilir Çevre Fuarı’nda neler sergilenecektir?', a: 'Fuar kapsamında çevre dostu teknolojiler, iklim dayanıklılığı çözümleri, su ve atık yönetimi alanındaki yeni ürünler ve iyi uygulama örnekleri tanıtılacaktır.' },
    { q: 'Bildiri özeti yazımında dikkat edilmesi gereken temel kurallar nelerdir?', a: 'Özetler 200-300 kelime arasında olmalı, Times New Roman (12 punto) karakteri kullanılmalı, en az 3 anahtar kelime içermeli ve mutlaka yazarın ORCID numarasını barındırmalıdır.' }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="sss" className="section-py" style={{ background: '#f1f5f9' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Sık Sorulan Sorular</h2>
                </motion.div>

                <div className="faq-list">
                    {faqData.map((f, i) => (
                        <div key={i} className={`faq-item ${activeIndex === i ? 'active' : ''}`}>
                            <button className="faq-question" onClick={() => toggleAccordion(i)}>
                                <span>{f.q}</span>
                                <motion.span
                                    animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                    className="faq-icon"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <ChevronDown size={20} />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="faq-answer" style={{ paddingBottom: '1.25rem', maxHeight: 'none', opacity: 1 }}>
                                            {f.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
