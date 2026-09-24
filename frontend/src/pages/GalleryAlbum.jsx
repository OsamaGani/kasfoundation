import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./GalleryAlbum.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function GalleryAlbum() {
  const { slug } = useParams();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/gallery/slug/${slug}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load gallery."
          );
        }

        setGallery(data.gallery);
      } catch (err) {
        console.error(
          "Gallery album error:",
          err
        );

        setError(
          err.message ||
            "Unable to load this gallery."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGallery();
    }
  }, [slug]);

  const getImageURL = (fileId) => {
    if (!fileId) {
      return "";
    }

    return `${API_URL}/gallery/image/${fileId}`;
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="gallery-album-page">

          <section className="gallery-album-loading">

            <Loader2
              size={42}
              className="gallery-album-spinner"
            />

            <p>
              Loading gallery...
            </p>

          </section>

          <JoinCommunity />

        </main>
      </>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error || !gallery) {
    return (
      <>
        <Navbar />

        <main className="gallery-album-page">

          <section className="gallery-album-error">

            <div className="gallery-album-error-icon">
              <ImageIcon size={42} />
            </div>

            <h1>
              Gallery Not Found
            </h1>

            <p>
              {error ||
                "The requested gallery could not be found."}
            </p>

            <Link
              to="/gallery"
              className="gallery-album-back-button"
            >
              <ArrowLeft size={18} />
              Back to Gallery
            </Link>

          </section>

          <JoinCommunity />

        </main>
      </>
    );
  }

  const photos = gallery.photos || [];

  return (
    <>
      <Navbar />

      <main className="gallery-album-page">

        {/* =========================================
            GALLERY CONTENT
            HERO REMOVED
        ========================================= */}

        <section className="gallery-album-section">

          <div className="gallery-album-heading">

            <div>

              <span className="gallery-album-eyebrow">
                PHOTO GALLERY
              </span>

              <h2>
                {gallery.title}
              </h2>

            </div>

            <div className="gallery-album-count">

              <ImageIcon size={18} />

              <span>
                {photos.length}{" "}
                {photos.length === 1
                  ? "Photo"
                  : "Photos"}
              </span>

            </div>

          </div>


          {/* =========================================
              PHOTOS
          ========================================= */}

          {photos.length === 0 ? (
            <div className="gallery-album-empty">

              <div className="gallery-album-empty-icon">
                <ImageIcon size={42} />
              </div>

              <h3>
                No Photos Available
              </h3>

              <p>
                Photos for this gallery will be
                available soon.
              </p>

            </div>
          ) : (
            <div className="gallery-album-grid">

              {photos.map((photo, index) => {

                const imageURL =
                  getImageURL(
                    photo.fileId
                  );

                return (
                  <div
                    className="gallery-album-photo"
                    key={
                      photo.fileId ||
                      `${gallery._id}-${index}`
                    }
                    style={{
                      "--gallery-photo-delay":
                        `${index * 0.06}s`,
                    }}
                  >

                    <img
                      src={imageURL}
                      alt={`${gallery.title} photo ${
                        index + 1
                      }`}
                      loading="lazy"
                    />

                    <div className="gallery-album-photo-overlay">

                      <span>
                        {index + 1}
                      </span>

                    </div>

                  </div>
                );

              })}

            </div>
          )}

        </section>


        {/* =========================================
            BACK TO GALLERY
        ========================================= */}

        <section className="gallery-album-bottom">

          <Link
            to="/gallery"
            className="gallery-album-back-button"
          >
            <ArrowLeft size={18} />
            Back to All Galleries
          </Link>

        </section>


        {/* =========================================
            JOIN COMMUNITY
        ========================================= */}

        <JoinCommunity />

      </main>
    </>
  );
}

export default GalleryAlbum;