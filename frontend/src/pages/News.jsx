import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./News.css";

/* =========================================
   NEWS IMAGES
   UNCOMMENT THESE IMPORTS WHEN IMAGES ARE READY
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

const newsArticles = [
  {
    id: 1,
    date: "MAY 19, 2026",
    title: "FOOTBALL DEVELOPMENT PROGRAM THE GRASSROOTS FOUNDATION",
    slug: "football-development-program-the-grassroots-foundation",
    text: "The Grassroots Foundation continues its commitment to developing young football talent through structured grassroots programs, quality coaching, discipline, teamwork, and opportunities for young players to grow.",

    /* image: news1, */
  },

  {
    id: 2,
    date: "MAY 13, 2026",
    title: "GRASSROOTS FOUNDATION ACTIVATION AT SCINOSA DAY HOME KARACHI",
    slug: "grassroots-activation-at-scinos-day-home-karachi",
    text: "The Grassroots Foundation hosted a community activation at Scinosa Day Home in Karachi, bringing football, teamwork, engagement, and positive opportunities closer to young people.",

    /* image: news2, */
  },

  {
    id: 3,
    date: "MAY 7, 2026",
    title:
      "GRASSROOTS FOUNDATION COACHING CLINIC INSPIRES COACHES IN ISLAMABAD",
    slug: "grassroots-foundation-coaching-clinic-islamabad",
    text: "The Grassroots Foundation conducted a coaching clinic in Islamabad focused on improving coaching knowledge, practical development, player understanding, and long-term football development.",

    /* image: news3, */
  },

  {
    id: 4,
    date: "APRIL 14, 2026",
    title:
      "FROM GRASSROOTS TO GREATNESS TGF LAHORE CENTER SIGNS FOUR RISING STARS",
    slug: "from-grassroots-to-greatness-tgf-lahore-center",
    text: "Four promising young players from the TGF Lahore Center continue their football journey with new opportunities to develop their abilities and progress towards higher levels of competition.",

    /* image: news4, */
  },

  {
    id: 5,
    date: "APRIL 9, 2026",
    title: "THE GRASSROOTS FOUNDATION’S RAMZAN DRIVE 2026",
    slug: "the-grassroots-foundations-ramzan-drive-2026",
    text: "The Grassroots Foundation's Ramzan Drive focused on community support and bringing people together through compassion, participation, and meaningful outreach during the holy month.",

    /* image: news5, */
  },

  {
    id: 6,
    date: "SEPTEMBER 17, 2025",
    title:
      "SAUD YOUSAF: BUILDING PAKISTAN’S FOOTBALL FUTURE FROM THE GRASSROOTS",
    slug: "saud-yousaf-building-pakistans-football-future",
    text: "Saud Yousaf has focused on building football pathways from the grassroots level and creating opportunities for young Pakistani players through structured development and community support.",

    /* image: news6, */
  },

  {
    id: 7,
    date: "SEPTEMBER 17, 2025",
    title:
      "MUHAMMAD ABDULLAH’S HAT-TRICK LEADS PAKISTAN TO VICTORY AT SAFF U-17 CHAMPIONSHIP",
    slug: "muhammad-abdullah-hat-trick-saff-u17",
    text: "Muhammad Abdullah's performance at the SAFF U-17 Championship highlighted the talent emerging through grassroots football development and provided a memorable moment for young football supporters.",

    /* image: news7, */
  },

  {
    id: 8,
    date: "NOVEMBER 8, 2024",
    title:
      "THE GRASSROOTS FOUNDATION: EMPOWERING THE UNDERPRIVILEGED WITH OPPORTUNITIES AND SUPPORT",
    slug: "grassroots-foundation-empowering-underprivileged",
    text: "The Grassroots Foundation works to create opportunities for young people through football, education, mentorship, community programs, and support for players who face limited access to resources.",

    /* image: news8, */
  },
];

function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="news-page">
        {/* =========================================
            HEADER
        ========================================= */}
        <section className="news-header">
          <div className="news-header-line"></div>

          <h1>THE GRASSROOTS FOUNDATION NEWS</h1>

          <p>
            Discover the latest stories, achievements, community activities,
            football development programs, and journeys from The Grassroots
            Foundation.
          </p>
        </section>

        {/* =========================================
            NEWS CARDS
        ========================================= */}
        <section className="news-section">
          <div className="news-grid">
            {newsArticles.map((article, index) => (
              <article
                className="news-card"
                key={article.id}
                style={{
                  "--news-delay": `${index * 0.08}s`,
                }}
              >
                {/* =========================================
                    LEFT HALF - IMAGE
                    IMAGE CODE KEPT COMMENTED
                ========================================= */}
                <Link to={`/news/${article.slug}/`} className="news-image-link">
                  <div className="news-image-wrapper">
                    {/*
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-image"
                    />
                    */}

                    <div className="news-image-placeholder"></div>

                    <div className="news-image-overlay">
                      <span>READ ARTICLE</span>
                      <ArrowRight size={19} />
                    </div>
                  </div>
                </Link>

                {/* =========================================
                    RIGHT HALF - CONTENT
                ========================================= */}
                <div className="news-content">
                  <span className="news-date">{article.date}</span>

                  <div className="news-content-middle">
                    <h2>{article.title}</h2>

                    <p className="news-card-description">{article.text}</p>
                  </div>

                  <Link
                    to={`/news/${article.slug}/`}
                    className="news-read-more"
                  >
                    <span>READ MORE</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <JoinCommunity />
      </main>

      {/* =========================================
          FLOATING CONTACT
      ========================================= */}
      <div className="news-floating-contact">
        <a
          href="tel:+0000000000"
          className="news-floating-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="news-floating-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default News;
