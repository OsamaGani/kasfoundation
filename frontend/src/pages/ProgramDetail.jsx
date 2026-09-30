import { useEffect, useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import "./ProgramDetail.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/programs`;

function ProgramArticle() {
  const { slug } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProgram();
  }, [slug]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/slug/${slug}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Program not found."
        );
      }

      setProgram(data.program);
    } catch (err) {
      console.error(
        "Program article fetch error:",
        err
      );

      setError(
        err.message || "Unable to load program."
      );
    } finally {
      setLoading(false);
    }
  };

  const getImageURL = () => {
    if (!program?.image?.fileId) {
      return "";
    }

    return `${API_URL}/image/${program.image.fileId}`;
  };

  if (loading) {
    return (
      <main className="program-article-page">
        <div className="program-article-status">
          Loading program...
        </div>
      </main>
    );
  }

  if (error || !program) {
    return (
      <main className="program-article-page">
        <div className="program-article-status program-article-error">

          <Layers size={42} />

          <h2>
            Program Not Found
          </h2>

          <p>
            {error ||
              "The requested program could not be found."}
          </p>

          <Link
            to="/programs"
            className="program-article-back-button"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>

        </div>
      </main>
    );
  }

  const imageURL = getImageURL();

  return (
    <main className="program-article-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="program-article-hero">

        <div className="program-article-container">

          <Link
            to="/programs"
            className="program-article-back-link"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>

          {program.category && (
            <span className="program-article-category">
              {program.category}
            </span>
          )}

          <h1>
            {program.title}
          </h1>

          {program.shortDescription && (
            <p className="program-article-intro">
              {program.shortDescription}
            </p>
          )}

        </div>

      </section>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="program-article-section">

        <div className="program-article-container">

          {imageURL && (
            <div className="program-article-image">

              <img
                src={imageURL}
                alt={program.title}
              />

            </div>
          )}

          <article className="program-article-content">

            <h2>
              About This Program
            </h2>

            <div className="program-article-description">
              {program.description
                .split("\n")
                .map((paragraph, index) => (
                  paragraph.trim() ? (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ) : null
                ))}
            </div>

          </article>

          <div className="program-article-footer">

            <Link
              to="/programs"
              className="program-article-back-button"
            >
              <ArrowLeft size={17} />
              Back to All Programs
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProgramArticle;