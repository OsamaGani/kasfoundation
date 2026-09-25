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

  useEffect(() => {
    if (!gallery) {
      return;
    }

    const siteName = "Khel Aur Shiksha Foundation";

    const galleryTitle =
      gallery.title || "Gallery";

    const title = `${galleryTitle} Gallery | Khel Aur Shiksha Foundation`;

    const photoCount = (gallery.photos || []).length;

    const description = `Explore ${galleryTitle} gallery from Khel Aur Shiksha Foundation featuring ${photoCount} ${
      photoCount === 1 ? "photo" : "photos"
    } from football activities, training sessions, events and community initiatives.`;

    const keywords =
      `${galleryTitle}, ${galleryTitle} gallery, ${galleryTitle} photos, Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation gallery, Khel Aur Shiksha Foundation photos, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation events, Khel Aur Shiksha Foundation training`;

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

      element.setAttribute("content", content);
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
        'script[data-seo="gallery-album"]'
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: galleryTitle,
      description,
      url: currentUrl,
      isPartOf: {
        "@type": "WebSite",
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
      "gallery-album"
    );

    schemaScript.textContent =
      JSON.stringify(schema);

    document.head.appendChild(
      schemaScript
    );

    return () => {
      const currentSchema =
        document.head.querySelector(
          'script[data-seo="gallery-album"]'
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [gallery]);

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