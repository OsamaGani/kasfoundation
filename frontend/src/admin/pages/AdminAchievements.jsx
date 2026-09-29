import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Trophy,
  Image as ImageIcon,
} from "lucide-react";

import "./AdminAchievements.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/achievements`;

const initialForm = {
  title: "",
  achievementType: "Tournament Winner",
  competition: "",
  year: "",
  result: "",
  participantType: "Team",
  playerName: "",
  teamName: "",
  description: "",
  image: null,
  isActive: true,

  // Backend compatibility defaults
  sectionLabel: "",
  sectionTitle: "",
  sectionDescription: "",
  level: "Local",
  city: "",
  district: "",
  state: "",
  country: "India",
  opponent: "",
  opponentCountry: "",
  isFeatured: false,
  order: 0,
};

function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  /* =====================================================
     FETCH ACHIEVEMENTS
  ===================================================== */

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?admin=true`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch achievements."
        );
      }

      setAchievements(
        data.achievements || []
      );
    } catch (err) {
      console.error(
        "Achievement fetch error:",
        err
      );

      setError(
        err.message ||
          "Unable to load achievements."
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

  const handleEdit = (achievement) => {
    setEditingId(achievement._id);

    setForm({
      title: achievement.title || "",

      achievementType:
        achievement.achievementType ||
        "Tournament Winner",

      competition:
        achievement.competition || "",

      year:
        achievement.year || "",

      result:
        achievement.result || "",

      participantType:
        achievement.participantType ||
        "Team",

      playerName:
        achievement.playerName || "",

      teamName:
        achievement.teamName || "",

      description:
        achievement.description || "",

      image: null,

      isActive:
        achievement.isActive !== false,

      // Backend compatibility
      sectionLabel:
        achievement.sectionLabel || "",

      sectionTitle:
        achievement.sectionTitle || "",

      sectionDescription:
        achievement.sectionDescription || "",

      level:
        achievement.level || "Local",

      city:
        achievement.city || "",

      district:
        achievement.district || "",

      state:
        achievement.state || "",

      country:
        achievement.country || "India",

      opponent:
        achievement.opponent || "",

      opponentCountry:
        achievement.opponentCountry || "",

      isFeatured:
        achievement.isFeatured || false,

      order:
        achievement.order ?? 0,
    });

    if (achievement.image?.fileId) {
      setImagePreview(
        `${API_URL}/image/${achievement.image.fileId}`
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
        "achievementType",
        form.achievementType
      );

      formData.append(
        "competition",
        form.competition.trim()
      );

      formData.append(
        "year",
        form.year.trim()
      );

      formData.append(
        "result",
        form.result.trim()
      );

      formData.append(
        "participantType",
        form.participantType
      );

      formData.append(
        "playerName",
        form.playerName.trim()
      );

      formData.append(
        "teamName",
        form.teamName.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      /* Backend compatibility defaults */

      formData.append(
        "sectionLabel",
        ""
      );

      formData.append(
        "sectionTitle",
        ""
      );

      formData.append(
        "sectionDescription",
        ""
      );

      formData.append(
        "level",
        "Local"
      );

      formData.append(
        "city",
        ""
      );

      formData.append(
        "district",
        ""
      );

      formData.append(
        "state",
        ""
      );

      formData.append(
        "country",
        "India"
      );

      formData.append(
        "opponent",
        ""
      );

      formData.append(
        "opponentCountry",
        ""
      );

      formData.append(
        "isFeatured",
        "false"
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      formData.append(
        "order",
        "0"
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
            "Failed to save achievement."
        );
      }

      setSuccess(
        editingId
          ? "Achievement updated successfully."
          : "Achievement added successfully."
      );

      await fetchAchievements();

      setTimeout(() => {
        resetForm();
      }, 800);
    } catch (err) {
      console.error(
        "Achievement save error:",
        err
      );

      setError(
        err.message ||
          "Unable to save achievement."
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
      "Are you sure you want to delete this achievement?"
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
            "Failed to delete achievement."
        );
      }

      setSuccess(
        "Achievement deleted successfully."
      );

      await fetchAchievements();
    } catch (err) {
      console.error(
        "Achievement delete error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete achievement."
      );
    }
  };

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageURL = (achievement) => {
    if (!achievement.image?.fileId) {
      return "";
    }

    return `${API_URL}/image/${achievement.image.fileId}`;
  };

  return (
    <div className="admin-achievements">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-achievements-header">

        <div>
          <div className="admin-achievements-heading">

            <Trophy size={28} />

            <div>
              <h1>
                Achievements Management
              </h1>

              <p>
                Manage foundation achievements,
                tournament results and awards.
              </p>
            </div>

          </div>
        </div>

        <button
          type="button"
          className="admin-achievements-add-button"
          onClick={handleAdd}
        >
          <Plus size={19} />
          Add Achievement
        </button>

      </div>


      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="admin-achievements-success">
          {success}
        </div>
      )}


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="admin-achievements-error">
          {error}
        </div>
      )}


      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <section className="admin-achievements-form-card">

          <div className="admin-achievements-form-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Achievement"
                  : "Add Achievement"}
              </h2>

              <p>
                Add the basic achievement details,
                description and photo.
              </p>
            </div>

            <button
              type="button"
              className="admin-achievements-close-button"
              onClick={resetForm}
            >
              <X size={20} />
            </button>

          </div>


          <form
            onSubmit={handleSubmit}
            className="admin-achievements-form"
          >

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="admin-achievements-section-title">

              <Trophy size={18} />

              <span>
                Achievement Information
              </span>

            </div>


            <div className="admin-achievements-form-grid">

              {/* TITLE */}

              <div className="admin-field admin-field-full">

                <label>
                  Achievement Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Mumbai Youth Football Tournament"
                  required
                />

              </div>


              {/* TYPE */}

              <div className="admin-field">

                <label>
                  Achievement Type
                </label>

                <select
                  name="achievementType"
                  value={form.achievementType}
                  onChange={handleChange}
                >
                  <option>
                    Tournament Winner
                  </option>

                  <option>
                    Runner Up
                  </option>

                  <option>
                    Third Place
                  </option>

                  <option>
                    Best Player
                  </option>

                  <option>
                    Best Goalkeeper
                  </option>

                  <option>
                    Top Scorer
                  </option>

                  <option>
                    Player Selection
                  </option>

                  <option>
                    Individual Award
                  </option>

                  <option>
                    Team Achievement
                  </option>

                  <option>
                    Special Recognition
                  </option>
                </select>

              </div>


              {/* COMPETITION */}

              <div className="admin-field">

                <label>
                  Competition / Event
                </label>

                <input
                  type="text"
                  name="competition"
                  value={form.competition}
                  onChange={handleChange}
                  placeholder="Example: Mumbai Youth Football Tournament"
                />

              </div>


              {/* YEAR */}

              <div className="admin-field">

                <label>
                  Year
                </label>

                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2026"
                />

              </div>


              {/* RESULT */}

              <div className="admin-field">

                <label>
                  Result
                </label>

                <input
                  type="text"
                  name="result"
                  value={form.result}
                  onChange={handleChange}
                  placeholder="Winner / Runner Up / Best Player"
                />

              </div>


              {/* PARTICIPANT TYPE */}

              <div className="admin-field">

                <label>
                  For
                </label>

                <select
                  name="participantType"
                  value={form.participantType}
                  onChange={handleChange}
                >
                  <option value="Team">
                    Team
                  </option>

                  <option value="Player">
                    Player
                  </option>

                  <option value="Coach">
                    Coach
                  </option>

                  <option value="Foundation">
                    Foundation
                  </option>
                </select>

              </div>


              {/* TEAM NAME */}

              {form.participantType === "Team" && (
                <div className="admin-field">

                  <label>
                    Team Name
                  </label>

                  <input
                    type="text"
                    name="teamName"
                    value={form.teamName}
                    onChange={handleChange}
                    placeholder="Example: U-16 Team"
                  />

                </div>
              )}


              {/* PLAYER NAME */}

              {form.participantType === "Player" && (
                <div className="admin-field">

                  <label>
                    Player Name
                  </label>

                  <input
                    type="text"
                    name="playerName"
                    value={form.playerName}
                    onChange={handleChange}
                    placeholder="Example: Player Name"
                  />

                </div>
              )}

            </div>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="admin-achievements-section-title">

              <Trophy size={18} />

              <span>
                About Achievement
              </span>

            </div>


            <div className="admin-achievements-form-grid">

              <div className="admin-field admin-field-full">

                <label>
                  Short Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write a short description about this achievement..."
                />

              </div>

            </div>


            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="admin-achievements-section-title">

              <ImageIcon size={18} />

              <span>
                Achievement Photo
              </span>

            </div>


            <div className="admin-achievements-image-upload">

              <div className="admin-field">

                <label>
                  Upload Photo
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                />

                <small>
                  JPG, PNG, WEBP or GIF. Maximum
                  10MB.
                </small>

              </div>


              {imagePreview && (
                <div className="admin-achievements-image-preview">

                  <img
                    src={imagePreview}
                    alt="Achievement preview"
                  />

                </div>
              )}

            </div>


            {/* =================================================
                VISIBILITY
            ================================================= */}

            <div className="admin-achievements-section-title">

              <Trophy size={18} />

              <span>
                Website Visibility
              </span>

            </div>


            <div className="admin-achievements-settings">

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />

                <span>
                  Show this achievement on website
                </span>

              </label>

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="admin-achievements-form-actions">

              <button
                type="button"
                className="admin-achievements-cancel-button"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-achievements-save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Achievement"
                  : "Save Achievement"}
              </button>

            </div>

          </form>

        </section>
      )}


      {/* =================================================
          ACHIEVEMENTS LIST
      ================================================= */}

      <section className="admin-achievements-list-card">

        <div className="admin-achievements-list-header">

          <div>

            <h2>
              All Achievements
            </h2>

            <p>
              {achievements.length} achievement
              {achievements.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>


          {!showForm && (
            <button
              type="button"
              className="admin-achievements-add-button"
              onClick={handleAdd}
            >
              <Plus size={19} />
              Add Achievement
            </button>
          )}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="admin-achievements-loading">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="admin-achievements-empty">

            <Trophy size={42} />

            <h3>
              No achievements yet
            </h3>

            <p>
              Add your first foundation
              achievement.
            </p>

            <button
              type="button"
              className="admin-achievements-add-button"
              onClick={handleAdd}
            >
              <Plus size={18} />
              Add Achievement
            </button>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="admin-achievements-table-wrapper">

            <table className="admin-achievements-table">

              <thead>

                <tr>

                  <th>
                    Image
                  </th>

                  <th>
                    Achievement
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Competition
                  </th>

                  <th>
                    Year
                  </th>

                  <th>
                    Result
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

                {achievements.map(
                  (achievement) => (
                    <tr
                      key={
                        achievement._id
                      }
                    >

                      {/* IMAGE */}

                      <td>

                        <div className="admin-achievement-table-image">

                          {getImageURL(
                            achievement
                          ) ? (

                            <img
                              src={getImageURL(
                                achievement
                              )}
                              alt={
                                achievement.title
                              }
                            />

                          ) : (

                            <Trophy
                              size={24}
                            />

                          )}

                        </div>

                      </td>


                      {/* TITLE */}

                      <td>

                        <div className="admin-achievement-table-title">

                          <strong>
                            {
                              achievement.title
                            }
                          </strong>

                        </div>

                        {achievement.playerName && (
                          <small>
                            Player:{" "}
                            {
                              achievement.playerName
                            }
                          </small>
                        )}

                        {achievement.teamName && (
                          <small>
                            Team:{" "}
                            {
                              achievement.teamName
                            }
                          </small>
                        )}

                      </td>


                      {/* TYPE */}

                      <td>

                        <span className="admin-achievement-level-badge">
                          {
                            achievement.achievementType ||
                            "Achievement"
                          }
                        </span>

                      </td>


                      {/* COMPETITION */}

                      <td>
                        {
                          achievement.competition ||
                          "-"
                        }
                      </td>


                      {/* YEAR */}

                      <td>
                        {
                          achievement.year ||
                          "-"
                        }
                      </td>


                      {/* RESULT */}

                      <td>
                        {
                          achievement.result ||
                          "-"
                        }
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            achievement.isActive
                              ? "admin-status-active"
                              : "admin-status-inactive"
                          }
                        >
                          {achievement.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="admin-achievement-actions">

                          <button
                            type="button"
                            className="admin-achievement-edit-button"
                            onClick={() =>
                              handleEdit(
                                achievement
                              )
                            }
                            title="Edit"
                          >
                            <Pencil
                              size={17}
                            />
                          </button>


                          <button
                            type="button"
                            className="admin-achievement-delete-button"
                            onClick={() =>
                              handleDelete(
                                achievement._id
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

export default AdminAchievements;