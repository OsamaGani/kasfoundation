import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./News.css";

const API_URL = "http://localhost:5000/api/news";

function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch news."
          );
        }

        setNewsArticles(data.news || []);
      } catch (err) {
        console.error("News fetch error:", err);

        setError(
          err.message ||
            "Unable to load news articles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />

      <main className="news-page">
        {/* =========================================
            HEADER
        ========================================= */}
        <section className="news-header">
          <div className="news-header-line"></div>

          <h1>THE GRASSROOTS FOUNDATION NEWS</h1>

          <p>
            Discover the latest stories, achievements, community activities,
            football development programs, and journeys from The Grassroots
            Foundation.
          </p>
        </section>

        {/* =========================================
            NEWS CARDS
        ========================================= */}
        <section className="news-section">
          <div className="news-grid">

            {loading ? (
              <div className="news-loading">
                Loading news...
              </div>
            ) : error ? (
              <div className="news-error">
                {error}
              </div>
            ) : newsArticles.length === 0 ? (
              <div className="news-empty">
                No news articles available.
              </div>
            ) : (
              newsArticles.map((article, index) => (
                <article
                  className="news-card"
                  key={article._id}
                  style={{
                    "--news-delay": `${index * 0.08}s`,
                  }}
                >
                  {/* =========================================
                      LEFT HALF - IMAGE
                  ========================================= */}
                  <Link
                    to={`/news/${article.slug}/`}
                    className="news-image-link"
                  >
                    <div className="news-image-wrapper">

                      {article.image?.fileId ? (
                        <img
                          src={`${API_URL}/image/${article.image.fileId}`}
                          alt={article.title}
                          className="news-image"
                        />
                      ) : (
                        <div className="news-image-placeholder"></div>
                      )}

                      <div className="news-image-overlay">
                        <span>READ ARTICLE</span>
                        <ArrowRight size={19} />
                      </div>
                    </div>
                  </Link>

                  {/* =========================================
                      RIGHT HALF - CONTENT
                  ========================================= */}
                  <div className="news-content">
                    <span className="news-date">
                      {article.date}
                    </span>

                    <div className="news-content-middle">
                      <h2>{article.title}</h2>

                      <p className="news-card-description">
                        {article.shortDescription}
                      </p>
                    </div>

                    <Link
                      to={`/news/${article.slug}/`}
                      className="news-read-more"
                    >
                      <span>READ MORE</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))
            )}

          </div>
        </section>

        <JoinCommunity />
      </main>
    </>
  );
}

export default News;