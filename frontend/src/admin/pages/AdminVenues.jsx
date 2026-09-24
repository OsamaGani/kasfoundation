import { useEffect, useState } from "react";
import { Edit, ImagePlus, Plus, Trash2, X } from "lucide-react";

import "./AdminVenues.css";

const API_URL = "import.meta.env.VITE_API_URL/api/venues";

const initialForm = {
  label: "VENUES",
  name: "",
  description: "",
  image: null,
  isActive: true,
  order: 0,
};

function AdminVenues() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchVenues = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?admin=true`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch venues."
        );
      }

      setVenues(data.venues || []);
    } catch (error) {
      console.error("Fetch venues error:", error);

      setError(
        error.message ||
          "Unable to load venues."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked, files } =
      event.target;

    if (type === "file") {
      setForm((previous) => ({
        ...previous,
        image: files?.[0] || null,
      }));

      return;
    }

    if (type === "checkbox") {
      setForm((previous) => ({
        ...previous,
        [name]: checked,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setSuccess("");
    setError("");

    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (venue) => {
    setSuccess("");
    setError("");

    setForm({
      label: venue.label || "VENUES",
      name: venue.name || "",
      description: venue.description || "",
      image: null,
      isActive:
        venue.isActive !== false,
      order: venue.order ?? 0,
    });

    setEditingId(venue._id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Venue name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError(
        "Venue description is required."
      );
      return;
    }

    if (!editingId && !form.image) {
      setError("Please select a venue image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "label",
        form.label.trim() || "VENUES"
      );

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "isActive",
        form.isActive
      );

      formData.append(
        "order",
        form.order
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save venue."
        );
      }

      setSuccess(
        editingId
          ? "Venue updated successfully."
          : "Venue added successfully."
      );

      resetForm();

      await fetchVenues();
    } catch (error) {
      console.error(
        "Save venue error:",
        error
      );

      setError(
        error.message ||
          "Unable to save venue."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete venue."
        );
      }

      setSuccess(
        "Venue deleted successfully."
      );

      await fetchVenues();
    } catch (error) {
      console.error(
        "Delete venue error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete venue."
      );
    }
  };

  const getImageUrl = (fileId) => {
    if (!fileId) {
      return "";
    }

    return `${API_URL}/image/${fileId}`;
  };

  return (
    <section className="admin-venues-page">
      <div className="admin-venues-header">
        <div>
          <span className="admin-venues-eyebrow">
            VENUE MANAGEMENT
          </span>

          <h1>Venues</h1>

          <p>
            Add and manage KAS Foundation
            venues.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="admin-venues-add-button"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add Venue
          </button>
        )}
      </div>

      {error && (
        <div className="admin-venues-alert error">
          {error}
        </div>
      )}

      {success && (
        <div className="admin-venues-alert success">
          {success}
        </div>
      )}

      {showForm && (
        <div className="admin-venue-form-card">
          <div className="admin-venue-form-header">
            <div>
              <span>
                {editingId
                  ? "EDIT VENUE"
                  : "ADD VENUE"}
              </span>

              <h2>
                {editingId
                  ? "Update Venue"
                  : "Create New Venue"}
              </h2>
            </div>

            <button
              type="button"
              className="admin-venue-close"
              onClick={resetForm}
              aria-label="Close form"
            >
              <X size={21} />
            </button>
          </div>

          <form
            className="admin-venue-form"
            onSubmit={handleSubmit}
          >
            <div className="admin-venue-form-grid">
              <div className="admin-form-group">
                <label htmlFor="venue-label">
                  Label
                </label>

                <input
                  id="venue-label"
                  type="text"
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  placeholder="VENUES"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="venue-name">
                  Venue Name
                </label>

                <input
                  id="venue-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="LAHORE VENUE"
                  required
                />
              </div>

              <div className="admin-form-group full-width">
                <label htmlFor="venue-description">
                  Description
                </label>

                <textarea
                  id="venue-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Experience world-class football facilities..."
                  rows="5"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="venue-order">
                  Display Order
                </label>

                <input
                  id="venue-order"
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="venue-image">
                  Venue Image
                </label>

                <label
                  htmlFor="venue-image"
                  className="admin-venue-file-input"
                >
                  <ImagePlus size={20} />

                  <span>
                    {form.image
                      ? form.image.name
                      : editingId
                      ? "Choose new image (optional)"
                      : "Choose image"}
                  </span>
                </label>

                <input
                  id="venue-image"
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleChange}
                  hidden
                />
              </div>
            </div>

            <div className="admin-venue-checkbox-row">
              <label className="admin-venue-checkbox">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />

                <span>
                  Active Venue
                </span>
              </label>
            </div>

            <div className="admin-venue-form-actions">
              <button
                type="button"
                className="admin-venue-cancel"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-venue-save"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Venue"
                  : "Add Venue"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-venues-list-section">
        <div className="admin-venues-list-header">
          <div>
            <span>ALL VENUES</span>
            <h2>
              {venues.length}{" "}
              {venues.length === 1
                ? "Venue"
                : "Venues"}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="admin-venues-empty">
            Loading venues...
          </div>
        ) : venues.length === 0 ? (
          <div className="admin-venues-empty">
            <div className="admin-venues-empty-icon">
              <ImagePlus size={30} />
            </div>

            <h3>No venues added yet</h3>

            <p>
              Add your first venue to display
              it on the website.
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="admin-venues-empty-button"
            >
              <Plus size={18} />
              Add Venue
            </button>
          </div>
        ) : (
          <div className="admin-venues-table-wrapper">
            <table className="admin-venues-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Venue</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {venues.map((venue) => (
                  <tr key={venue._id}>
                    <td>
                      <div className="admin-venue-thumbnail">
                        {venue.image?.fileId ? (
                          <img
                            src={getImageUrl(
                              venue.image.fileId
                            )}
                            alt={venue.name}
                          />
                        ) : (
                          <ImagePlus
                            size={22}
                          />
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="admin-venue-name-cell">
                        <span>
                          {venue.label ||
                            "VENUES"}
                        </span>

                        <strong>
                          {venue.name}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <p className="admin-venue-description-cell">
                        {venue.description}
                      </p>
                    </td>

                    <td>
                      <span
                        className={`admin-venue-status ${
                          venue.isActive
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {venue.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      {venue.order}
                    </td>

                    <td>
                      <div className="admin-venue-actions">
                        <button
                          type="button"
                          className="admin-venue-edit"
                          onClick={() =>
                            handleEdit(
                              venue
                            )
                          }
                          aria-label={`Edit ${venue.name}`}
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          className="admin-venue-delete"
                          onClick={() =>
                            handleDelete(
                              venue._id
                            )
                          }
                          aria-label={`Delete ${venue.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminVenues;