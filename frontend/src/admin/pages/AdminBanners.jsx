
import { useEffect, useState } from "react";
import { ImagePlus, Trash2, Power, RefreshCw } from "lucide-react";
import "./AdminBanners.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/banners`;

const INITIAL_FORM = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  category: "Event",
  buttonText: "Learn More",
  registrationUrl: "",
  showOnHomepage: true,
  isActive: true,
};

function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${
      localStorage.getItem("kas_admin_token") || ""
    }`,
  });

  const loadBanners = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(`${API_URL}?admin=true`, {
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Banners load nahi hue.");
      }

      setBanners(data.banners || []);
      setError("");
    } catch (err) {
      setError(err.message || "Backend se connection nahi ho raha.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please ek valid image select karo.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image ka size 10 MB se kam hona chahiye.");
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
    setError("");
  };

  const resetForm = (formElement) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
    setForm(INITIAL_FORM);

    if (formElement) {
      formElement.reset();
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!image) {
      setError("Pehle banner image select karo.");
      return;
    }

    if (!form.title.trim()) {
      setError("Event ka title enter karo.");
      return;
    }

    if (!form.shortDescription.trim()) {
      setError("Short description enter karo.");
      return;
    }

    if (!form.fullDescription.trim()) {
      setError("Full event details enter karo.");
      return;
    }

    if (form.registrationUrl.trim()) {
      try {
        const url = new URL(form.registrationUrl.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        setError("Registration URL mein valid https:// ya http:// link do.");
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("title", form.title.trim());
      formData.append(
        "shortDescription",
        form.shortDescription.trim()
      );
      formData.append(
        "fullDescription",
        form.fullDescription.trim()
      );
      formData.append("category", form.category);
      formData.append("buttonText", form.buttonText.trim() || "Learn More");
      formData.append("registrationUrl", form.registrationUrl.trim());
      formData.append(
        "showOnHomepage",
        String(form.showOnHomepage)
      );
      formData.append("isActive", String(form.isActive));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Event upload failed.");
      }

      setMessage("Event successfully save ho gaya.");
      resetForm(event.target);
      await loadBanners();
    } catch (err) {
      setError(err.message || "Event save nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBanner = async (banner) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${banner._id}/status`,
        {
          method: "PATCH",
          headers: {
            ...getHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !banner.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setMessage("Banner status update ho gaya.");
      await loadBanners();
    } catch (err) {
      setError(err.message || "Status update nahi hua.");
    }
  };

  const deleteBanner = async (banner) => {
    if (!window.confirm("Kya tum ye banner delete karna chahte ho?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/${banner._id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Banner delete failed.");
      }

      setMessage("Banner delete ho gaya.");
      await loadBanners();
    } catch (err) {
      setError(err.message || "Banner delete nahi hua.");
    }
  };

  return (
    <section className="admin-banners-page">
      <div className="admin-banners-heading">
        <div>
          <h1>Event & Banner Management</h1>
          <p>
            Events aur announcements add karo jo homepage popup
            mein dikh sakte hain.
          </p>
        </div>

        <button
          type="button"
          className="banner-refresh-btn"
          onClick={loadBanners}
          disabled={refreshing}
        >
          <RefreshCw size={16} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <form
        className="banner-upload-card"
        onSubmit={handleUpload}
      >
        <h2>
          <ImagePlus size={20} />
          Add Event / Announcement
        </h2>

        <div className="banner-form-grid">
          <div className="banner-form-field">
            <label htmlFor="event-title">Event title *</label>
            <input
              id="event-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleFieldChange}
              maxLength={120}
              placeholder="e.g. Football Challenge 2026"
              required
            />
          </div>

          <div className="banner-form-field">
            <label htmlFor="event-category">Category *</label>
            <select
              id="event-category"
              name="category"
              value={form.category}
              onChange={handleFieldChange}
              required
            >
              <option value="Event">Event</option>
              <option value="Challenge">Challenge</option>
              <option value="Announcement">Announcement</option>
              <option value="News">News</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="banner-form-field banner-form-full">
            <label htmlFor="event-short-description">
              Short description *
            </label>
            <textarea
              id="event-short-description"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleFieldChange}
              maxLength={200}
              rows={3}
              placeholder="Popup mein dikhne wali short information..."
              required
            />
            <small>
              {form.shortDescription.length}/200 characters
            </small>
          </div>

          <div className="banner-form-field banner-form-full">
            <label htmlFor="event-full-description">
              Full event details *
            </label>
            <textarea
              id="event-full-description"
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleFieldChange}
              maxLength={10000}
              rows={6}
              placeholder="Event ka purpose, rules, eligibility, date, venue aur participation details..."
              required
            />
          </div>

          <div className="banner-form-field">
            <label htmlFor="event-button-text">Button text</label>
            <input
              id="event-button-text"
              name="buttonText"
              type="text"
              value={form.buttonText}
              onChange={handleFieldChange}
              maxLength={40}
              placeholder="Learn More"
            />
          </div>

          <div className="banner-form-field">
            <label htmlFor="event-registration-url">
              Registration URL (optional)
            </label>
            <input
              id="event-registration-url"
              name="registrationUrl"
              type="url"
              value={form.registrationUrl}
              onChange={handleFieldChange}
              placeholder="https://example.com/register"
            />
          </div>
        </div>

        <div className="banner-form-field banner-image-field">
          <label htmlFor="banner-image">Banner image *</label>
          <input
            id="banner-image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleImageChange}
          />
          <small>JPG, PNG, WEBP ya GIF. Maximum size 10 MB.</small>
        </div>

        {preview && (
          <div className="banner-preview-container">
            <img
              className="banner-upload-preview"
              src={preview}
              alt="Selected event banner preview"
            />
          </div>
        )}

        <div className="banner-form-options">
          <label className="banner-checkbox-label">
            <input
              type="checkbox"
              name="showOnHomepage"
              checked={form.showOnHomepage}
              onChange={handleFieldChange}
            />
            <span>Show popup on homepage</span>
          </label>

          <label className="banner-checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleFieldChange}
            />
            <span>Active</span>
          </label>
        </div>

        <button
          className="banner-primary-btn"
          type="submit"
          disabled={loading || !image}
        >
          {loading ? "Saving Event..." : "Save Event"}
        </button>
      </form>

      {message && <p className="banner-success">{message}</p>}
      {error && <p className="banner-error">{error}</p>}

      <h2>Saved Events & Banners ({banners.length})</h2>

      {banners.length === 0 ? (
        <p>No banners uploaded yet.</p>
      ) : (
        <div className="admin-banner-list">
          {banners.map((banner) => (
            <article className="admin-banner-item" key={banner._id}>
              <img
                src={`${API_URL}/image/${banner.image?.fileId}`}
                alt={banner.title || "Homepage banner"}
              />

              <div className="admin-banner-meta">
                <div className="admin-banner-info">
                  <strong>
                    {banner.title || "Untitled banner"}
                  </strong>

                  <span>
                    {banner.category || "Announcement"}
                  </span>

                  {banner.shortDescription && (
                    <p>{banner.shortDescription}</p>
                  )}

                  <span>
                    Status: {banner.isActive ? "Active" : "Inactive"}
                  </span>

                  <span>
                    Homepage popup:{" "}
                    {banner.showOnHomepage !== false
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

                <div className="admin-banner-actions">
                  <button
                    type="button"
                    onClick={() => toggleBanner(banner)}
                  >
                    <Power size={16} />
                    {banner.isActive ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteBanner(banner)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminBanners;
