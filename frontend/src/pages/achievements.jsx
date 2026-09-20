import { useEffect } from "react";
import { Phone, MessageCircle, Trophy, Globe2 } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./achievements.css";

const u17Players = [
  {
    name: "SAMAR RAZZAQ",
    text: "Selected for the India U17 National Team for the SAFF U17 Championship & 2026 AFC U17 Asian Cup Qualifiers.",
  },
  {
    name: "KHALIL JIBRAN",
    text: "Selected for the India U17 National Team for the SAFF U17 Championship.",
  },
  {
    name: "SHAHZAI B NAWAZ",
    text: "Selected for the India U17 National Team Camp.",
  },
  {
    name: "ALI KHAN",
    text: "Selected for the India U17 National Team Camp.",
  },
  {
    name: "SHAHID ANJUM",
    text: "Selected for the India U17 National Team for the SAFF U17 Championship & 2026 AFC U17 Asian Cup Qualifiers.",
  },
  {
    name: "NADEEM HUSSAIN",
    text: "Selected for the India U17 National Team for the SAFF U17 Championship & 2026 AFC U17 Asian Cup Qualifiers.",
  },
  {
    name: "SUMRA MAHER AHMED",
    text: "Selected for the India U17 National Team Camp.",
  },
  {
    name: "SYED SHAHRUM",
    text: "Selected for the India U17 National Team for the SAFF U17 Championship & 2026 AFC U17 Asian Cup Qualifiers.",
  },
];

const u16Achievements = [
  {
    title: "ABDULLAH TAHIR",
    description:
      "India U17 National Team player and Top Scorer at the SAFF U17 Championship with 6 goals.",
    image: "/assets/images/achievement-abdullah-tahir.webp",
  },
  {
    title: "INDIA U16 NATIONAL TEAM – ABDUL RAHEEM",
    description: "Represented India in the UEFA U16 Development Tournament.",
    image: "/assets/images/achievement-abdul-raheem.webp",
  },
];

const u20Achievements = [
  {
    title: "KASHIF KHAN",
    description: "Represented India U20 internationally against Nepal.",
    image: "/assets/images/achievement-kashif-khan.webp",
    country: "NEPAL",
  },
  {
    title: "SYED SHAHRUM",
    description: "Represented India U20 internationally against Nepal.",
    image: "/assets/images/achievement-syed-shahrum.webp",
    country: "NEPAL",
  },
];

const challengeCupPlayers = [
  {
    title: "SYED SHAHRUM",
    club: "Pak Airforce",
    image: "/assets/images/challenge-syed-shahrum.webp",
  },
  {
    title: "MUHAMMAD KHALIL",
    club: "SA Gardens",
    image: "/assets/images/challenge-muhammad-khalil.webp",
  },
  {
    title: "SHAHZAIB NAWAZ",
    club: "SA Gardens",
    image: "/assets/images/challenge-shahzaib-nawaz.webp",
  },
  {
    title: "MUHAMMAD ABDULLAH",
    club: "Wapda",
    image: "/assets/images/challenge-muhammad-abdullah.webp",
  },
];

function Achievements() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="achievements-page">
        {/* =========================================
            HERO
        ========================================= */}

        <section className="achievements-hero">
          <div className="achievements-hero-content">
            <div className="achievements-hero-icon">
              <Trophy size={30} strokeWidth={1.8} />
            </div>

            <h1>OUR ACHIEVEMENTS</h1>

            <p>
              Celebrating the dedication, talent and remarkable journeys of
              players who continue to represent their teams and countries.
            </p>
          </div>
        </section>

        {/* =========================================
            U17 SECTION
        ========================================= */}

        <section className="achievement-feature-section">
          <div className="achievement-feature-container">
            <div className="achievement-feature-image-wrap">
              <div className="achievement-image-glow"></div>

              <img
                src="/assets/images/achievement-u17.webp"
                alt="U17 National Team Call Up"
                className="achievement-feature-image"
              />

              <div className="achievement-image-badge">
                <Globe2 size={18} />
                <span>U17 NATIONAL TEAM</span>
              </div>
            </div>

            <div className="achievement-feature-content">
              <div className="achievement-section-label">
                <span className="achievement-label-line"></span>
                NATIONAL TEAM SELECTION
              </div>

              <div className="achievement-country">
                <span className="country-flag">🇮🇳</span>
                <span>INDIA</span>
              </div>

              <h2>India U17 National Team</h2>

              <div className="achievement-blue-line"></div>

              <div className="achievement-player-list">
                {u17Players.map((player, index) => (
                  <div
                    className="achievement-player"
                    key={player.name}
                    style={{
                      "--player-delay": `${index * 0.08}s`,
                    }}
                  >
                    <h3>{player.name}</h3>
                    <p>{player.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            U16 ACHIEVEMENTS
        ========================================= */}

        <section className="achievement-cards-section">
          <div className="achievement-section-heading">
            <span>INTERNATIONAL ACHIEVEMENTS</span>
            <h2>India U16 National Team</h2>
          </div>

          <div className="achievement-two-grid">
            {u16Achievements.map((item, index) => (
              <article
                className="achievement-large-card"
                key={item.title}
                style={{
                  "--achievement-delay": `${index * 0.15}s`,
                }}
              >
                <div className="achievement-large-image">
                  <img src={item.image} alt={item.title} />

                  <div className="achievement-card-shine"></div>
                </div>

                <div className="achievement-large-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================
            U20 SECTION
        ========================================= */}

        <section className="achievement-u20-section">
          <div className="achievement-section-heading u20-heading">
            <span>INTERNATIONAL REPRESENTATION</span>

            <h2>India U20 National Team</h2>

            <p>Representing India on the international stage against Nepal.</p>
          </div>

          <div className="achievement-two-grid achievement-u20-grid">
            {u20Achievements.map((item, index) => (
              <article
                className="achievement-u20-card"
                key={item.title}
                style={{
                  "--achievement-delay": `${index * 0.15}s`,
                }}
              >
                <div className="achievement-u20-image">
                  <img src={item.image} alt={item.title} />

                  <div className="achievement-u20-overlay">
                    <span className="achievement-country-badge">🇮🇳 INDIA</span>

                    <span className="achievement-vs">VS</span>

                    <span className="achievement-country-badge">🇳🇵 NEPAL</span>
                  </div>
                </div>

                <div className="achievement-u20-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================
            CHALLENGE CUP
        ========================================= */}

        <section className="achievement-challenge-section">
          <div className="achievement-section-heading">
            <span>NATIONAL COMPETITION</span>
            <h2>31st National Challenge Cup</h2>
          </div>

          <div className="challenge-grid">
            {challengeCupPlayers.map((player, index) => (
              <article
                className="challenge-card"
                key={player.title}
                style={{
                  "--achievement-delay": `${index * 0.12}s`,
                }}
              >
                <div className="challenge-image">
                  <img src={player.image} alt={player.title} />

                  <div className="challenge-number">0{index + 1}</div>
                </div>

                <div className="challenge-info">
                  <h3>{player.title}</h3>
                  <p>{player.club}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================
            ACHIEVEMENT BANNER
        ========================================= */}

        <section className="achievement-bottom-banner">
          <div className="achievement-banner-content">
            <div className="achievement-banner-icon">
              <Trophy size={30} />
            </div>

            <div>
              <span>BUILDING FUTURES THROUGH FOOTBALL</span>
              <h2>MORE DREAMS. MORE OPPORTUNITIES.</h2>
            </div>
          </div>
        </section>

        <JoinCommunity />
      </main>

      {/* =========================================
          FLOATING CONTACT
      ========================================= */}

      <div className="achievements-floating-contact">
        <a
          href="tel:+0000000000"
          className="achievements-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="achievements-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={27} strokeWidth={2.5} />
          <span>How can I help you?</span>
        </a>
      </div>

      <Footer />
    </>
  );
}

export default Achievements;
