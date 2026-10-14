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
          throw new Error("Banner API request failed");
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
        setVisible(true);
      } catch (error) {
        console.error("Homepage banner error:", error);
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

  if (!visible || !banner) return null;

  return (
    <div className="banner-popup-overlay">
      <div
        className="banner-popup-modal"
        role="dialog"
        aria-label="KAS Foundation event announcement"
      >
        <button
          type="button"
          className="banner-popup-close"
          onClick={closePopup}
          aria-label="Close banner"
        >
          <X size={18} />
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
          >
            Learn More
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}