import '../styles/Footer.css';
import LogoKarol from '../img/LogoKarol.png';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-up">
                <div className="footer-p">
                    <p>AVISO IMPORTANTE: Todo el contenido disponible en este sitio web,
                        tiene como único objetivo proporcionar información general 
                        procedente de la API consumida (Coingecko)</p>
                </div>
                <div className="footer-c">
                    <p>Crypto Stadistics</p>
                    <p>© 2022</p>
                </div>
            </div>
            <div className="footer-down">
                <p>Developed by</p>
                <div>
                    <img src={LogoKarol} alt="logo Karol" />
                </div>
            </div>
        </div>
    );
}
export default Footer;