import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Loader2 } from "lucide-react";

import JoinCommunity from "../components/JoinCommunity";

import "./gallery.css";

const API_URL = "http://localhost:5000/api";

function Gallery() {
  const [galleryCards, setGalleryCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            data.message || "Failed to fetch gallery."
          );
        }

        setGalleryCards(data.gallery || []);
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