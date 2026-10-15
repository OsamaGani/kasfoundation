
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
          <h1>EDUCATION & LEARNING PROGRAM</h1>
        </div>
      </section>

      {/* =====================================================
          EDUCATION AND YOUTH DEVELOPMENT
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
            <h2>EDUCATION: BUILDING A BRIGHTER FUTURE FOR EVERY CHILD</h2>

            <p>
              Khel Aur Shiksha Foundation believes that education
              plays an important role in helping children and young
              people develop their knowledge, skills and confidence.
              Learning can open new opportunities and help young
              people work towards their ambitions and build a
              brighter future.
            </p>

            <p>
              Education is important alongside sports and physical
              development. By encouraging young people to value
              learning, discipline, teamwork and personal growth,
              we aim to promote a balanced approach to education
              and life skills.
            </p>

            <p>
              Every child deserves encouragement to learn, explore
              their interests and develop their abilities.
              Khel Aur Shiksha Foundation supports the importance
              of creating positive learning environments where
              young people can grow with confidence and motivation.
            </p>

            <p>
              Our vision is to highlight the value of education
              in building knowledgeable, confident and responsible
              individuals who can contribute positively to their
              families and communities.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION AND PERSONAL GROWTH
      ===================================================== */}

      <section ref={addSectionRef} className="education-content-section">
        <div className="education-content-container education-reverse">
          <div className="education-text-content">
            <h2>LEARNING BEYOND THE CLASSROOM</h2>

            <p>
              Education involves more than academic lessons.
              It also helps young people develop communication,
              problem-solving, decision-making and interpersonal
              skills. These abilities can support their personal
              growth and prepare them to face everyday challenges.
            </p>

            <p>
              Khel Aur Shiksha Foundation recognises the importance
              of encouraging curiosity, creativity, discipline and
              a willingness to learn. Young people benefit when
              they are encouraged to ask questions, explore ideas
              and work towards their goals.
            </p>

            <p>
              By promoting the value of education and lifelong
              learning, we aim to encourage young people to
              recognise their potential and pursue opportunities
              for personal and academic development.
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
          <h2>EDUCATION GOES HAND IN HAND WITH SPORTS</h2>

          <p>
            At Khel Aur Shiksha Foundation, we believe that
            education and sports can complement each other.
            Sports can encourage teamwork, discipline and
            perseverance, while education helps young people
            develop knowledge, understanding and essential skills
            for their future.
          </p>

          <p>
            A balanced approach to learning and physical activity
            can help young people develop confidence, responsibility
            and a positive attitude. Encouraging both education
            and sports helps highlight the importance of
            well-rounded personal development.
          </p>

          <p>
            Our vision is to encourage young people to value
            learning, develop their abilities and work towards
            their goals. Education can help them explore future
            opportunities and become confident, informed and
            responsible members of society.
          </p>
        </div>
      </section>
    </div>
  );
}

export default EducationProgram;
