import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Venues.css";

import venueImage from "../assets/images/venue-image.webp";

const API_URL = "import.meta.env.VITE_API_URL/api/venues";

function Venues() {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef(null);

  /* =====================================
     FETCH VENUES
  ===================================== */

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();

        if (data.success) {
          setVenues(data.venues || []);
        }
      } catch (error) {
        console.error(
          "Fetch venues error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  /* =====================================
     SCROLL REVEAL ANIMATION
  ===================================== */

  useEffect(() => {
    const container = pageRef.current;

    if (!container) {
      return;
    }

    const revealElements =
      container.querySelectorAll(
        ".venue-reveal"
      );

    if (!revealElements.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "venue-reveal-active"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px",
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [venues, loading]);

  /* =====================================
     IMAGE URL
  ===================================== */

  const getImageUrl = (fileId) => {
    if (!fileId) {
      return "";
    }

    return `${API_URL}/image/${fileId}`;
  };

  return (
    <div
      className="venues-page"
      ref={pageRef}
    >
      {/* =====================================
          VENUES HEADER
      ===================================== */}

      <section className="venues-header venue-reveal">
        <div className="venues-header-inner">

          <div className="venues-title-badge">
            <span>
              OUR VENUES
            </span>
          </div>

          <h1>
            KHEL AUR SHIKSHA FOUNDATION VENUES
          </h1>

        </div>
      </section>

      {/* =====================================
          DYNAMIC VENUES
      ===================================== */}

      <section className="venues-section">
        <div className="venues-wrapper">

          {loading ? (
            <div className="venues-loading">
              Loading venues...
            </div>
          ) : venues.length === 0 ? (
            <div className="venues-loading">
              No venues available.
            </div>
          ) : (
            venues.map((venue, index) => (
              <article
                className="venue-item venue-reveal"
                key={venue._id}
                style={{
                  "--venue-delay": `${index * 120}ms`,
                }}
              >

                {/* =================================
                    VENUE IMAGE
                ================================= */}

                <div className="venue-image-box">

                  {venue.image?.fileId ? (
                    <img
                      src={getImageUrl(
                        venue.image.fileId
                      )}
                      alt={
                        venue.name ||
                        "KAS Foundation Venue"
                      }
                    />
                  ) : null}

                </div>

                {/* =================================
                    VENUE INFORMATION
                ================================= */}

                <div className="venue-info">

                  <span className="venue-info-label">
                    {venue.label ||
                      "VENUES"}
                  </span>

                  <div className="venue-info-content">

                    <h2>
                      {venue.name}
                    </h2>

                    <p>
                      {venue.description}
                    </p>

                  </div>

                </div>

              </article>
            ))
          )}

        </div>
      </section>

      {/* =====================================
          TRAIN WHERE CHAMPIONS ARE MADE
          STATIC SECTION
      ===================================== */}

      <section className="venue-training venue-reveal">

        <div className="venue-training-content">

          {/* LEFT */}

          <div className="venue-training-left">

            <h2>
              TRAIN WHERE CHAMPIONS ARE
              <br />
              MADE
            </h2>

            <p>
              Our world-class venues provide
              the perfect environment for{" "}
              <strong>
                one-on-one football lessons.
              </strong>{" "}
              With top-quality fields and
              modern facilities, you’ll get
              personalized coaching designed
              to sharpen your technique,
              fitness, and game strategy.
              Each session is conducted in a
              focused setting, giving you the
              space and guidance to reach your
              peak performance.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/contact")
              }
            >
              BOOK A TRIAL
            </button>

          </div>

          {/* RIGHT */}

          <div className="venue-training-right">

            <div className="venue-training-star">

              <div className="venue-player-placeholder">

                <img
                  src={venueImage}
                  alt="Football player"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Venues;