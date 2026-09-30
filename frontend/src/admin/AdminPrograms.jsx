import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

import "./AdminPrograms.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/programs`;

const initialForm = {
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  image: null,
  isActive: true,
  order: 0,
};

function AdminPrograms() {
  const [programs, setPrograms] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  /* =====================================================
     FETCH PROGRAMS
  ===================================================== */

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}?admin=true`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch programs."
        );
      }

      setPrograms(data.programs || []);
    } catch (err) {
      console.error("Program fetch error:", err);

      setError(
        err.message || "Unable to load programs."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      image: file,
    }));

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setImagePreview("");
    setShowForm(false);
    setError("");
  };

  /* =====================================================
     ADD
  ===================================================== */

  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setImagePreview("");
    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (program) => {
    setEditingId(program._id);

    setForm({
      title: program.title || "",
      category: program.category || "",
      shortDescription:
        program.shortDescription || "",
      description:
        program.description || "",
      image: null,
      isActive:
        program.isActive !== false,
      order: program.order ?? 0,
    });

    if (program.image?.fileId) {
      setImagePreview(
        `${API_URL}/image/${program.image.fileId}`
      );
    } else {
      setImagePreview("");
    }

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      /* Basic fields */

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "category",
        form.category.trim()
      );

      formData.append(
        "shortDescription",
        form.shortDescription.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      formData.append(
        "order",
        String(form.order || 0)
      );

      /* Image */

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

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save program."
        );
      }

      setSuccess(
        editingId
          ? "Program updated successfully."
          : "Program added successfully."
      );

      await fetchPrograms();

      setTimeout(() => {
        resetForm();
      }, 800);
    } catch (err) {
      console.error(
        "Program save error:",
        err
      );

      setError(
        err.message ||
          "Unable to save program."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this program?"
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

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete program."
        );
      }

      setSuccess(
        "Program deleted successfully."
      );

      await fetchPrograms();
    } catch (err) {
      console.error(
        "Program delete error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete program."
      );
    }
  };

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageURL = (program) => {
    if (!program.image?.fileId) {
      return "";
    }

    return `${API_URL}/image/${program.image.fileId}`;
  };

  return (
    <div className="admin-programs">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-programs-header">

        <div>
          <div className="admin-programs-heading">

            <Layers size={28} />

            <div>
              <h1>
                Programs Management
              </h1>

              <p>
                Manage foundation programs,
                activities and services.
              </p>
            </div>

          </div>
        </div>

        <button
          type="button"
          className="admin-programs-add-button"
          onClick={handleAdd}
        >
          <Plus size={19} />
          Add Program
        </button>

      </div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="admin-programs-success">
          {success}
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="admin-programs-error">
          {error}
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <section className="admin-programs-form-card">

          <div className="admin-programs-form-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Program"
                  : "Add Program"}
              </h2>

              <p>
                Add the program details,
                description and image.
              </p>
            </div>

            <button
              type="button"
              className="admin-programs-close-button"
              onClick={resetForm}
            >
              <X size={20} />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="admin-programs-form"
          >

            {/* =================================================
                PROGRAM INFORMATION
            ================================================= */}

            <div className="admin-programs-section-title">

              <Layers size={18} />

              <span>
                Program Information
              </span>

            </div>

            <div className="admin-programs-form-grid">

              {/* TITLE */}

              <div className="admin-field admin-field-full">

                <label>
                  Program Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Youth Football Training"
                  required
                />

              </div>

              {/* CATEGORY */}

              <div className="admin-field">

                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Example: Sports"
                />

              </div>

              {/* DISPLAY ORDER */}

              <div className="admin-field">

                <label>
                  Display Order
                </label>

                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />

              </div>

              {/* SHORT DESCRIPTION */}

              <div className="admin-field admin-field-full">

                <label>
                  Short Description *
                </label>

                <textarea
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write a short description about this program..."
                  required
                />

              </div>

              {/* FULL DESCRIPTION */}

              <div className="admin-field admin-field-full">

                <label>
                  Full Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Write the complete description of this program..."
                  required
                />

              </div>

            </div>

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="admin-programs-section-title">

              <ImageIcon size={18} />

              <span>
                Program Image
              </span>

            </div>

            <div className="admin-programs-image-upload">

              <div className="admin-field">

                <label>
                  Upload Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                />

                <small>
                  JPG, PNG, WEBP or GIF.
                  Maximum 10MB.
                </small>

              </div>

              {imagePreview && (
                <div className="admin-programs-image-preview">

                  <img
                    src={imagePreview}
                    alt="Program preview"
                  />

                </div>
              )}

            </div>

            {/* =================================================
                VISIBILITY
            ================================================= */}

            <div className="admin-programs-section-title">

              <Layers size={18} />

              <span>
                Website Visibility
              </span>

            </div>

            <div className="admin-programs-settings">

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />

                <span>
                  Show this program on website
                </span>

              </label>

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="admin-programs-form-actions">

              <button
                type="button"
                className="admin-programs-cancel-button"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-programs-save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Program"
                  : "Save Program"}
              </button>

            </div>

          </form>

        </section>
      )}

      {/* =================================================
          PROGRAMS LIST
      ================================================= */}

      <section className="admin-programs-list-card">

        <div className="admin-programs-list-header">

          <div>

            <h2>
              All Programs
            </h2>

            <p>
              {programs.length} program
              {programs.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          {!showForm && (
            <button
              type="button"
              className="admin-programs-add-button"
              onClick={handleAdd}
            >
              <Plus size={19} />
              Add Program
            </button>
          )}

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="admin-programs-loading">
            Loading programs...
          </div>

        ) : programs.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="admin-programs-empty">

            <Layers size={42} />

            <h3>
              No programs yet
            </h3>

            <p>
              Add your first foundation program.
            </p>

            <button
              type="button"
              className="admin-programs-add-button"
              onClick={handleAdd}
            >
              <Plus size={18} />
              Add Program
            </button>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="admin-programs-table-wrapper">

            <table className="admin-programs-table">

              <thead>

                <tr>

                  <th>
                    Image
                  </th>

                  <th>
                    Program
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Order
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {programs.map(
                  (program) => (
                    <tr
                      key={program._id}
                    >

                      {/* IMAGE */}

                      <td>

                        <div className="admin-program-table-image">

                          {getImageURL(program) ? (

                            <img
                              src={getImageURL(program)}
                              alt={program.title}
                            />

                          ) : (

                            <Layers
                              size={24}
                            />

                          )}

                        </div>

                      </td>

                      {/* TITLE */}

                      <td>

                        <div className="admin-program-table-title">

                          <strong>
                            {program.title}
                          </strong>

                          {program.shortDescription && (
                            <small>
                              {program.shortDescription}
                            </small>
                          )}

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="admin-program-category-badge">
                          {program.category || "-"}
                        </span>

                      </td>

                      {/* ORDER */}

                      <td>
                        {program.order ?? 0}
                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            program.isActive
                              ? "admin-status-active"
                              : "admin-status-inactive"
                          }
                        >
                          {program.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="admin-program-actions">

                          <button
                            type="button"
                            className="admin-program-edit-button"
                            onClick={() =>
                              handleEdit(program)
                            }
                            title="Edit"
                          >
                            <Pencil
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            className="admin-program-delete-button"
                            onClick={() =>
                              handleDelete(
                                program._id
                              )
                            }
                            title="Delete"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}

export default AdminPrograms;