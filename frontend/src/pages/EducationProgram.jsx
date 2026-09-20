import { useEffect, useRef } from "react";
import "./EducationProgram.css";

function EducationProgram() {
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
            entry.target.classList.add("education-section-visible");
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
    <div className="education-page">
      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section className="education-page-hero">
        <div className="education-page-hero-content">
          <h1>EDUCATION PROGRAM</h1>
        </div>
      </section>

      {/* =====================================================
          HAMMAD KHALID
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="education-content-section education-intro-section"
      >
        <div className="education-content-container">
          <div className="education-video-wrapper">
            <video
              className="education-video"
              controls
              playsInline
              preload="metadata"
            >
              <source
                src="/assets/videos/education-hammad.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="education-text-content">
            <h2>FROM PAKPATTAN TO LAHORE: HAMMAD KHALID’S JOURNEY WITH TGF</h2>

            <p>
              Hammad Khalid from Pakpattan appeared in the TGF trials held in
              Tandlianwala, Faisalabad, and was selected for the program. As a
              talented goalkeeper, he is now receiving professional training at
              the Lahore Center of The Grassroots Foundation.
            </p>

            <p>
              Hammad also wanted to continue his education alongside football.
              Understanding the importance of academics, TGF helped secure his
              admission to Crescent School Lahore so he could continue his
              studies without any obstacles. From books to bags, school support
              to football training, everything is being facilitated by TGF.
            </p>

            <p>
              This shows that TGF is not only about football, it is about
              building futures beyond the game. The Grassroots Foundation
              believes in empowering young players both on and off the field.
              Even if a player may not continue professionally in football due
              to family or life circumstances, they can still grow into
              impactful, educated, and responsible individuals.
            </p>

            <p>
              That is what the Grassroots Foundation is truly all about:
              creating opportunities, shaping character, and building a better
              future for every child.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WALEED KHALID
      ===================================================== */}

      <section ref={addSectionRef} className="education-content-section">
        <div className="education-content-container education-reverse">
          <div className="education-text-content">
            <h2>BUILDING FUTURES BEYOND FOOTBALL – WALEED KHALID’S STORY</h2>

            <p>
              The Grassroots Foundation discovered talented player Waleed Khalid
              from Tandilyawala through trials conducted by TGF. After being
              selected, he moved to Lahore, where he is now receiving
              professional football training at the TGF Lahore center.
            </p>

            <p>
              But TGF is not just a football development program; it is a
              platform that changes lives beyond the game. Understanding the
              importance of education alongside sports, TGF ensured Waleed’s
              admission to Crescent School so he could continue his studies
              while pursuing his football dream.
            </p>

            <p>
              From school admission and educational support to accommodation,
              food, and mess and living expenses, everything is 100% funded by
              TGF. By providing young athletes with education, professional
              training, and a secure environment, TGF is helping players like
              Waleed build a better future both on and off the field.
            </p>
          </div>

          <div className="education-video-wrapper">
            <video
              className="education-video"
              controls
              playsInline
              preload="metadata"
            >
              <source
                src="/assets/videos/education-waleed.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION AND FOOTBALL
      ===================================================== */}

      <section ref={addSectionRef} className="education-more-section">
        <div className="education-more-container">
          <h2>EDUCATION GOES HAND IN HAND WITH FOOTBALL</h2>

          <p>
            At The Grassroots Foundation, football and education go hand in
            hand. The foundation believes that young athletes should have the
            opportunity to develop their football skills while also building a
            strong academic foundation for their future.
          </p>

          <p>
            Through educational support, school admissions, study materials,
            accommodation, and other essential facilities, TGF works to remove
            the barriers that can prevent talented young players from continuing
            their education.
          </p>

          <p>
            The goal is not only to create footballers, but to help young people
            become educated, confident, disciplined, and responsible individuals
            who can build successful futures both on and off the field.
          </p>
        </div>
      </section>
    </div>
  );
}

export default EducationProgram;
