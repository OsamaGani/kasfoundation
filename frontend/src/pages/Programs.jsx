import { useEffect, useState } from "react";
import { ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";

import "./Programs.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/programs`;

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch programs."
        );
      }

      setPrograms(data.programs || []);
    } catch (err) {
      console.error("Programs fetch error:", err);

      setError(
        err.message || "Unable to load programs."
      );
    } finally {
      setLoading(false);
    }
  };

  const getImageURL = (program) => {
    if (!program.image?.fileId) {
      return "";
    }

    return `${API_URL}/image/${program.image.fileId}`;
  };

  return (
    <main className="programs-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="programs-hero">

        <div className="programs-hero-content">

          <span className="programs-eyebrow">
            OUR PROGRAMS
          </span>

          <h1>
            Building Opportunities
            <br />
            Through Action
          </h1>

          <p>
            Explore the programs and initiatives
            created to support sports, education
            and community development.
          </p>

        </div>

      </section>

      {/* =========================
          PROGRAMS SECTION
      ========================= */}

      <section className="programs-section">

        <div className="programs-container">

          <div className="programs-section-heading">

            <div>
              <span className="programs-section-label">
                WHAT WE DO
              </span>

              <h2>
                Our Programs
              </h2>
            </div>

            <p>
              Discover the initiatives and
              opportunities offered by the
              foundation.
            </p>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="programs-loading">
              Loading programs...
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="programs-error">
              {error}
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            programs.length === 0 && (
              <div className="programs-empty">

                <Layers size={42} />

                <h3>
                  Programs Coming Soon
                </h3>

                <p>
                  Our programs and initiatives
                  will be available here soon.
                </p>

              </div>
            )}

          {/* PROGRAM CARDS */}

          {!loading &&
            !error &&
            programs.length > 0 && (
              <div className="programs-grid">

                {programs.map((program) => {

                  const imageURL =
                    getImageURL(program);

                  return (
                    <article
                      className="program-card"
                      key={program._id}
                    >

                      {/* IMAGE */}

                      <div className="program-card-image">

                        {imageURL ? (
                          <img
                            src={imageURL}
                            alt={program.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="program-card-placeholder">
                            <Layers size={42} />
                          </div>
                        )}

                        {program.category && (
                          <span className="program-card-category">
                            {program.category}
                          </span>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="program-card-content">

                        <h3>
                          {program.title}
                        </h3>

                        <p>
                          {program.shortDescription}
                        </p>

                        <Link
                          to={`/programs/${program.slug}`}
                          className="program-card-link"
                        >
                          View Program
                          <ArrowRight size={17} />
                        </Link>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

        </div>

      </section>

    </main>
  );
}

export default Programs;