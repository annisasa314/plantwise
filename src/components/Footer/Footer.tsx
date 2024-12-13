import React from "react";
import { IonFooter, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Footer.css";
const Footer: React.FC = () => {
  return (
    <IonFooter className="footer bg-green-900">
      <IonGrid className="footer-container">
        {/* Brand Section */}
        <IonRow className="footer-row">
          <IonCol sizeMd="4" sizeSm="12" className="footer-brand">
            <div className="logo">
              <img
                src="/logo2.png"
                alt="Plantwise Logo"
                className="logo-img-footer"
              />
            </div>

            <p className="copyright">©2024 plantwise. Semua Hak Dilindungi.</p>
          </IonCol>
          {/* Links Section */}
          <IonCol sizeMd="4" sizeSm="6" className="footer-links">
            <ul>
              <li>
                <a href="#">Beranda</a>
              </li>
              <li>
                <a href="">Daftar / Masuk</a>
              </li>
              <li>
                <a href="#">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="#">Kebijakan Privasi</a>
              </li>
            </ul>
          </IonCol>
          {/* Social Media Section */}
          <IonCol sizeMd="4" sizeSm="6" className="footer-socials">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonFooter>
  );
};
export default Footer;
