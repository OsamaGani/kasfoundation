import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, X } from "lucide-react";

import "./AdminNews.css";

const API_URL = "http://10.171.57.75:5000/api/news";

const initialForm = {
  title: "",
  date: "",
  slug: "",
  shortDescription: "",
  description: "",
  isActive: true,
  order: 0,
};

function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setFetching(true);

      const response = await fetch(`${API_URL}?admin=true`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch news.");
      }

      setNews(data.news || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
    setPreview("");
    setEditingId(null);

    const fileInput = document.getElementById("news-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.title.trim()) {
      setError("News title is required.");
      return;
    }

    if (!form.date.trim()) {
      setError("News date is required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("slug", form.slug);
      formData.append(
        "shortDescription",
        form.shortDescription
      );
      formData.append("description", form.description);
      formData.append(
        "isActive",
        form.isActive ? "true" : "false"
      );
      formData.append("order", form.order);

      if (image) {
        formData.append("image", image);
      }

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setMessage(
        editingId
          ? "News updated successfully."
          : "News added successfully."
      );

      resetForm();
      fetchNews();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setEditingId(article._id);

    setForm({
      title: article.title || "",
      date: article.date || "",
      slug: article.slug || "",
      shortDescription:
        article.shortDescription || "",
      description: article.description || "",
      isActive:
        article.isActive !== false,
      order: article.order || 0,
    });

    if (article.image?.fileId) {
      setPreview(
        `${API_URL}/image/${article.image.fileId}`
      );
    } else {
      setPreview("");
    }

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete news."
        );
      }

      setMessage("News deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-news-page">
      <div className="admin-news-header">
        <div>
          <span className="admin-news-eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h1>News Management</h1>

          <p>
            Add, edit and manage foundation news
            articles.
          </p>
        </div>

        <button
          type="button"
          className="admin-news-add-button"
          onClick={() => {
            resetForm();

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <Plus size={18} />
          Add News
        </button>
      </div>

      {message && (
        <div className="admin-news-message success">
          {message}
        </div>
      )}

      {error && (
        <div className="admin-news-message error">
          {error}
        </div>
      )}

      <section className="admin-news-form-card">
        <div className="admin-news-form-header">
          <div>
            <h2>
              {editingId
                ? "Edit News"
                : "Add New News"}
            </h2>

            <p>
              Fill in the news article details below.
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              className="admin-news-cancel-button"
              onClick={resetForm}
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>

        <form
          className="admin-news-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-news-form-grid">
            <div className="admin-news-field">
              <label htmlFor="news-title">
                Title *
              </label>

              <input
                id="news-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter news title"
                required
              />
            </div>

            <div className="admin-news-field">
              <label htmlFor="news-date">
                Date *
              </label>

              <input
                id="news-date"
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="MAY 19, 2026"
                required
              />
            </div>

            <div className="admin-news-field">
              <label htmlFor="news-slug">
                Slug
              </label>

              <input
                id="news-slug"
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Leave empty to generate automatically"
              />
            </div>

            <div className="admin-news-field">
              <label htmlFor="news-order">
                Display Order
              </label>

              <input
                id="news-order"
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="admin-news-field">
            <label htmlFor="news-short-description">
              Short Description
            </label>

            <textarea
              id="news-short-description"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="Enter short description"
              rows="4"
            />
          </div>

          <div className="admin-news-field">
            <label htmlFor="news-description">
              Full Description
            </label>

            <textarea
              id="news-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter full news article description"
              rows="10"
            />
          </div>

          <div className="admin-news-upload-section">
            <div className="admin-news-field">
              <label htmlFor="news-image">
                News Image
              </label>

              <input
                id="news-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
              />

              <small>
                JPG, JPEG, PNG, WEBP or GIF. Maximum 10MB.
              </small>
            </div>

            {preview && (
              <div className="admin-news-image-preview">
                <img
                  src={preview}
                  alt="News preview"
                />
              </div>
            )}
          </div>

          <label className="admin-news-checkbox">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />

            <span>
              Publish this news
            </span>
          </label>

          <div className="admin-news-form-actions">
            <button
              type="submit"
              className="admin-news-submit-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update News"
                : "Add News"}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-news-reset-button"
                onClick={resetForm}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-news-list-section">
        <div className="admin-news-list-header">
          <div>
            <span className="admin-news-eyebrow">
              ALL ARTICLES
            </span>

            <h2>News Articles</h2>
          </div>

          <span className="admin-news-count">
            {news.length} Articles
          </span>
        </div>

        {fetching ? (
          <div className="admin-news-empty">
            Loading news...
          </div>
        ) : news.length === 0 ? (
          <div className="admin-news-empty">
            No news articles found.
          </div>
        ) : (
          <div className="admin-news-table-wrapper">
            <table className="admin-news-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {news.map((article) => (
                  <tr key={article._id}>
                    <td>
                      <div className="admin-news-table-image">
                        {article.image?.fileId ? (
                          <img
                            src={`${API_URL}/image/${article.image.fileId}`}
                            alt={article.title}
                          />
                        ) : (
                          <span>
                            No Image
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="admin-news-table-title">
                        {article.title}
                      </div>

                      <div className="admin-news-table-slug">
                        {article.slug}
                      </div>
                    </td>

                    <td>
                      {article.date}
                    </td>

                    <td>
                      <span
                        className={`admin-news-status ${
                          article.isActive
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {article.isActive
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    <td>
                      {article.order}
                    </td>

                    <td>
                      <div className="admin-news-actions">
                        <button
                          type="button"
                          className="admin-news-edit-button"
                          onClick={() =>
                            handleEdit(article)
                          }
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          type="button"
                          className="admin-news-delete-button"
                          onClick={() =>
                            handleDelete(article._id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminNews;