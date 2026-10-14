
import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./BannerPopup.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/banners`;

export default function BannerPopup() {
  const [banner, setBanner] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadBanner() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load the event announcement.");
        }

        const data = await response.json();
        const banners = Array.isArray(data.banners)
          ? data.banners
          : [];

        const activeBanner = banners.find(
          (item) =>
            item.isActive === true &&
            item.showOnHomepage !== false &&
            item.image?.fileId
        );

        if (cancelled || !activeBanner) return;

        setBanner(activeBanner);

        // Let React render the popup before starting its entrance animation.
        requestAnimationFrame(() => {
          if (!cancelled) setVisible(true);
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Homepage banner error:", error);
        }
      }
    }

    loadBanner();

    return () => {
      cancelled = true;
    };
  }, []);

  function closePopup() {
    setVisible(false);
  }

  function openDetails() {
    if (!banner?._id) return;

    setVisible(false);
    navigate(`/events/${banner._id}`);
  }

  if (!banner) return null;

  return (
    <div
      className={`banner-popup-overlay${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <section
        className="banner-popup-modal"
        role="dialog"
        aria-label="KAS Foundation event announcement"
        aria-modal="false"
      >
        <button
          type="button"
          className="banner-popup-close"
          onClick={closePopup}
          aria-label="Close event announcement"
          tabIndex={visible ? 0 : -1}
        >
          <X size={17} />
        </button>

        <img
          className="banner-popup-image"
          src={`${API_URL}/image/${banner.image.fileId}`}
          alt={banner.title || "KAS Foundation event"}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="banner-popup-content">
          <span className="banner-popup-category">
            {banner.category || "Announcement"}
          </span>

          <h3 className="banner-popup-title">
            {banner.title || "KAS Foundation Event"}
          </h3>

          {banner.shortDescription && (
            <p className="banner-popup-description">
              {banner.shortDescription}
            </p>
          )}

          <button
            type="button"
            className="banner-popup-learn-more"
            onClick={openDetails}
            tabIndex={visible ? 0 : -1}
          >
            <span>Learn More</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
