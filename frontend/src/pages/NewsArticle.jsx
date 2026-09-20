import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./NewsArticle.css";

/* =========================================
   NEWS IMAGES
   UNCOMMENT WHEN IMAGES ARE READY
========================================= */

/*
import news1 from "../assets/images/news/football-development-program.jpg";
import news2 from "../assets/images/news/grassroots-activation-scinoza.jpg";
import news3 from "../assets/images/news/coaching-clinic-islamabad.jpg";
import news4 from "../assets/images/news/grassroots-to-greatness-lahore.jpg";
import news5 from "../assets/images/news/ramzan-drive-2026.jpg";
import news6 from "../assets/images/news/saud-yousaf-news.jpg";
import news7 from "../assets/images/news/muhammad-abdullah-hattrick.jpg";
import news8 from "../assets/images/news/empowering-underprivileged.jpg";
*/

const articles = {
  "football-development-program-the-grassroots-foundation": {
    date: "MAY 19, 2026",
    title: "FOOTBALL DEVELOPMENT PROGRAM THE GRASSROOTS FOUNDATION",

    /* image: news1, */

    paragraphs: [
      "The Grassroots Foundation continues its commitment to football development by creating structured opportunities for young players.",
      "Through grassroots training, young athletes can develop football skills, discipline, teamwork, confidence, and a deeper understanding of the game.",
      "The foundation's approach focuses on creating a supportive environment where children can continue developing both on and off the field.",
    ],
  },

  "grassroots-activation-at-scinos-day-home-karachi": {
    date: "MAY 13, 2026",
    title: "GRASSROOTS FOUNDATION ACTIVATION AT SCINOSA DAY HOME KARACHI",

    /* image: news2, */

    paragraphs: [
      "The Grassroots Foundation brought football and community engagement together during its activation at Scinosa Day Home in Karachi.",
      "The event created an opportunity for young people and community members to experience activities centered around teamwork, participation, and positive development.",
      "Community initiatives like these help bring the foundation's mission closer to children and families.",
    ],
  },

  "grassroots-foundation-coaching-clinic-islamabad": {
    date: "MAY 7, 2026",
    title:
      "GRASSROOTS FOUNDATION COACHING CLINIC INSPIRES COACHES IN ISLAMABAD",

    /* image: news3, */

    paragraphs: [
      "The Grassroots Foundation conducted a coaching clinic in Islamabad with a focus on developing coaches and strengthening football knowledge.",
      "The clinic provided coaches with opportunities to learn, exchange ideas, and improve their approach to player development.",
      "Better coaching environments help young players receive more structured and purposeful football development.",
    ],
  },

  "from-grassroots-to-greatness-tgf-lahore-center": {
    date: "APRIL 14, 2026",
    title:
      "FROM GRASSROOTS TO GREATNESS TGF LAHORE CENTER SIGNS FOUR RISING STARS",

    /* image: news4, */

    paragraphs: [
      "Four young players from the TGF Lahore Center continue their football journey with new opportunities to develop and progress.",
      "The milestone reflects the importance of creating structured pathways where talented players can continue improving their skills and football understanding.",
      "The foundation remains focused on helping young players progress through every stage of their football journey.",
    ],
  },

  "the-grassroots-foundations-ramzan-drive-2026": {
    date: "APRIL 9, 2026",
    title: "THE GRASSROOTS FOUNDATION’S RAMZAN DRIVE 2026",

    /* image: news5, */

    paragraphs: [
      "The Grassroots Foundation's Ramzan Drive 2026 brought the community together through support, participation, and outreach.",
      "The initiative reflected the foundation's wider commitment to supporting communities beyond football.",
      "Through community-driven activities, the foundation continues working to create spaces where people can connect and contribute positively.",
    ],
  },

  "saud-yousaf-building-pakistans-football-future": {
    date: "SEPTEMBER 17, 2025",
    title:
      "SAUD YOUSAF: BUILDING PAKISTAN’S FOOTBALL FUTURE FROM THE GRASSROOTS",

    /* image: news6, */

    paragraphs: [
      "The Grassroots Foundation has focused on building football development pathways from the grassroots level.",
      "Saud Yousaf's work with the foundation centers around creating opportunities for young Pakistani players and supporting long-term football development.",
      "The foundation's grassroots approach aims to help young players develop the skills, discipline, and confidence needed to progress.",
    ],
  },

  "muhammad-abdullah-hat-trick-saff-u17": {
    date: "SEPTEMBER 17, 2025",
    title:
      "MUHAMMAD ABDULLAH’S HAT-TRICK LEADS PAKISTAN TO VICTORY AT SAFF U-17 CHAMPIONSHIP",

    /* image: news7, */

    paragraphs: [
      "Muhammad Abdullah's performance at the SAFF U-17 Championship highlighted the talent emerging through youth football development.",
      "His hat-trick provided a memorable moment and demonstrated the potential of young players progressing through structured football pathways.",
      "The achievement also reflects the importance of creating opportunities for young footballers to compete at higher levels.",
    ],
  },

  "grassroots-foundation-empowering-underprivileged": {
    date: "NOVEMBER 8, 2024",
    title:
      "THE GRASSROOTS FOUNDATION: EMPOWERING THE UNDERPRIVILEGED WITH OPPORTUNITIES AND SUPPORT",

    /* image: news8, */

    paragraphs: [
      "The Grassroots Foundation works to create opportunities for young people through football, education, mentorship, and community support.",
      "The foundation aims to provide young players with access to development opportunities that may otherwise be difficult to reach.",
      "By combining football with broader support, the foundation works to create a positive environment where young people can grow and pursue their goals.",
    ],
  },
};

function NewsArticle() {
  const { slug } = useParams();

  const article = articles[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <>
        <Navbar />

        <main className="news-article-page">
          <section className="news-article-hero">
            <h1>NEWS ARTICLE NOT FOUND</h1>

            <Link to="/news" className="news-article-back">
              <ArrowLeft size={16} />
              BACK TO NEWS
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="news-article-page">
        <section className="news-article-hero">
          <Link to="/news" className="news-article-back">
            <ArrowLeft size={16} />
            BACK TO NEWS
          </Link>

          <div className="news-article-layout">
            {/* =========================================
                IMAGE HALF
                IMAGE CODE KEPT COMMENTED
            ========================================= */}

            <div className="news-article-image">
              {/*
              <img
                src={article.image}
                alt={article.title}
              />
              */}

              <div className="news-article-image-placeholder"></div>
            </div>

            {/* =========================================
                CONTENT HALF
            ========================================= */}

            <div className="news-article-content">
              <span className="news-article-date">{article.date}</span>

              <h1>{article.title}</h1>

              <div className="news-article-line"></div>

              {article.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <Link to="/contact" className="news-article-contact">
                CONTACT US
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <JoinCommunity />
      </main>

      {/* =========================================
          FLOATING CONTACT
      ========================================= */}

      <div className="news-article-floating-contact">
        <a
          href="tel:+0000000000"
          className="news-article-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="news-article-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default NewsArticle;
