import { useEffect, useRef } from "react";
import "./OurTrainingProgram.css";

import programImage from "../assets/images/about-left1.jpeg";
import trainingImage from "../assets/images/about-right1.jpeg";

function OurTrainingProgram() {
  const sectionsRef = useRef([]);

  /* =====================================================
     ALWAYS OPEN PAGE FROM TOP
  ===================================================== */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* =====================================================
     SCROLL ANIMATION
  ===================================================== */

  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("training-section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const addSectionRef = (element) => {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element);
    }
  };

  return (
    <div className="training-page">
      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section className="training-page-hero">
        <div className="training-page-hero-content">
          <h1>TRAINING PROGRAM</h1>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-content-section training-intro-section"
      >
        <div className="training-content-container">
          <div className="training-image-wrapper">
            <img
              src={programImage}
              alt="Grassroots Foundation Football Training"
            />
          </div>

          <div className="training-text-content">
            <h2>FOOTBALL DEVELOPMENT PROGRAM THE GRASSROOTS FOUNDATION</h2>

            <p>
              The Grassroots Foundation (TGF) is committed to developing the
              next generation of footballers in Pakistan by providing
              structured, professional, and high-quality football training
              opportunities for young players. More than just a football
              program, TGF is a platform focused on discipline, education,
              character building, teamwork, and long-term athlete development.
            </p>

            <p>
              Currently, The Grassroots Foundation is actively operating in
              three major cities of Pakistan: Islamabad, Lahore, and Karachi,
              and Tando Jam where talented young players are receiving regular
              training under experienced and passionate coaches who have
              dedicated their lives to the game.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ISLAMABAD CENTER
      ===================================================== */}

      <section ref={addSectionRef} className="training-content-section">
        <div className="training-content-container training-reverse">
          <div className="training-text-content">
            <h2>ISLAMABAD CENTER</h2>

            <p>
              In Islamabad, TGF operates at the renowned Sports Complex under
              the supervision of Walid Javaid. Training sessions are conducted
              four days a week, where players receive structured coaching
              focused on technical development, fitness, tactical understanding,
              and game awareness.
            </p>

            <p>
              Coach Walid Javaid is regarded as one of the country's finest
              football coaches and serves as a great example of hard work,
              professionalism, and dedication. His passion for player
              development and his ability to inspire young athletes make the
              Islamabad center one of the strongest development hubs of TGF.
              Under his guidance, players are not only improving as footballers
              but are also learning discipline, commitment, and the importance
              of teamwork.
            </p>
          </div>

          <div className="training-image-wrapper">
            <img src={trainingImage} alt="Islamabad Football Training Center" />
          </div>
        </div>
      </section>

      {/* =====================================================
          LAHORE CENTER
      ===================================================== */}

      <section ref={addSectionRef} className="training-content-section">
        <div className="training-content-container">
          <div className="training-image-wrapper">
            <img src={trainingImage} alt="Lahore Football Training Center" />
          </div>

          <div className="training-text-content">
            <h2>LAHORE CENTER</h2>

            <p>
              In Lahore, the program operates under the leadership of Coach
              Zafar, a highly respected and experienced coach with a long
              history in football development and university-level coaching.
              Throughout his coaching career, he has worked with prestigious
              institutions including Lahore University of Management Sciences
              and University of the Punjab, where he played an important role in
              developing young football talent.
            </p>

            <p>
              Coach Zafar is currently serving as the head assistant for the TGF
              Lahore Center and continues to bring his vast experience and
              football knowledge into the development of young players. His
              coaching philosophy focuses on discipline, technical growth, and
              creating a professional training environment for every athlete.
            </p>

            <p>
              The Lahore center also hosts a special two-week intensive training
              camp every month at SA Garden Lahore, where talented players from
              all across Punjab come together to train. These camps provide
              players with the opportunity to experience competitive football
              environments, improve their skills, and learn from experienced
              coaches.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          KARACHI CENTER
      ===================================================== */}

      <section ref={addSectionRef} className="training-content-section">
        <div className="training-content-container training-reverse">
          <div className="training-text-content">
            <h2>KARACHI CENTER</h2>

            <p>
              In Karachi, TGF conducts training sessions four days a week at the
              famous Kakri Ground under the coaching of Arshad Jamal, assisted
              by Hamza. Kakri Ground is considered one of the best football
              pitches in Karachi and has long been known as a hub for football
              talent and community football culture.
            </p>

            <p>
              The Karachi center focuses on creating a competitive and energetic
              training atmosphere where players can sharpen their technical
              abilities, improve physical fitness, and gain valuable match
              experience. With the support of experienced coaches and a strong
              football culture, players are continuously encouraged to push
              their limits and develop confidence both as athletes and
              individuals.
            </p>
          </div>

          <div className="training-image-wrapper">
            <img src={programImage} alt="Karachi Football Training Center" />
          </div>
        </div>
      </section>

      {/* =====================================================
          TANDO JAM CENTER
      ===================================================== */}

      <section ref={addSectionRef} className="training-content-section">
        <div className="training-content-container">
          <div className="training-image-wrapper">
            <img src={programImage} alt="Tando Jam Football Training Center" />
          </div>

          <div className="training-text-content">
            <h2>TANDO JAM CENTER</h2>

            <p>
              In Tando Jam, the Grassroots Foundation is expanding its mission
              of football development under the supervision of Coach Musa, who
              is working closely with young players from underprivileged areas
              and minority communities. The center focuses on identifying raw
              talent and providing opportunities to children who often have
              limited access to professional sports facilities and structured
              training programs.
            </p>

            <p>
              Through regular coaching sessions, mentorship, and community
              engagement, players are given a safe and positive environment
              where they can develop their football skills, build confidence,
              and learn important life values such as discipline, teamwork, and
              respect.
            </p>

            <p>
              Coach Musa is playing an important role in creating opportunities
              for young athletes in the region by encouraging participation in
              sports and helping players believe in their potential both on and
              off the field.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE THAN FOOTBALL
      ===================================================== */}

      <section ref={addSectionRef} className="training-more-section">
        <div className="training-more-container">
          <h2>MORE THAN FOOTBALL</h2>

          <p>
            The Grassroots Foundation believes football can become a powerful
            tool for positive change. The organization is not only focused on
            producing better footballers but also on building responsible,
            educated, and confident young individuals. Through structured
            coaching, mentorship, educational support, and community engagement,
            TGF is creating opportunities for talented players who dream of
            building a future through sports.
          </p>

          <p>
            From professional coaching and organized training camps to
            educational support and player development pathways, The Grassroots
            Foundation continues to invest in the future of Pakistan's football
            community, proving that it is about much more than football.
          </p>
        </div>
      </section>
    </div>
  );
}

export default OurTrainingProgram;
