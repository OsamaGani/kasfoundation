
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
     SEO
  ===================================================== */

  useEffect(() => {
    const siteName = "Khel Aur Shiksha Foundation";

    const title =
      "Sports & Education Programs | Khel Aur Shiksha Foundation";

    const description =
      "Discover Khel Aur Shiksha Foundation's focus on sports, football, education and youth development, promoting teamwork, discipline, confidence and community growth.";

    const keywords =
      "Khel Aur Shiksha Foundation, KAS Foundation, Khel Aur Shiksha, sports and education foundation, football development, youth development, sports education, child development, community development, youth empowerment, sports programs, educational development, Balrampur Uttar Pradesh";

    const currentUrl = window.location.href;

    const siteUrl = window.location.origin;

    document.title = title;

    const setMeta = (
      attribute,
      name,
      content
    ) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");

        element.setAttribute(attribute, name);

        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        content
      );
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

    setMeta(
      "name",
      "description",
      description
    );

    setMeta(
      "name",
      "keywords",
      keywords
    );

    setMeta(
      "name",
      "author",
      siteName
    );

    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    setMeta(
      "property",
      "og:title",
      title
    );

    setMeta(
      "property",
      "og:description",
      description
    );

    setMeta(
      "property",
      "og:type",
      "website"
    );

    setMeta(
      "property",
      "og:url",
      currentUrl
    );

    setMeta(
      "property",
      "og:site_name",
      siteName
    );

    setMeta(
      "property",
      "og:image",
      `${siteUrl}/logo.png`
    );

    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "name",
      "twitter:title",
      title
    );

    setMeta(
      "name",
      "twitter:description",
      description
    );

    setMeta(
      "name",
      "twitter:image",
      `${siteUrl}/logo.png`
    );

    setLink(
      "canonical",
      currentUrl
    );

    const existingSchema =
      document.head.querySelector(
        'script[data-seo="training-program"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: currentUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
      about: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
    };

    const schemaScript =
      document.createElement("script");

    schemaScript.type =
      "application/ld+json";

    schemaScript.setAttribute(
      "data-seo",
      "training-program"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="training-program"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
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
            entry.target.classList.add(
              "training-section-visible"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
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
    if (
      element &&
      !sectionsRef.current.includes(element)
    ) {
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
          <h1>SPORTS & EDUCATION PROGRAMS</h1>
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
              alt="Khel Aur Shiksha Foundation sports and education initiatives"
            />
          </div>

          <div className="training-text-content">

            <h2>
              KHEL AUR SHIKSHA FOUNDATION SPORTS DEVELOPMENT PROGRAM
            </h2>

            <p>
              Khel Aur Shiksha Foundation believes in the
              importance of sports, education and personal
              development for young people. We aim to promote
              opportunities that encourage children and youth
              to learn, grow, develop their abilities and work
              towards a brighter future. Sports can help young
              people build discipline, teamwork, confidence
              and a positive attitude.
            </p>

            <p>
              Our focus on sports and education reflects the
              belief that learning goes beyond the classroom
              and the playing field. By encouraging personal
              growth, cooperation and respect, Khel Aur Shiksha
              Foundation seeks to support young people in
              developing valuable life skills and becoming
              responsible members of their communities.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          SPORTS DEVELOPMENT
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-content-section"
      >
        <div className="training-content-container training-reverse">

          <div className="training-text-content">

            <h2>FOOTBALL & SPORTS DEVELOPMENT</h2>

            <p>
              Football and other sports can play an important
              role in physical fitness, teamwork and personal
              development. Through sports, young people can
              learn to set goals, practise consistently,
              cooperate with others and develop confidence.
              Khel Aur Shiksha Foundation recognises the
              positive role that sports can play in helping
              young people discover their potential.
            </p>

            <p>
              Participation in sports can also encourage
              discipline, perseverance, leadership and respect
              for others. These values can support young
              people both on and off the field and help them
              develop a positive approach to challenges,
              teamwork and personal growth.
            </p>

          </div>

          <div className="training-image-wrapper">
            <img
              src={trainingImage}
              alt="Football and sports development for young people"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          EDUCATION & LEARNING
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-content-section"
      >
        <div className="training-content-container">

          <div className="training-image-wrapper">
            <img
              src={trainingImage}
              alt="Education and learning opportunities for young people"
            />
          </div>

          <div className="training-text-content">

            <h2>EDUCATION & LEARNING</h2>

            <p>
              Education helps children and young people
              develop knowledge, practical skills and
              confidence. Khel Aur Shiksha Foundation
              recognises the importance of learning in
              creating opportunities for personal growth
              and a better future. Education and sports
              can complement each other by encouraging
              focus, responsibility and consistent effort.
            </p>

            <p>
              We believe that a positive attitude towards
              learning can help young people explore their
              interests, strengthen their abilities and
              work towards their goals. Promoting the value
              of education is an important part of
              encouraging well-rounded personal development.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          YOUTH EMPOWERMENT
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-content-section"
      >
        <div className="training-content-container training-reverse">

          <div className="training-text-content">

            <h2>YOUTH EMPOWERMENT & PERSONAL DEVELOPMENT</h2>

            <p>
              Young people need encouragement and opportunities
              to explore their abilities, build confidence and
              develop a sense of responsibility. Khel Aur
              Shiksha Foundation promotes the importance of
              teamwork, dedication, respect and positive
              thinking in the development of young people.
            </p>

            <p>
              Sports and education can help young people
              develop communication, leadership and
              problem-solving skills. We believe that
              encouraging these values can help them make
              positive choices, face challenges and
              contribute constructively to their families
              and communities.
            </p>

          </div>

          <div className="training-image-wrapper">
            <img
              src={programImage}
              alt="Youth empowerment and personal development"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          COMMUNITY DEVELOPMENT
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-content-section"
      >
        <div className="training-content-container">

          <div className="training-image-wrapper">
            <img
              src={programImage}
              alt="Community development through sports and education"
            />
          </div>

          <div className="training-text-content">

            <h2>COMMUNITY DEVELOPMENT</h2>

            <p>
              Supportive communities can help children and
              young people access opportunities to learn,
              participate and grow. Khel Aur Shiksha
              Foundation recognises the value of cooperation,
              inclusion and shared responsibility in
              supporting positive community development.
            </p>

            <p>
              Families, educators, volunteers and community
              members can all play an important role in
              encouraging young people. By promoting sports,
              education and positive values, we aim to
              highlight the importance of creating a
              supportive environment for the next generation.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          MORE THAN SPORTS
      ===================================================== */}

      <section
        ref={addSectionRef}
        className="training-more-section"
      >
        <div className="training-more-container">

          <h2>MORE THAN SPORTS</h2>

          <p>
            Khel Aur Shiksha Foundation believes that the
            value of sports extends beyond winning games.
            Sports can encourage discipline, teamwork,
            leadership, friendship and confidence. These
            lessons can help young people develop a positive
            attitude and work towards their goals.
          </p>

          <p>
            Education provides knowledge and opens doors
            to new possibilities. By highlighting the
            importance of sports, education and personal
            development, Khel Aur Shiksha Foundation aims
            to encourage young people to recognise their
            potential and contribute positively to society.
          </p>

        </div>
      </section>

    </div>
  );
}

export default OurTrainingProgram;
