import { useEffect, useState } from "react";
import { ImagePlus, Trash2, Power } from "lucide-react";
import "./AdminBanners.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/banners`;

function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${
      localStorage.getItem("kas_admin_token") || ""
    }`,
  });

  const loadBanners = async () => {
    try {
      const response = await fetch(`${API_URL}?admin=true`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Banners load nahi hue.");
      }

      setBanners(data.banners || []);
      setError("");
    } catch (err) {
      setError(err.message || "Backend se connection nahi ho raha.");
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

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

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
    setError("");
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!image) {
      setError("Pehle banner image select karo.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("isActive", "true");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Banner upload failed.");
      }

      setMessage("Banner successfully upload ho gaya.");
      setImage(null);
      setPreview("");

      event.target.reset();
      await loadBanners();
    } catch (err) {
      setError(err.message || "Banner upload nahi ho paya.");
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
      const response = await fetch(
        `${API_URL}/${banner._id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

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
          <h1>Banner Management</h1>
          <p>
            Active banner sirf website ke homepage par popup
            mein dikhega.
          </p>
        </div>

        <button
          type="button"
          className="banner-refresh-btn"
          onClick={loadBanners}
        >
          Refresh
        </button>
      </div>

      <form className="banner-upload-card" onSubmit={handleUpload}>
        <h2>
          <ImagePlus size={20} />
          Upload Homepage Banner
        </h2>

        <label htmlFor="banner-image">
          Banner image select karo
        </label>

        <input
          id="banner-image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleImageChange}
        />

        <p>JPG, PNG, WEBP ya GIF. Maximum size 10 MB.</p>

        {preview && (
          <img
            className="banner-upload-preview"
            src={preview}
            alt="Banner preview"
          />
        )}

        <button
          className="banner-primary-btn"
          type="submit"
          disabled={loading || !image}
        >
          {loading ? "Uploading..." : "Upload Banner"}
        </button>
      </form>

      {message && <p className="banner-success">{message}</p>}
      {error && <p className="banner-error">{error}</p>}

      <h2>Uploaded Banners ({banners.length})</h2>

      {banners.length === 0 ? (
        <p>No banners uploaded yet.</p>
      ) : (
        <div className="admin-banner-list">
          {banners.map((banner) => (
            <article className="admin-banner-item" key={banner._id}>
              <img
                src={`${API_URL}/image/${banner.image?.fileId}`}
                alt="Homepage banner"
              />

              <div className="admin-banner-meta">
                <span>
                  {banner.isActive ? "Active" : "Inactive"}
                </span>

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