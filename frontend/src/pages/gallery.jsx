import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Loader2 } from "lucide-react";

import JoinCommunity from "../components/JoinCommunity";

import "./gallery.css";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api`;

function Gallery() {
  const [galleryCards, setGalleryCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     SEO
  ===================================================== */

  useEffect(() => {
    const siteName =
      "Khel Aur Shiksha Foundation";

    const title =
      "Gallery | Khel Aur Shiksha Foundation";

    const description =
      "Explore the football gallery of Khel Aur Shiksha Foundation featuring training sessions, football events, community activities, players, teams and memorable moments.";

    const keywords =
      "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation gallery, Khel Aur Shiksha Foundation photos, Khel Aur Shiksha Foundation football gallery, Khel Aur Shiksha Foundation football photos, Khel Aur Shiksha Foundation training, Khel Aur Shiksha Foundation events, Khel Aur Shiksha Foundation players, Khel Aur Shiksha Foundation teams";

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
      `${window.location.origin}/gallery`
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
      `${window.location.origin}/gallery`;

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
        "gallery-schema"
      );

    if (!script) {
      script =
        document.createElement(
          "script"
        );

      script.id =
        "gallery-schema";

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
          "gallery-schema"
        );

      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  /* =====================================================
     FETCH GALLERY
  ===================================================== */

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/gallery`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch gallery."
          );
        }

        setGalleryCards(
          data.gallery || []
        );
      } catch (err) {
        console.error(
          "Gallery fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load gallery. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const getImageURL = (fileId) => {
    if (!fileId) {
      return "";
    }

    return `${API_URL}/gallery/image/${fileId}`;
  };

  return (
    <main className="gallery-page">

      {/* =========================================
          GALLERY HERO
      ========================================= */}

      <section className="gallery-hero">

        <div className="gallery-hero-content">

          <div className="gallery-badge">
            GALLERY
          </div>

          <h1>
            KHEL AUR SHIKSHA FOUNDATION
          </h1>

        </div>

      </section>


      {/* =========================================
          GALLERY SECTION
      ========================================= */}

      <section className="gallery-section">

        {/* LOADING */}

        {loading && (
          <div className="gallery-status">

            <Loader2
              size={38}
              className="gallery-loading-icon"
            />

            <p>
              Loading galleries...
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="gallery-status gallery-error">

            <div className="gallery-status-icon">
              <ImageIcon size={34} />
            </div>

            <h3>
              Unable to Load Gallery
            </h3>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          galleryCards.length === 0 && (
            <div className="gallery-status">

              <div className="gallery-status-icon">
                <ImageIcon size={34} />
              </div>

              <h3>
                No Gallery Available
              </h3>

              <p>
                Gallery photos will be available
                here soon.
              </p>

            </div>
          )}


        {/* GALLERY CARDS */}

        {!loading &&
          !error &&
          galleryCards.length > 0 && (
            <div className="gallery-grid">

              {galleryCards.map(
                (card, index) => {

                  const imageURL =
                    getImageURL(
                      card.coverImage?.fileId
                    );

                  return (
                    <Link
                      to={`/gallery/${card.slug}`}
                      className="gallery-card"
                      key={card._id}
                      style={{
                        "--gallery-delay":
                          `${index * 0.12}s`,
                      }}
                    >

                      {/* IMAGE */}

                      <div className="gallery-image-wrapper">

                        {imageURL ? (
                          <img
                            src={imageURL}
                            alt={`${card.title} Gallery`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="gallery-image-placeholder">

                            <ImageIcon
                              size={45}
                            />

                            <span>
                              No Cover Image
                            </span>

                          </div>
                        )}

                        <div className="gallery-image-overlay">

                          <span>
                            VIEW GALLERY
                          </span>

                        </div>

                      </div>


                      {/* TITLE */}

                      <div className="gallery-card-title">
                        {card.title}
                      </div>

                    </Link>
                  );
                }
              )}

            </div>
          )}

      </section>


      {/* =========================================
          JOIN COMMUNITY
      ========================================= */}

      <JoinCommunity />

    </main>
  );
}

export default Gallery;