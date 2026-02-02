import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="hakkimizda" className="section-py overflow-hidden" style={{ background: '#ffffff', position: 'relative' }}>
            <div className="decorative-blob"></div>

            <div className="container">
                <div className="about-layout">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="about-text-content"
                    >
                        <motion.div variants={itemVariants} className="modern-badge">
                            <Sparkles size={14} className="text-secondary" />
                            <span>Sempozyum Hakkında</span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="display-title">
                            Marmara <span className="text-secondary">Sürdürülebilir</span><br />
                            Çevre Sempozyumu
                        </motion.h2>

                        <motion.div variants={itemVariants} className="about-narrative">
                            <p className="lead-text">
                                Çevresel sürdürülebilirlik ve iklim dayanıklılığı odağında bütüncül bir gelecek vizyonu.
                            </p>

                            <p className="narrative-p">
                                Marmara Sürdürülebilir Çevre Sempozyumu; <strong>hakemli bilimsel bildiriler, panel programları, Ar-Ge proje çağrıları</strong> ve
                                <strong> sürdürülebilir çevre fuarını</strong> tek bir potada eriten ulusal ölçekte vizyoner bir etkinliktir.
                            </p>

                            <p className="narrative-p">
                                İki yılda bir gerçekleştirilen bu dev organizasyon; akademi, kamu, özel sektör ve sivil toplum arasındaki sinerjiyi en üst düzeye çıkarmayı,
                                Marmara Bölgesi'nin öncelikli sorunlarına bilimsel ve kalıcı çözümler üretmeyi hedefler.
                            </p>

                            <motion.div variants={itemVariants} className="quote-modern">
                                <p>
                                    "Bilimi, politikayı ve uygulamayı aynı zeminde buluşturarak, Marmara için sürdürülebilir bir gelecek inşa ediyoruz."
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="visual-premium-container"
                    >
                        <div className="video-frame-modern">
                            <video
                                src="/save-water.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="about-video"
                            />
                            <div className="video-overlay-gradient"></div>
                        </div>

                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="about-bottom-content mt-5"
                >
                    <div className="about-highlights-grid-4">
                        <motion.div variants={itemVariants} className="highlight-card-compact">
                            <div className="icon-circle">
                                <Zap size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-primary mb-1">Ar-Ge Çağrısı</h4>
                            <p className="text-[11px] text-muted leading-relaxed">
                                Üniversite-sanayi iş birliği ile yenilikçi çözümlerin önünü açıyoruz.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="highlight-card-compact">
                            <div className="icon-circle">
                                <Globe size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-primary mb-1">Çevre Fuarı</h4>
                            <p className="text-[11px] text-muted leading-relaxed">
                                Global teknolojilerin ve en iyi uygulamaların sergilendiği dev platform.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="highlight-card-compact">
                            <div className="icon-circle">
                                <Sparkles size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-primary mb-1">Bilimsel Bildiriler</h4>
                            <p className="text-[11px] text-muted leading-relaxed">
                                Hakemli bilimsel çalışmalarla Marmara için kalıcı çözümler üretiyoruz.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="highlight-card-compact">
                            <div className="icon-circle">
                                <ShieldCheck size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-primary mb-1">Panel Programları</h4>
                            <p className="text-[11px] text-muted leading-relaxed">
                                Sektör liderleri ve akademisyenlerle vizyoner tartışma platformu.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="quote-compact">
                        <p>
                            "Bilimi, politikayı ve uygulamayı aynı zeminde buluşturarak, Marmara için sürdürülebilir bir gelecek inşa ediyoruz."
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
