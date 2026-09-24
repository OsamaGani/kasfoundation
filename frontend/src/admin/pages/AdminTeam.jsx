import "./AdminTeam.css";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Users,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = "http://10.171.57.75:5000/api";

const EMPTY_FORM = {
  name: "",
  designation: "",
  shortDescription: "",
  description: "",
  order: 0,
  isActive: true,
  profileImage: null,
};

function AdminTeam() {
  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState("");

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/team?admin=true`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch team members."
        );
      }

      setTeam(data.team || []);
    } catch (err) {
      console.error("Team fetch error:", err);

      setError(
        err.message ||
          "Unable to load team members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingMember(null);
    setImagePreview("");
  };

  const openAddModal = () => {
    setSuccess("");
    setError("");
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setSuccess("");
    setError("");

    setEditingMember(member);

    setForm({
      name: member.name || "",
      designation: member.designation || "",
      shortDescription:
        member.shortDescription || "",
      description:
        member.description || "",
      order: member.order ?? 0,
      isActive:
        member.isActive !== false,
      profileImage: null,
    });

    if (member.profileImage?.fileId) {
      setImagePreview(
        `${API_URL}/team/image/${member.profileImage.fileId}`
      );
    } else {
      setImagePreview("");
    }

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    resetForm();
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
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Profile image must be smaller than 10 MB."
      );

      event.target.value = "";
      return;
    }

    setError("");

    setForm((previous) => ({
      ...previous,
      profileImage: file,
    }));

    const previewURL =
      URL.createObjectURL(file);

    setImagePreview(previewURL);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter member name.");
      return;
    }

    if (!form.designation.trim()) {
      setError(
        "Please enter member designation."
      );
      return;
    }

    if (
      !editingMember &&
      !form.profileImage
    ) {
      setError(
        "Please select a profile image."
      );
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "designation",
        form.designation.trim()
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
        "order",
        Number(form.order) || 0
      );

      formData.append(
        "isActive",
        form.isActive
      );

      if (form.profileImage) {
        formData.append(
          "profileImage",
          form.profileImage
        );
      }

      const url = editingMember
        ? `${API_URL}/team/${editingMember._id}`
        : `${API_URL}/team`;

      const method = editingMember
        ? "PUT"
        : "POST";

      const response = await fetch(
        url,
        {
          method,
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save team member."
        );
      }

      setSuccess(
        editingMember
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      setShowModal(false);
      resetForm();

      await fetchTeam();
    } catch (err) {
      console.error(
        "Team save error:",
        err
      );

      setError(
        err.message ||
          "Unable to save team member."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${member.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/team/${member._id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete team member."
        );
      }

      setSuccess(
        "Team member deleted successfully."
      );

      await fetchTeam();
    } catch (err) {
      console.error(
        "Team delete error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete team member."
      );
    }
  };

  const handleToggleStatus = async (
    member
  ) => {
    try {
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append(
        "isActive",
        !member.isActive
      );

      const response = await fetch(
        `${API_URL}/team/${member._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status."
        );
      }

      setSuccess(
        `Member ${
          !member.isActive
            ? "activated"
            : "deactivated"
        } successfully.`
      );

      await fetchTeam();
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err.message ||
          "Unable to update member status."
      );
    }
  };

  const getImageURL = (member) => {
    const fileId =
      member?.profileImage?.fileId;

    if (!fileId) {
      return "";
    }

    return `${API_URL}/team/image/${fileId}`;
  };

  return (
    <div className="admin-team-page">
      {/* PAGE HEADER */}

      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">
            TEAM MANAGEMENT
          </span>

          <h1>Our Team</h1>

          <p>
            Manage KHEL AUR SHIKSHA FOUNDATION
            team members from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Team Member
        </button>
      </div>

      {/* SUCCESS MESSAGE */}

      {success && (
        <div className="admin-alert admin-alert-success">
          <CheckCircle2 size={19} />

          <span>{success}</span>

          <button
            type="button"
            onClick={() =>
              setSuccess("")
            }
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="admin-alert admin-alert-error">
          <AlertCircle size={19} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* TEAM SUMMARY */}

      <div className="admin-team-summary">
        <div className="admin-team-summary-card">
          <div className="admin-team-summary-icon">
            <Users size={23} />
          </div>

          <div>
            <span>Total Members</span>

            <strong>
              {team.length}
            </strong>
          </div>
        </div>

        <div className="admin-team-summary-card">
          <div className="admin-team-summary-icon">
            <Eye size={23} />
          </div>

          <div>
            <span>Active Members</span>

            <strong>
              {
                team.filter(
                  (member) =>
                    member.isActive
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="admin-team-summary-card">
          <div className="admin-team-summary-icon">
            <EyeOff size={23} />
          </div>

          <div>
            <span>Inactive Members</span>

            <strong>
              {
                team.filter(
                  (member) =>
                    !member.isActive
                ).length
              }
            </strong>
          </div>
        </div>
      </div>

      {/* TEAM LIST */}

      <div className="admin-section-card">
        <div className="admin-section-card-header">
          <div>
            <h2>Team Members</h2>

            <p>
              All members added to the
              foundation team.
            </p>
          </div>

          <span className="admin-count-badge">
            {team.length} Members
          </span>
        </div>

        {loading ? (
          <div className="admin-team-loading">
            <Loader2
              size={36}
              className="admin-spin"
            />

            <p>
              Loading team members...
            </p>
          </div>
        ) : team.length === 0 ? (
          <div className="admin-team-empty">
            <div className="admin-team-empty-icon">
              <Users size={38} />
            </div>

            <h3>
              No Team Members Yet
            </h3>

            <p>
              Add your first team member
              to display them on the
              website.
            </p>

            <button
              type="button"
              className="admin-primary-button"
              onClick={openAddModal}
            >
              <Plus size={18} />
              Add Team Member
            </button>
          </div>
        ) : (
          <div className="admin-team-table-wrapper">
            <table className="admin-team-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Designation</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {team.map(
                  (member) => {
                    const imageURL =
                      getImageURL(
                        member
                      );

                    return (
                      <tr
                        key={
                          member._id
                        }
                      >
                        <td>
                          <div className="admin-team-member-cell">
                            <div className="admin-team-avatar">
                              {imageURL ? (
                                <img
                                  src={
                                    imageURL
                                  }
                                  alt={
                                    member.name
                                  }
                                />
                              ) : (
                                <ImageIcon
                                  size={22}
                                />
                              )}
                            </div>

                            <div className="admin-team-member-info">
                              <strong>
                                {
                                  member.name
                                }
                              </strong>

                              <span>
                                /
                                {
                                  member.slug
                                }
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="admin-designation-text">
                            {
                              member.designation
                            }
                          </span>
                        </td>

                        <td>
                          <span className="admin-order-badge">
                            {
                              member.order ??
                              0
                            }
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className={`admin-status-badge ${
                              member.isActive
                                ? "active"
                                : "inactive"
                            }`}
                            onClick={() =>
                              handleToggleStatus(
                                member
                              )
                            }
                            title="Click to change status"
                          >
                            {member.isActive ? (
                              <>
                                <Eye
                                  size={14}
                                />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff
                                  size={14}
                                />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>

                        <td>
                          <div className="admin-team-actions">
                            <button
                              type="button"
                              className="admin-action-button edit"
                              onClick={() =>
                                openEditModal(
                                  member
                                )
                              }
                              title="Edit member"
                            >
                              <Pencil
                                size={17}
                              />
                            </button>

                            <button
                              type="button"
                              className="admin-action-button delete"
                              onClick={() =>
                                handleDelete(
                                  member
                                )
                              }
                              title="Delete member"
                            >
                              <Trash2
                                size={17}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="admin-modal admin-team-modal">
            <div className="admin-modal-header">
              <div>
                <span className="admin-modal-eyebrow">
                  TEAM MANAGEMENT
                </span>

                <h2>
                  {editingMember
                    ? "Edit Team Member"
                    : "Add Team Member"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="admin-team-form"
            >
              <div className="admin-team-form-grid">
                {/* NAME */}

                <div className="admin-form-group">
                  <label htmlFor="team-name">
                    Full Name
                    <span>*</span>
                  </label>

                  <input
                    id="team-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter full name"
                    disabled={saving}
                  />
                </div>

                {/* DESIGNATION */}

                <div className="admin-form-group">
                  <label htmlFor="team-designation">
                    Designation
                    <span>*</span>
                  </label>

                  <input
                    id="team-designation"
                    type="text"
                    name="designation"
                    value={
                      form.designation
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Founder, Coach, Manager"
                    disabled={saving}
                  />
                </div>

                {/* SHORT DESCRIPTION */}

                <div className="admin-form-group admin-form-full">
                  <label htmlFor="team-short-description">
                    Short Description
                  </label>

                  <textarea
                    id="team-short-description"
                    name="shortDescription"
                    value={
                      form.shortDescription
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Short introduction shown on team card..."
                    rows="3"
                    disabled={saving}
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="admin-form-group admin-form-full">
                  <label htmlFor="team-description">
                    Full Description
                  </label>

                  <textarea
                    id="team-description"
                    name="description"
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Write complete information about this team member..."
                    rows="6"
                    disabled={saving}
                  />
                </div>

                {/* ORDER */}

                <div className="admin-form-group">
                  <label htmlFor="team-order">
                    Display Order
                  </label>

                  <input
                    id="team-order"
                    type="number"
                    name="order"
                    min="0"
                    value={form.order}
                    onChange={
                      handleChange
                    }
                    disabled={saving}
                  />

                  <small>
                    Lower number appears
                    first.
                  </small>
                </div>

                {/* STATUS */}

                <div className="admin-form-group">
                  <label>
                    Status
                  </label>

                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={
                        form.isActive
                      }
                      onChange={
                        handleChange
                      }
                      disabled={saving}
                    />

                    <span>
                      Show this member
                      on website
                    </span>
                  </label>
                </div>

                {/* IMAGE */}

                <div className="admin-form-group admin-form-full">
                  <label>
                    Profile Image
                    {!editingMember && (
                      <span>*</span>
                    )}
                  </label>

                  <div className="admin-image-upload-area">
                    <div className="admin-image-preview">
                      {imagePreview ? (
                        <img
                          src={
                            imagePreview
                          }
                          alt="Profile preview"
                        />
                      ) : (
                        <div className="admin-image-placeholder">
                          <ImageIcon
                            size={38}
                          />

                          <span>
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="admin-image-upload-content">
                      <label
                        htmlFor="team-profile-image"
                        className="admin-upload-button"
                      >
                        <Upload
                          size={18}
                        />

                        {editingMember
                          ? "Change Image"
                          : "Choose Image"}
                      </label>

                      <input
                        id="team-profile-image"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={
                          handleImageChange
                        }
                        disabled={saving}
                        hidden
                      />

                      <p>
                        JPG, JPEG, PNG,
                        WEBP or GIF
                      </p>

                      <small>
                        Maximum file size:
                        10 MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM BUTTONS */}

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={closeModal}
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
                      {editingMember ? (
                        <Pencil
                          size={18}
                        />
                      ) : (
                        <Plus
                          size={18}
                        />
                      )}

                      {editingMember
                        ? "Update Member"
                        : "Add Member"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTeam;