import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Check } from "lucide-react";
import JoinCommunity from "../components/JoinCommunity";

import aboutLeft from "../assets/images/about-left.jpeg";
import aboutRight from "../assets/images/about-right.jpeg";

import programLeft from "../assets/images/about-left1.jpeg";
import programRight from "../assets/images/about-right1.jpeg";

import footballImage from "../assets/images/football.png";
import handImage from "../assets/images/hand.png";
import nextGeneration from "../assets/images/next-generation.jpeg";
import footballCamp from "../assets/images/football-camp.jpeg";
import footballField from "../assets/images/football-field.jpg";

import shuraim from "../assets/images/shuraim.jpeg";
import irfanYousuf from "../assets/images/irfanyousuf.jpeg";
import sameer from "../assets/images/sameer.jpeg";
import moosa from "../assets/images/moosa.jpeg";

import heroVideo from "../assets/videos/hero-video.mp4";
import logo from "../assets/images/logo.png";

function Home() {
  const phoneNumber = "+919999999999";

  /* =========================================================
     SEO
  ========================================================= */

  useEffect(() => {
    const siteName = "Khel Aur Shiksha Foundation";

    const title =
      "Khel Aur Shiksha Foundation | Football, Education & Youth Development";

    const description =
      "Khel Aur Shiksha Foundation empowers young people through football, education and community initiatives, helping children develop confidence, discipline, teamwork and opportunities for a brighter future.";

    const keywords =
      "Khel Aur Shiksha Foundation, KAS Foundation, football foundation, football training, youth football, football academy, sports education, education programs, football camps, youth development, community development, grassroots football";

    const currentUrl = window.location.href;
    const siteUrl = window.location.origin;

    document.title = title;

    const setMeta = (attribute, name, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setLink = (rel, href) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`
      );

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.setAttribute("href", href);
    };

    /* Basic SEO */
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("name", "author", siteName);
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    /* Open Graph */
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", currentUrl);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:image", `${siteUrl}${logo}`);

    /* Twitter */
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${siteUrl}${logo}`);

    /* Canonical */
    setLink("canonical", currentUrl);

    /* Structured Data */
    let structuredData = document.getElementById(
      "kas-foundation-structured-data"
    );

    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "kas-foundation-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}${logo}`,
      description: description,
    });

    return () => {
      const existingStructuredData = document.getElementById(
        "kas-foundation-structured-data"
      );

      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, []);

  const aboutSectionRef = useRef(null);
  const programsSectionRef = useRef(null);
  const whyFoundationRef = useRef(null);

  const footballRotationRef = useRef(0);
  const previousScrollYRef = useRef(0);

  /* =========================================================
     ABOUT ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = aboutSectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("about-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     PROGRAMS ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = programsSectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("programs-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     WHY FOUNDATION - ENTRY ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = whyFoundationRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("why-foundation-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     FOOTBALL ROTATES ONLY WITH PAGE SCROLL
  ========================================================= */

  useEffect(() => {
    const section = whyFoundationRef.current;

    if (!section) return;

    const football = section.querySelector(".why-foundation-ball img");

    if (!football) return;

    previousScrollYRef.current = window.scrollY;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        const scrollDifference =
          currentScrollY - previousScrollYRef.current;

        const rect = section.getBoundingClientRect();

        const isVisible =
          rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          footballRotationRef.current += scrollDifference * 0.8;

          football.style.transform = `rotate(${footballRotationRef.current}deg)`;
        }

        previousScrollYRef.current = currentScrollY;

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     VALUES TEXT - START FROM LEFT
     MOVE ONLY WHEN USER SCROLLS
  ========================================================= */

  useEffect(() => {
    const section = document.querySelector(
      ".values-marquee-section"
    );

    const track = document.querySelector(
      ".values-marquee-track"
    );

    if (!section || !track) return;

    let lastScrollY = window.scrollY;
    let currentX = 0;
    let ticking = false;

    track.style.transform = "translate3d(0, 0, 0)";

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();

        const isVisible =
          rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const scrollDifference =
            window.scrollY - lastScrollY;

          currentX -= scrollDifference * 1.2;

          track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        }

        lastScrollY = window.scrollY;

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-card">
            <div className="hero-badge">
              WELCOME TO THE KAS FOUNDATION
            </div>

            <div className="hero-text">
              <h1>
                BUILDING FUTURES
                <br />
                THROUGH FOOTBALL
              </h1>

              <p>
                AT THE KAS FOUNDATION, WE BELIEVE EVERY CHILD DESERVES
                A CHANCE TO DREAM. THROUGH FOOTBALL, WE EMPOWER
                UNDERPRIVILEGED YOUTH, NURTURING TALENT, DISCIPLINE,
                AND OPPORTUNITY BOTH ON AND OFF THE FIELD.
              </p>
            </div>

            <div className="hero-actions">
              <a
                href={`tel:${phoneNumber}`}
                className="hero-call-button"
              >
                <Phone size={17} />
                <span>CALL NOW</span>
              </a>

              <Link
                to="/contact"
                className="hero-contact-button"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        ref={aboutSectionRef}
        className="about-home-section"
      >
        <div className="about-home-container">
          <div className="about-home-image about-home-image-left">
            <img
              src={aboutLeft}
              alt="Khel Aur Shiksha Foundation football team"
            />
          </div>

          <div className="about-home-card">
            <div className="about-home-badge">ABOUT US</div>

            <h2>WHO WE ARE</h2>

            <p>
              Khel Aur Shiksha Foundation was established with a
              simple belief: sports and education have the power to
              transform lives. Founded by two brothers,
              <b> Kaleem A. Yousuf</b> and
              <b> Shameem M. Yousuf</b>, the foundation is dedicated
              to empowering young people through access to quality
              education and sports.
            </p>

            <p>
              We work especially with children and youth from
              underprivileged communities, helping them build
              confidence, discipline, teamwork, and the skills
              needed for a brighter future.
            </p>

            <Link
              to="/about"
              className="about-home-button"
            >
              LEARN MORE
            </Link>
          </div>

          <div className="about-home-image about-home-image-right">
            <img
              src={aboutRight}
              alt="Young football players"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR PROGRAMS
      ===================================================== */}

      <section
        ref={programsSectionRef}
        className="programs-home-section"
      >
        <div className="programs-home-container">
          <div className="programs-home-heading">
            <div className="programs-home-badge">
              OUR PROGRAMS
            </div>

            <h2>FOOTBALL IS FOR EVERYONE</h2>
          </div>

          <div className="programs-home-grid">
            <article className="program-home-card program-home-card-left">
              <Link
                to="/our-training-program"
                className="program-home-image-link"
              >
                <div className="program-home-image">
                  <img
                    src={programLeft}
                    alt="Football Training Program"
                  />
                </div>
              </Link>

              <div className="program-home-content">
                <span className="program-home-label">
                  FOOTBALL PROGRAMS
                </span>

                <h3>TRAINING PROGRAM</h3>

                <p>
                  We provide structured football training designed
                  to unlock potential and nurture talent from the
                  ground up. Our programs focus on skill development,
                  fitness, teamwork, and discipline — ensuring that
                  every child learns the game the right way.
                </p>
              </div>
            </article>

            <article className="program-home-card program-home-card-right">
              <Link
                to="/education-program"
                className="program-home-image-link"
              >
                <div className="program-home-image">
                  <img
                    src={programRight}
                    alt="Academic Support Program"
                  />
                </div>
              </Link>

              <div className="program-home-content">
                <span className="program-home-label">
                  ACADEMIC SUPPORT
                </span>

                <h3>EDUCATION</h3>

                <p>
                  At Khel Aur Shiksha Foundation, education goes hand
                  in hand with sport. We support children's academic
                  growth by promoting learning, perseverance, and
                  focus, giving them the tools to excel beyond the
                  field.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE KHEL AUR SHIKSHA FOUNDATION
      ========================================================= */}

      <section
        ref={whyFoundationRef}
        className="why-foundation-section"
      >
        <div
          className="why-foundation-background"
          style={{
            backgroundImage: `url(${footballField})`,
          }}
        ></div>

        <div className="why-foundation-hand">
          <img src={handImage} alt="" />
        </div>

        <div className="why-foundation-card">
          <div className="why-foundation-badge">
            ABOUT US
          </div>

          <div className="why-foundation-ball">
            <img src={footballImage} alt="Football" />
          </div>

          <div className="why-foundation-content">
            <h2>
              WHY CHOOSE KHEL AUR SHIKSHA FOUNDATION
            </h2>

            <p>
              We’re more than a football foundation — we’re a
              movement changing lives through sport. Operating in
              the majority of Pakistan and catering to kids from all
              across the country, Khel Aur Shiksha Foundation is
              transforming football at the grassroots level with
              impact that speaks for itself:
            </p>

            <div className="why-foundation-divider"></div>

            <ul>
              <li>
                Biggest football development NGO in Pakistan.
              </li>

              <li>
                Pathways to professional opportunities for
                underprivileged youth.
              </li>

              <li>
                Holistic approach that combines football training,
                education, and mentorship.
              </li>

              <li>
                40+ dedicated coaches & staff committed to player
                growth.
              </li>

              <li>
                Linked with clubs abroad, working with middle east
                very closely.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="values-marquee-section">
        <div className="values-marquee-track">
          <span>HEART.</span>
          <span>RESPECT.</span>
          <span>TEAMWORK.</span>
          <span>INTEGRITY.</span>
          <span>ACCOUNTABILITY.</span>
          <span>HUMILITY.</span>
          <span>SPIRIT.</span>
          <span>SELF-BELIEF.</span>
        </div>
      </section>

      {/* =========================================================
          TRAINING PROGRAMS / GRASSROOTS TO ELITE
      ========================================================= */}

      <section className="training-showcase-section">
        <div className="training-showcase-container">
          <div className="training-showcase-row training-showcase-row-left">
            <div className="training-showcase-content">
              <h2>
                TRAINING PROGRAMS – FROM GRASSROOTS TO ELITE
              </h2>

              <p>
                At Khel Aur Shiksha Foundation, we provide a clear
                pathway for young players, starting from the basics
                and progressing towards professional-level training.
                Our programs are designed to match every age group’s
                needs, focusing on skill development, fitness,
                tactical awareness, and personal growth.
              </p>

              <p>
                From <strong>Grassroots (U10–U12)</strong> where kids
                discover the joy of football, to{" "}
                <strong>Elite (U17)</strong> where players are
                prepared for professional opportunities, Khel Aur
                Shiksha Foundation ensures that every child receives
                the right training at the right stage of their
                journey.
              </p>
            </div>

            <div className="training-showcase-image">
              <img
                src={footballField}
                alt="Next generation football players"
              />
            </div>
          </div>

          <div className="training-showcase-row training-showcase-row-reverse">
            <div className="training-showcase-content">
              <h2>
                BUILDING DREAMS THROUGH FOOTBALL CAMPS
              </h2>

              <p>
                At Khel Aur Shiksha Foundation, our football camps
                are more than just training sessions — they are
                stepping stones to a brighter future. Designed to
                unlock potential, these camps provide young players
                with world-class coaching, mentorship, and a
                supportive environment to learn, grow, and showcase
                their talent. From instilling confidence on the field
                to creating pathways toward international
                opportunities, we are committed to transforming
                passion for football into lifelong success stories.
              </p>
            </div>

            <div className="training-showcase-image">
              <img
                src={footballCamp}
                alt="Next generation football players"
              />
            </div>
          </div>

          <div className="training-showcase-row training-showcase-row-left">
            <div className="training-showcase-content">
              <h2>EMPOWERING THE NEXT GENERATION</h2>

              <p>
                Khel Aur Shiksha Foundation is committed to shaping
                the future of football by creating clear pathways
                for young players to rise. With a focus on discipline,
                teamwork, and opportunity, we transform potential
                into progress. Every player represents not just
                talent, but the promise of a stronger football
                culture and a brighter tomorrow for the next
                generation.
              </p>
            </div>

            <div className="training-showcase-image">
              <img
                src={nextGeneration}
                alt="Next generation football players"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR TEAM
      ========================================================= */}

      <section className="home-team-section">
        <div className="home-team-container">
          <div className="home-team-heading">
            <h2>OUR TEAM</h2>
            <div className="home-team-heading-line"></div>
          </div>

          <div className="home-team-grid">
            <Link
              to="/team/shuraim/"
              className="home-team-card"
            >
              <div className="home-team-image">
                <img src={shuraim} alt="M Shuraim" />
              </div>

              <div className="home-team-info">
                <h3>M Shuraim</h3>
                <p>DEFENDER</p>
              </div>
            </Link>

            <Link
              to="/team/irfan-yousuf/"
              className="home-team-card"
            >
              <div className="home-team-image">
                <img
                  src={irfanYousuf}
                  alt="Irfan Yousuf"
                />
              </div>

              <div className="home-team-info">
                <h3>Irfan Yousuf</h3>
                <p>Attacker</p>
              </div>
            </Link>

            <Link
              to="/team/sameer/"
              className="home-team-card"
            >
              <div className="home-team-image">
                <img src={sameer} alt="Sameer" />
              </div>

              <div className="home-team-info">
                <h3>SAMEER</h3>
                <p>Stopper</p>
              </div>
            </Link>

            <Link
              to="/team/moosa-yousuf/"
              className="home-team-card"
            >
              <div className="home-team-image">
                <img
                  src={moosa}
                  alt="Moosa Yousuf"
                />
              </div>

              <div className="home-team-info">
                <h3>MOOSA YOUSUF</h3>
                <p>Attacker</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOIN OUR COMMUNITY
      ========================================================= */}

      <JoinCommunity />
    </div>
  );
}

export default Home;