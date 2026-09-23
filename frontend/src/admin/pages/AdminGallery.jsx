import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Edit3,
  X,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

function AdminGallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [coverImage, setCoverImage] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [coverPreview, setCoverPreview] = useState("");
  const [photoPreviews, setPhotoPreviews] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const coverInputRef = useRef(null);
  const photosInputRef = useRef(null);

  // ==========================================
  // FETCH ALL GALLERIES
  // ==========================================

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/gallery?admin=true`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch galleries.",
        );
      }

      setGalleries(data.gallery || []);
    } catch (err) {
      console.error("Fetch galleries error:", err);

      setError(
        err.message || "Unable to load galleries.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setTitle("");
    setIsActive(true);
    setOrder(0);

    setCoverImage(null);
    setPhotos([]);

    setCoverPreview("");
    setPhotoPreviews([]);

    setEditingGallery(null);
    setError("");

    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }

    if (photosInputRef.current) {
      photosInputRef.current.value = "";
    }
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAddGallery = () => {
    resetForm();
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEditGallery = (gallery) => {
    setError("");
    setSuccess("");

    setEditingGallery(gallery);

    setTitle(gallery.title || "");
    setIsActive(gallery.isActive !== false);
    setOrder(gallery.order || 0);

    setCoverImage(null);
    setPhotos([]);

    if (gallery.coverImage?.fileId) {
      setCoverPreview(
        `${API_URL}/gallery/image/${gallery.coverImage.fileId}`,
      );
    } else {
      setCoverPreview("");
    }

    setPhotoPreviews([]);

    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }

    if (photosInputRef.current) {
      photosInputRef.current.value = "";
    }

    setShowForm(true);
  };

  // ==========================================
  // COVER IMAGE CHANGE
  // ==========================================

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Cover image must be less than 10 MB.");
      return;
    }

    setCoverImage(file);
    setError("");

    const previewURL = URL.createObjectURL(file);
    setCoverPreview(previewURL);
  };

  // ==========================================
  // MULTIPLE PHOTOS CHANGE
  // ==========================================

  const handlePhotosChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const invalidFile = files.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > 10 * 1024 * 1024,
    );

    if (invalidFile) {
      setError(
        "All photos must be valid images and less than 10 MB each.",
      );
      return;
    }

    setPhotos(files);
    setError("");

    const previews = files.map((file) =>
      URL.createObjectURL(file),
    );

    setPhotoPreviews(previews);
  };

  // ==========================================
  // CREATE / UPDATE GALLERY
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Gallery name is required.");
      return;
    }

    if (!editingGallery && !coverImage) {
      setError("Please select a cover image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("isActive", String(isActive));
      formData.append("order", String(order));

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const url = editingGallery
        ? `${API_URL}/gallery/${editingGallery._id}`
        : `${API_URL}/gallery`;

      const method = editingGallery ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save gallery.",
        );
      }

      setSuccess(
        editingGallery
          ? "Gallery updated successfully."
          : "Gallery created successfully.",
      );

      resetForm();

      setShowForm(false);

      await fetchGalleries();
    } catch (err) {
      console.error("Save gallery error:", err);

      setError(
        err.message ||
          "Something went wrong while saving gallery.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE GALLERY
  // ==========================================

  const handleDeleteGallery = async (gallery) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${gallery.title}"? This will also delete all its images.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/gallery/${gallery._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete gallery.",
        );
      }

      setSuccess("Gallery deleted successfully.");

      await fetchGalleries();
    } catch (err) {
      console.error("Delete gallery error:", err);

      setError(
        err.message ||
          "Failed to delete gallery.",
      );
    }
  };

  // ==========================================
  // DELETE SINGLE PHOTO
  // ==========================================

  const handleDeletePhoto = async (
    gallery,
    fileId,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/gallery/${gallery._id}/photo/${fileId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete photo.",
        );
      }

      setSuccess("Photo deleted successfully.");

      await fetchGalleries();
    } catch (err) {
      console.error("Delete photo error:", err);

      setError(
        err.message ||
          "Failed to delete photo.",
      );
    }
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    if (saving) {
      return;
    }

    resetForm();
    setShowForm(false);
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageURL = (fileId) => {
    if (!fileId) {
      return "";
    }

    return `${API_URL}/gallery/image/${fileId}`;
  };

  return (
    <div className="admin-gallery-page">
      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="admin-page-heading">
        <div>
          <span className="admin-page-eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h2>Gallery Management</h2>

          <p>
            Create and manage city-wise galleries,
            cover images and photos.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={handleAddGallery}
        >
          <Plus size={19} />
          Add Gallery
        </button>
      </div>

      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {success && (
        <div className="admin-alert admin-alert-success">
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
            aria-label="Close success message"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="admin-alert admin-alert-error">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Close error message"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* ======================================
          ADD / EDIT FORM
      ====================================== */}

      {showForm && (
        <section className="admin-gallery-form-card">
          <div className="admin-form-header">
            <div>
              <span>
                {editingGallery
                  ? "EDIT GALLERY"
                  : "NEW GALLERY"}
              </span>

              <h3>
                {editingGallery
                  ? "Update Gallery"
                  : "Create New Gallery"}
              </h3>
            </div>

            <button
              type="button"
              className="admin-close-button"
              onClick={handleCloseForm}
              disabled={saving}
              aria-label="Close form"
            >
              <X size={21} />
            </button>
          </div>

          <form
            className="admin-gallery-form"
            onSubmit={handleSubmit}
          >
            {/* Gallery Name */}

            <div className="admin-form-group">
              <label htmlFor="gallery-title">
                Gallery Name
              </label>

              <input
                id="gallery-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Example: Mumbai"
                disabled={saving}
              />
            </div>

            {/* Order */}

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="gallery-order">
                  Display Order
                </label>

                <input
                  id="gallery-order"
                  type="number"
                  min="0"
                  value={order}
                  onChange={(event) =>
                    setOrder(event.target.value)
                  }
                  placeholder="0"
                  disabled={saving}
                />
              </div>

              {/* Active */}

              <div className="admin-form-group">
                <label>Gallery Status</label>

                <button
                  type="button"
                  className={`admin-status-toggle ${
                    isActive
                      ? "active"
                      : "inactive"
                  }`}
                  onClick={() =>
                    setIsActive((current) => !current)
                  }
                  disabled={saving}
                >
                  {isActive ? (
                    <>
                      <Eye size={18} />
                      Active
                    </>
                  ) : (
                    <>
                      <EyeOff size={18} />
                      Inactive
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Cover Image */}

            <div className="admin-form-group">
              <label>
                Cover Image
                {!editingGallery && (
                  <span className="required">*</span>
                )}
              </label>

              <div className="admin-upload-box">
                {coverPreview ? (
                  <div className="admin-cover-preview">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverPreview("");

                        if (coverInputRef.current) {
                          coverInputRef.current.value =
                            "";
                        }
                      }}
                      aria-label="Remove cover image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="admin-upload-placeholder"
                    onClick={() =>
                      coverInputRef.current?.click()
                    }
                    disabled={saving}
                  >
                    <Upload size={28} />

                    <strong>
                      Upload Cover Image
                    </strong>

                    <span>
                      JPG, PNG, WEBP or GIF — Max 10 MB
                    </span>
                  </button>
                )}

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleCoverChange}
                  hidden
                />
              </div>
            </div>

            {/* Multiple Photos */}

            <div className="admin-form-group">
              <label>
                Gallery Photos
              </label>

              <div className="admin-upload-box">
                <button
                  type="button"
                  className="admin-upload-placeholder"
                  onClick={() =>
                    photosInputRef.current?.click()
                  }
                  disabled={saving}
                >
                  <ImageIcon size={28} />

                  <strong>
                    Select Multiple Photos
                  </strong>

                  <span>
                    You can select multiple images
                  </span>
                </button>

                <input
                  ref={photosInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handlePhotosChange}
                  hidden
                />
              </div>

              {photoPreviews.length > 0 && (
                <div className="admin-new-photo-grid">
                  {photoPreviews.map(
                    (preview, index) => (
                      <div
                        className="admin-new-photo"
                        key={preview}
                      >
                        <img
                          src={preview}
                          alt={`New photo ${index + 1}`}
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={handleCloseForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2
                      size={18}
                      className="admin-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingGallery
                      ? "Update Gallery"
                      : "Create Gallery"}
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ======================================
          GALLERY LIST
      ====================================== */}

      <section className="admin-gallery-list-section">
        <div className="admin-section-heading">
          <div>
            <span>ALL GALLERIES</span>
            <h3>
              {galleries.length}{" "}
              {galleries.length === 1
                ? "Gallery"
                : "Galleries"}
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading-state">
            <Loader2
              size={30}
              className="admin-spin"
            />

            <p>Loading galleries...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <ImageIcon size={34} />
            </div>

            <h3>No galleries yet</h3>

            <p>
              Create your first city gallery by
              clicking the Add Gallery button.
            </p>

            <button
              type="button"
              className="admin-primary-button"
              onClick={handleAddGallery}
            >
              <Plus size={18} />
              Add First Gallery
            </button>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {galleries.map((gallery) => (
              <article
                className="admin-gallery-card"
                key={gallery._id}
              >
                {/* Cover */}

                <div className="admin-gallery-card-image">
                  {gallery.coverImage?.fileId ? (
                    <img
                      src={getImageURL(
                        gallery.coverImage.fileId,
                      )}
                      alt={gallery.title}
                    />
                  ) : (
                    <div className="admin-gallery-no-image">
                      <ImageIcon size={40} />
                    </div>
                  )}

                  <div className="admin-gallery-card-status">
                    {gallery.isActive ? (
                      <span className="status-active">
                        Active
                      </span>
                    ) : (
                      <span className="status-inactive">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}

                <div className="admin-gallery-card-content">
                  <div className="admin-gallery-card-top">
                    <div>
                      <h4>{gallery.title}</h4>

                      <span>
                        /gallery/{gallery.slug}
                      </span>
                    </div>

                    <strong>
                      #{gallery.order || 0}
                    </strong>
                  </div>

                  <div className="admin-gallery-card-meta">
                    <span>
                      <ImageIcon size={16} />

                      {gallery.photos?.length || 0}{" "}
                      Photos
                    </span>
                  </div>

                  {/* Existing Photos */}

                  {gallery.photos?.length > 0 && (
                    <div className="admin-existing-photos">
                      {gallery.photos
                        .slice(0, 5)
                        .map((photo) => (
                          <div
                            className="admin-existing-photo"
                            key={photo.fileId}
                          >
                            <img
                              src={getImageURL(
                                photo.fileId,
                              )}
                              alt=""
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleDeletePhoto(
                                  gallery,
                                  photo.fileId,
                                )
                              }
                              aria-label="Delete photo"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}

                      {gallery.photos.length > 5 && (
                        <span className="admin-more-photos">
                          +{gallery.photos.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}

                  <div className="admin-gallery-actions">
                    <button
                      type="button"
                      className="admin-edit-button"
                      onClick={() =>
                        handleEditGallery(gallery)
                      }
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() =>
                        handleDeleteGallery(gallery)
                      }
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
    </div>
  );
}

export default AdminGallery;