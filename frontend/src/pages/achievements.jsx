import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

import JoinCommunity from "../components/JoinCommunity";

import "./achievements.css";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/achievements`;

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     SEO
  ===================================================== */

  useEffect(() => {
    const siteName =
      "Khel Aur Shiksha Foundation";

    const title =
      "Our Achievements | Khel Aur Shiksha Foundation";

    const description =
      "Explore the achievements, milestones, awards and football journeys of players and teams associated with Khel Aur Shiksha Foundation.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation achievements, Khel Aur Shiksha Foundation awards, Khel Aur Shiksha Foundation football achievements, Khel Aur Shiksha Foundation players, Khel Aur Shiksha Foundation teams, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation milestones";

    document.title = title;

    const setMeta = (name, content) => {
      let element = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setPropertyMeta = (property, content) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    /* Basic SEO */

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", siteName);
    setMeta("robots", "index, follow");

    /* Open Graph */

    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:type", "website");

    setPropertyMeta(
      "og:url",
      `${window.location.origin}/achievements`
    );

    setPropertyMeta("og:site_name", siteName);

    setPropertyMeta(
      "og:image",
      `${window.location.origin}/logo.png`
    );

    /* Twitter */

    setMeta(
      "twitter:card",
      "summary_large_image"
    );

    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    setMeta(
      "twitter:image",
      `${window.location.origin}/logo.png`
    );

    /* Canonical */

    const canonicalURL =
      `${window.location.origin}/achievements`;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      canonicalURL
    );

    /* JSON-LD */

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description: description,
      url: canonicalURL,
      publisher: {
        "@type": "Organization",
        name: siteName,
      },
    };

    let script = document.getElementById(
      "achievements-schema"
    );

    if (!script) {
      script = document.createElement("script");
      script.id = "achievements-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent =
      JSON.stringify(structuredData);

    return () => {
      const schemaScript =
        document.getElementById(
          "achievements-schema"
        );

      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  /* =====================================================
     FETCH ACHIEVEMENTS
  ===================================================== */

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAchievements = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch achievements."
          );
        }

        setAchievements(
          data.achievements || []
        );
      } catch (err) {
        console.error(
          "Achievements fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load achievements."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageURL = (item) => {
    if (!item.image?.fileId) {
      return null;
    }

    return `${API_URL}/image/${item.image.fileId}`;
  };

  /* =====================================================
     ACHIEVEMENT ICON
  ===================================================== */

  const getAchievementIcon = (type) => {
    if (!type) {
      return "🏆";
    }

    const value = type.toLowerCase();

    if (
      value.includes("runner") ||
      value.includes("second")
    ) {
      return "🥈";
    }

    if (
      value.includes("third") ||
      value.includes("third place")
    ) {
      return "🥉";
    }

    if (
      value.includes("best player") ||
      value.includes("individual")
    ) {
      return "🏅";
    }

    if (
      value.includes("goalkeeper")
    ) {
      return "🧤";
    }

    if (
      value.includes("top scorer")
    ) {
      return "⚽";
    }

    if (
      value.includes("selection")
    ) {
      return "⭐";
    }

    return "🏆";
  };

  return (
    <main className="achievements-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="achievements-hero">

        <div className="achievements-hero-content">

          <span
            className="achievements-hero-trophy"
            aria-label="Achievements"
            title="Achievements"
          >
            <Trophy
              size={38}
              strokeWidth={2}
            />
          </span>

          <h1>
            OUR ACHIEVEMENTS
          </h1>

          <p>
            Celebrating the achievements,
            milestones, and football journeys
            of Khel Aur Shiksha Foundation
            players and teams.
          </p>

        </div>

      </section>

      {/* =========================================
          LOADING
      ========================================= */}

      {loading && (
        <section className="achievement-cards-section">

          <div className="achievement-section-heading">

            <span>
              ACHIEVEMENTS
            </span>

            <h2>
              Loading achievements...
            </h2>

          </div>

        </section>
      )}

      {/* =========================================
          ERROR
      ========================================= */}

      {!loading && error && (
        <section className="achievement-cards-section">

          <div className="achievement-section-heading">

            <span>
              ACHIEVEMENTS
            </span>

            <h2>
              Unable to load achievements
            </h2>

            <p>
              {error}
            </p>

          </div>

        </section>
      )}

      {/* =========================================
          EMPTY
      ========================================= */}

      {!loading &&
        !error &&
        achievements.length === 0 && (
          <section className="achievement-cards-section">

            <div className="achievement-section-heading">

              <span>
                ACHIEVEMENTS
              </span>

              <h2>
                Our achievement journey is growing.
              </h2>

              <p>
                New achievements will be published
                here as our teams and players
                continue to compete.
              </p>

            </div>

          </section>
        )}

      {/* =========================================
          ACHIEVEMENTS
      ========================================= */}

      {!loading &&
        !error &&
        achievements.length > 0 && (
          <section className="achievement-cards-section">

            <div className="achievement-simple-grid">

              {achievements.map(
                (item, index) => {

                  const imageURL =
                    getImageURL(item);

                  const participant =
                    item.playerName ||
                    item.teamName ||
                    "";

                  return (
                    <article
                      className="achievement-simple-card"
                      key={item._id}
                      style={{
                        "--achievement-delay":
                          `${index * 0.08}s`,
                      }}
                    >

                      {/* PHOTO */}

                      <div className="achievement-simple-image">

                        {imageURL ? (
                          <img
                            src={imageURL}
                            alt={
                              item.title ||
                              item.competition ||
                              "Achievement"
                            }
                          />
                        ) : (
                          <div className="achievement-simple-placeholder">
                            <Trophy
                              size={42}
                              strokeWidth={1.5}
                            />
                          </div>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="achievement-simple-info">

                        {/* ACHIEVEMENT TYPE */}

                        <div className="achievement-simple-type">

                          <span>
                            {getAchievementIcon(
                              item.achievementType
                            )}
                          </span>

                          <span>
                            {item.achievementType ||
                              "Achievement"}
                          </span>

                        </div>

                        {/* COMPETITION */}

                        <h3>
                          {item.competition ||
                            item.title ||
                            "Achievement"}
                        </h3>

                        {/* TEAM / PLAYER */}

                        {participant && (
                          <div className="achievement-simple-participant">
                            {participant}
                          </div>
                        )}

                        {/* YEAR */}

                        {item.year && (
                          <div className="achievement-simple-year">
                            {item.year}
                          </div>
                        )}

                        {/* SHORT DESCRIPTION */}

                        {item.description && (
                          <p>
                            {item.description}
                          </p>
                        )}

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          </section>
        )}

      {/* =========================================
          BOTTOM BANNER
      ========================================= */}

      <section className="achievement-bottom-banner">

        <div className="achievement-bottom-content">

          <span>
            EVERY MATCH MATTERS
          </span>

          <h2>
            BUILDING FUTURES THROUGH
            FOOTBALL
          </h2>

          <p>
            MORE DREAMS. MORE OPPORTUNITIES.
          </p>

        </div>

      </section>

      <JoinCommunity />

    </main>
  );
}

export default Achievements;