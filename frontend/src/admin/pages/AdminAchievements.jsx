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

const API_URL = "http://localhost:5000/api/achievements";

const initialForm = {
  title: "",
  sectionLabel: "",
  sectionTitle: "",
  sectionDescription: "",
  achievementType: "Tournament Winner",
  level: "Local",
  competition: "",
  year: "",
  result: "",
  participantType: "Team",
  playerName: "",
  teamName: "",
  description: "",
  city: "",
  district: "",
  state: "",
  country: "India",
  opponent: "",
  opponentCountry: "",
  image: null,
  isFeatured: false,
  isActive: true,
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

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

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

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setImagePreview("");
    setShowForm(false);
    setError("");
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setImagePreview("");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleEdit = (achievement) => {
    setEditingId(achievement._id);

    setForm({
      title: achievement.title || "",
      sectionLabel:
        achievement.sectionLabel || "",
      sectionTitle:
        achievement.sectionTitle || "",
      sectionDescription:
        achievement.sectionDescription || "",
      achievementType:
        achievement.achievementType ||
        "Tournament Winner",
      level:
        achievement.level || "Local",
      competition:
        achievement.competition || "",
      year: achievement.year || "",
      result: achievement.result || "",
      participantType:
        achievement.participantType ||
        "Team",
      playerName:
        achievement.playerName || "",
      teamName:
        achievement.teamName || "",
      description:
        achievement.description || "",
      city: achievement.city || "",
      district:
        achievement.district || "",
      state: achievement.state || "",
      country:
        achievement.country || "India",
      opponent:
        achievement.opponent || "",
      opponentCountry:
        achievement.opponentCountry || "",
      image: null,
      isFeatured:
        achievement.isFeatured || false,
      isActive:
        achievement.isActive !== false,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "sectionLabel",
        form.sectionLabel
      );

      formData.append(
        "sectionTitle",
        form.sectionTitle
      );

      formData.append(
        "sectionDescription",
        form.sectionDescription
      );

      formData.append(
        "achievementType",
        form.achievementType
      );

      formData.append(
        "level",
        form.level
      );

      formData.append(
        "competition",
        form.competition
      );

      formData.append(
        "year",
        form.year
      );

      formData.append(
        "result",
        form.result
      );

      formData.append(
        "participantType",
        form.participantType
      );

      formData.append(
        "playerName",
        form.playerName
      );

      formData.append(
        "teamName",
        form.teamName
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "city",
        form.city
      );

      formData.append(
        "district",
        form.district
      );

      formData.append(
        "state",
        form.state
      );

      formData.append(
        "country",
        form.country
      );

      formData.append(
        "opponent",
        form.opponent
      );

      formData.append(
        "opponentCountry",
        form.opponentCountry
      );

      formData.append(
        "isFeatured",
        String(form.isFeatured)
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      formData.append(
        "order",
        String(form.order)
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

  const getImageURL = (achievement) => {
    if (!achievement.image?.fileId) {
      return "";
    }

    return `${API_URL}/image/${achievement.image.fileId}`;
  };

  return (
    <div className="admin-achievements">

      {/* HEADER */}
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

      {/* SUCCESS */}
      {success && (
        <div className="admin-achievements-success">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="admin-achievements-error">
          {error}
        </div>
      )}

      {/* FORM */}
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
                Enter the achievement details
                below.
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

            {/* BASIC INFORMATION */}
            <div className="admin-achievements-section-title">
              <Trophy size={18} />
              <span>
                Basic Information
              </span>
            </div>

            <div className="admin-achievements-form-grid">

              <div className="admin-field admin-field-full">
                <label>
                  Achievement Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Mumbai City Football Championship Winner"
                  required
                />
              </div>

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

              <div className="admin-field">
                <label>
                  Achievement Level
                </label>

                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                >
                  <option>
                    Local
                  </option>

                  <option>
                    City
                  </option>

                  <option>
                    District
                  </option>

                  <option>
                    State
                  </option>

                  <option>
                    National
                  </option>

                  <option>
                    International
                  </option>
                </select>
              </div>

              <div className="admin-field">
                <label>
                  Competition / Event
                </label>

                <input
                  type="text"
                  name="competition"
                  value={form.competition}
                  onChange={handleChange}
                  placeholder="Example: Mumbai Football League"
                />
              </div>

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

              <div className="admin-field">
                <label>
                  Result
                </label>

                <input
                  type="text"
                  name="result"
                  value={form.result}
                  onChange={handleChange}
                  placeholder="Winner / Runner Up / 3rd Place"
                />
              </div>

              <div className="admin-field">
                <label>
                  Participant Type
                </label>

                <select
                  name="participantType"
                  value={form.participantType}
                  onChange={handleChange}
                >
                  <option>
                    Team
                  </option>

                  <option>
                    Player
                  </option>

                  <option>
                    Coach
                  </option>

                  <option>
                    Foundation
                  </option>
                </select>
              </div>

              <div className="admin-field">
                <label>
                  Player Name
                </label>

                <input
                  type="text"
                  name="playerName"
                  value={form.playerName}
                  onChange={handleChange}
                  placeholder="Player name"
                />
              </div>

              <div className="admin-field">
                <label>
                  Team Name
                </label>

                <input
                  type="text"
                  name="teamName"
                  value={form.teamName}
                  onChange={handleChange}
                  placeholder="Team name"
                />
              </div>

            </div>

            {/* SECTION INFORMATION */}
            <div className="admin-achievements-section-title">
              <Trophy size={18} />
              <span>
                Section Information
              </span>
            </div>

            <div className="admin-achievements-form-grid">

              <div className="admin-field">
                <label>
                  Section Label
                </label>

                <input
                  type="text"
                  name="sectionLabel"
                  value={form.sectionLabel}
                  onChange={handleChange}
                  placeholder="Example: CITY LEVEL"
                />
              </div>

              <div className="admin-field">
                <label>
                  Section Title
                </label>

                <input
                  type="text"
                  name="sectionTitle"
                  value={form.sectionTitle}
                  onChange={handleChange}
                  placeholder="Example: Mumbai City Achievements"
                />
              </div>

              <div className="admin-field admin-field-full">
                <label>
                  Section Description
                </label>

                <textarea
                  name="sectionDescription"
                  value={form.sectionDescription}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Short description for this achievement section..."
                />
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="admin-achievements-section-title">
              <Trophy size={18} />
              <span>
                Achievement Details
              </span>
            </div>

            <div className="admin-achievements-form-grid">

              <div className="admin-field admin-field-full">
                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write complete details about the achievement..."
                />
              </div>

            </div>

            {/* LOCATION */}
            <div className="admin-achievements-section-title">
              <Trophy size={18} />
              <span>
                Location & Competition Details
              </span>
            </div>

            <div className="admin-achievements-form-grid">

              <div className="admin-field">
                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                />
              </div>

              <div className="admin-field">
                <label>
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="Mumbai Suburban"
                />
              </div>

              <div className="admin-field">
                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                />
              </div>

              <div className="admin-field">
                <label>
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="India"
                />
              </div>

              <div className="admin-field">
                <label>
                  Opponent
                </label>

                <input
                  type="text"
                  name="opponent"
                  value={form.opponent}
                  onChange={handleChange}
                  placeholder="Opponent team"
                />
              </div>

              <div className="admin-field">
                <label>
                  Opponent Country
                </label>

                <input
                  type="text"
                  name="opponentCountry"
                  value={form.opponentCountry}
                  onChange={handleChange}
                  placeholder="India"
                />
              </div>

            </div>

            {/* IMAGE */}
            <div className="admin-achievements-section-title">
              <ImageIcon size={18} />
              <span>
                Achievement Image
              </span>
            </div>

            <div className="admin-achievements-image-upload">

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

            {/* SETTINGS */}
            <div className="admin-achievements-section-title">
              <Trophy size={18} />
              <span>
                Display Settings
              </span>
            </div>

            <div className="admin-achievements-settings">

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
                />
              </div>

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />

                <span>
                  Featured Achievement
                </span>

              </label>

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />

                <span>
                  Active / Visible
                </span>

              </label>

            </div>

            {/* BUTTONS */}
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

      {/* ACHIEVEMENTS LIST */}
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

        {loading ? (
          <div className="admin-achievements-loading">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
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
                    Level
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

                      <td>

                        <div className="admin-achievement-table-title">

                          <strong>
                            {
                              achievement.title
                            }
                          </strong>

                          {achievement.isFeatured && (
                            <span className="admin-achievement-featured-badge">
                              Featured
                            </span>
                          )}

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

                      <td>

                        <span className="admin-achievement-level-badge">
                          {
                            achievement.level
                          }
                        </span>

                      </td>

                      <td>
                        {
                          achievement.competition ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          achievement.year ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          achievement.result ||
                          "-"
                        }
                      </td>

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