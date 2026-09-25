import { useEffect, useMemo, useState } from "react";

import {
  Trophy,
  MapPin,
  Award,
} from "lucide-react";

import JoinCommunity from "../components/JoinCommunity";

import "./achievements.css";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/achievements`;

const LEVEL_ORDER = [
  "Local",
  "City",
  "District",
  "State",
  "National",
  "International",
];

const LEVEL_FLAGS = {
  Local: "📍",
  City: "🏙️",
  District: "🏘️",
  State: "🇮🇳",
  National: "🇮🇳",
  International: "🌍",
};

function formatLocation(item) {
  const location = [
    item.city,
    item.district,
    item.state,
    item.country,
  ].filter(Boolean);

  return location.join(", ");
}

function Achievements() {
  const [achievements, setAchievements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     SEO
  ===================================================== */

  useEffect(() => {
    const siteName =
      "Khel Aur Shiksha Foundation";

    const title =
      "Our Achievements | Khel Aur Shiksha Foundation";

    const description =
      "Explore the achievements, milestones, awards and football journeys of players and teams associated with Khel Aur Shiksha Foundation at local, city, district, state, national and international levels.";

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

      element.setAttribute(
        "content",
        content
      );
    };

    const setPropertyMeta = (
      property,
      content
    ) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(
          "property",
          property
        );
        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        content
      );
    };

    /* Basic SEO */

    setMeta(
      "description",
      description
    );

    setMeta(
      "keywords",
      keywords
    );

    setMeta(
      "author",
      siteName
    );

    setMeta(
      "robots",
      "index, follow"
    );

    /* Open Graph */

    setPropertyMeta(
      "og:title",
      title
    );

    setPropertyMeta(
      "og:description",
      description
    );

    setPropertyMeta(
      "og:type",
      "website"
    );

    setPropertyMeta(
      "og:url",
      `${window.location.origin}/achievements`
    );

    setPropertyMeta(
      "og:site_name",
      siteName
    );

    setPropertyMeta(
      "og:image",
      `${window.location.origin}/logo.png`
    );

    /* Twitter */

    setMeta(
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "twitter:title",
      title
    );

    setMeta(
      "twitter:description",
      description
    );

    setMeta(
      "twitter:image",
      `${window.location.origin}/logo.png`
    );

    /* Canonical */

    const canonicalURL =
      `${window.location.origin}/achievements`;

    let canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonical) {
      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonical
      );
    }

    canonical.setAttribute(
      "href",
      canonicalURL
    );

    /* JSON-LD Structured Data */

    const structuredData = {
      "@context":
        "https://schema.org",

      "@type":
        "CollectionPage",

      name: title,

      description:
        description,

      url:
        canonicalURL,

      publisher: {
        "@type":
          "Organization",

        name:
          siteName,
      },
    };

    let script =
      document.getElementById(
        "achievements-schema"
      );

    if (!script) {
      script =
        document.createElement(
          "script"
        );

      script.id =
        "achievements-schema";

      script.type =
        "application/ld+json";

      document.head.appendChild(
        script
      );
    }

    script.textContent =
      JSON.stringify(
        structuredData
      );

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
     PAGE SETUP + FETCH ACHIEVEMENTS
  ===================================================== */

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAchievements =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await fetch(API_URL);

          const data =
            await response.json();

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

  const featuredAchievements =
    useMemo(() => {
      return achievements.filter(
        (item) => item.isFeatured
      );
    }, [achievements]);

  const normalAchievements =
    useMemo(() => {
      return achievements.filter(
        (item) => !item.isFeatured
      );
    }, [achievements]);

  const groupedAchievements =
    useMemo(() => {
      const groups = {};

      normalAchievements.forEach(
        (item) => {
          const key =
            item.sectionTitle?.trim() ||
            item.level ||
            "Other Achievements";

          if (!groups[key]) {
            groups[key] = {
              title: key,

              label:
                item.sectionLabel ||
                `${item.level || "LOCAL"} ACHIEVEMENTS`,

              description:
                item.sectionDescription ||
                "",

              level:
                item.level ||
                "Local",

              items: [],
            };
          }

          groups[key].items.push(
            item
          );
        }
      );

      return Object.values(
        groups
      ).sort((a, b) => {
        const levelA =
          LEVEL_ORDER.indexOf(
            a.level
          );

        const levelB =
          LEVEL_ORDER.indexOf(
            b.level
          );

        if (
          levelA !== -1 &&
          levelB !== -1 &&
          levelA !== levelB
        ) {
          return levelA - levelB;
        }

        return 0;
      });
    }, [normalAchievements]);

  const getImageURL = (item) => {
    if (!item.image?.fileId) {
      return null;
    }

    return `${API_URL}/image/${item.image.fileId}`;
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
            players and teams at local, city,
            district, state, national, and
            international levels.
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
                Our achievement journey is
                growing.
              </h2>

              <p>
                New achievements will be
                published here as our teams and
                players continue to compete.
              </p>

            </div>

          </section>
        )}


      {/* =========================================
          FEATURED ACHIEVEMENTS
      ========================================= */}

      {!loading &&
        !error &&
        featuredAchievements.length >
          0 && (
          <section className="achievement-feature-section">

            <div className="achievement-feature-wrapper">

              <div className="achievement-feature-image">

                {getImageURL(
                  featuredAchievements[0]
                ) ? (
                  <img
                    src={getImageURL(
                      featuredAchievements[0]
                    )}
                    alt={
                      featuredAchievements[0]
                        .title
                    }
                  />
                ) : (
                  <div className="achievement-image-placeholder"></div>
                )}

                <div className="achievement-feature-badge">

                  <Trophy size={20} />

                  <span>
                    FEATURED ACHIEVEMENT
                  </span>

                </div>

              </div>


              <div className="achievement-feature-content">

                <div className="achievement-section-label">

                  <span className="achievement-label-line"></span>

                  {featuredAchievements[0]
                    .sectionLabel ||
                    "FEATURED ACHIEVEMENT"}

                </div>


                <div className="achievement-country">

                  <span className="country-flag">
                    {
                      LEVEL_FLAGS[
                        featuredAchievements[0]
                          .level
                      ]
                    }
                  </span>

                  <span>
                    {(
                      featuredAchievements[0]
                        .level ||
                      "LOCAL"
                    ).toUpperCase()}
                  </span>

                </div>


                <h2>
                  {
                    featuredAchievements[0]
                      .sectionTitle ||
                    featuredAchievements[0]
                      .title
                  }
                </h2>


                <div className="achievement-blue-line"></div>


                {featuredAchievements[0]
                  .sectionDescription && (
                  <p>
                    {
                      featuredAchievements[0]
                        .sectionDescription
                    }
                  </p>
                )}


                <div className="achievement-player-list">

                  {featuredAchievements.map(
                    (item, index) => (
                      <div
                        className="achievement-player"
                        key={item._id}
                        style={{
                          "--player-delay": `${
                            index * 0.08
                          }s`,
                        }}
                      >

                        <h3>
                          {item.playerName ||
                            item.teamName ||
                            item.title}
                        </h3>

                        <p>

                          {item.result && (
                            <>
                              <strong>
                                {item.result}
                              </strong>

                              {" • "}
                            </>
                          )}

                          {item.description ||
                            item.competition ||
                            ""}

                        </p>


                        {formatLocation(
                          item
                        ) && (
                          <small>

                            <MapPin
                              size={13}
                            />

                            {formatLocation(
                              item
                            )}

                          </small>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </section>
        )}


      {/* =========================================
          DYNAMIC ACHIEVEMENT SECTIONS
      ========================================= */}

      {!loading &&
        !error &&
        groupedAchievements.map(
          (group, groupIndex) => (
            <section
              className="achievement-cards-section"
              key={group.title}
            >

              <div className="achievement-section-heading">

                <span>
                  {group.label}
                </span>

                <h2>
                  {group.title}
                </h2>

                {group.description && (
                  <p>
                    {group.description}
                  </p>
                )}

              </div>


              <div className="achievement-two-grid">

                {group.items.map(
                  (item, index) => {
                    const imageURL =
                      getImageURL(item);

                    return (
                      <article
                        className="achievement-large-card"
                        key={item._id}
                        style={{
                          "--achievement-delay": `${
                            index * 0.15
                          }s`,
                        }}
                      >

                        <div className="achievement-large-image">

                          {imageURL ? (
                            <img
                              src={imageURL}
                              alt={item.title}
                            />
                          ) : (
                            <div className="achievement-image-placeholder"></div>
                          )}

                          <div className="achievement-card-shine"></div>

                        </div>


                        <div className="achievement-large-info">

                          <div className="achievement-card-meta">

                            <span>
                              {LEVEL_FLAGS[
                                item.level
                              ]}{" "}
                              {(
                                item.level ||
                                "LOCAL"
                              ).toUpperCase()}
                            </span>

                            {item.year && (
                              <span>
                                {item.year}
                              </span>
                            )}

                          </div>


                          <h3>
                            {item.title}
                          </h3>


                          {item.competition && (
                            <p>
                              <strong>
                                {item.competition}
                              </strong>
                            </p>
                          )}


                          {item.result && (
                            <p>
                              {item.result}
                            </p>
                          )}


                          {item.description && (
                            <p>
                              {item.description}
                            </p>
                          )}


                          {formatLocation(
                            item
                          ) && (
                            <div className="achievement-location">

                              <MapPin
                                size={15}
                              />

                              <span>
                                {formatLocation(
                                  item
                                )}
                              </span>

                            </div>
                          )}


                          {item.playerName && (
                            <div className="achievement-person">

                              <Award
                                size={16}
                              />

                              <span>
                                {item.playerName}
                              </span>

                            </div>
                          )}


                          {item.teamName &&
                            !item.playerName && (
                              <div className="achievement-person">

                                <Trophy
                                  size={16}
                                />

                                <span>
                                  {item.teamName}
                                </span>

                              </div>
                            )}

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            </section>
          )
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