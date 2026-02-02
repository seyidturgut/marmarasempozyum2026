import { Facebook, Instagram, Twitter, Youtube, Phone, Mail } from 'lucide-react';
import FooterGlobe from './FooterGlobe';

const Footer = () => {
    return (
        <footer id="iletisim">
            <FooterGlobe />
            <div className="footer-grid">
                <div className="footer-col">
                    <div className="footer-logos">
                        <img src="/cropped-marmaralogo.png" alt="Marmara Çevre" className="footer-brand-logo" />
                        <img src="/kbb-logo-1.png" alt="Kocaeli Büyükşehir Belediyesi" className="footer-brand-logo" />
                    </div>
                    <p style={{ opacity: 0.8, lineHeight: 1.6, marginTop: '1.5rem' }}>Sürdürülebilir bir gelecek için<br />birlikte çalışıyoruz.</p>
                </div>
                <div className="footer-col">
                    <h4>Hızlı Bağlantılar</h4>
                    <ul>
                        <li><a href="#hakkimizda">Hakkımızda</a></li>
                        <li><a href="#etkinlikler">Etkinlikler</a></li>
                        <li><a href="#konusmacilar">Konuşmacılar</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>İletişim</h4>
                    <ul>
                        <li>
                            <a href="tel:262318100" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Phone size={14} /> 0262 318 10 00
                            </a>
                        </li>
                        <li>
                            <a href="mailto:cevre@cevre.com.tr" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail size={14} /> cevre@cevre.com.tr
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Sosyal Medya</h4>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/marmaracevre" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Facebook size={14} /> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/marmaracevre" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Instagram size={14} /> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/marmaracevre" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Twitter size={14} /> X (Twitter)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@marmaracevre" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Youtube size={14} /> YouTube
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; MARMARA SÜRDÜRÜLEBİLİR ÇEVRE SEMPOZYUMU 2026</p>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.7 }}>Marmara’nın yarını için: Suyu koru, yaşamı koru</p>
            </div>
        </footer>
    );
};

export default Footer;
