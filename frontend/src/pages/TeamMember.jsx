import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, Loader2, Users } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./TeamMember.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function TeamMember() {
  const { slug } = useParams();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/team/slug/${slug}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Team member not found."
          );
        }

        setMember(data.teamMember || data.member || null);
      } catch (err) {
        console.error(
          "Team member fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load team member."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  const getImageURL = () => {
    const fileId = member?.profileImage?.fileId;

    if (!fileId) {
      return "";
    }

    return `${API_URL}/team/image/${fileId}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="team-member-page">
          <section className="team-member-state">
            <Loader2
              size={42}
              className="team-member-spinner"
            />

            <h2>Loading...</h2>

            <p>
              Loading team member information.
            </p>
          </section>
        </main>

        <JoinCommunity />
      </>
    );
  }

  if (error || !member) {
    return (
      <>
        <Navbar />

        <main className="team-member-page">
          <section className="team-member-state team-member-error">
            <div className="team-member-state-icon">
              <AlertCircle size={38} />
            </div>

            <h2>Team Member Not Found</h2>

            <p>
              {error ||
                "The requested team member could not be found."}
            </p>

            <Link
              to="/team"
              className="team-member-back-button"
            >
              <ArrowLeft size={17} />
              Back to Our Team
            </Link>
          </section>
        </main>

        <JoinCommunity />
      </>
    );
  }

  const imageURL = getImageURL();

  return (
    <>
      <Navbar />

      <main className="team-member-page">
        <section className="team-member-container">

          {/* DESIGNATION BADGE */}
          <div className="team-member-designation">
            {member.designation}
          </div>

          {/* MEMBER CONTENT */}
          <div className="team-member-layout">

            {/* IMAGE */}
            <div className="team-member-image-card">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt={member.name}
                />
              ) : (
                <div className="team-member-image-placeholder">
                  <Users size={60} />
                  <span>No Image</span>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="team-member-content-card">
              <div className="team-member-content-inner">

                <span className="team-member-label">
                  KHEL AUR SHIKSHA FOUNDATION
                </span>

                <h1>{member.name}</h1>

                <div className="team-member-blue-line"></div>

                {member.shortDescription && (
                  <p className="team-member-short-description">
                    {member.shortDescription}
                  </p>
                )}

                {member.description && (
                  <div className="team-member-description">
                    {member.description
                      .split("\n")
                      .map((paragraph, index) =>
                        paragraph.trim() ? (
                          <p key={index}>
                            {paragraph}
                          </p>
                        ) : null
                      )}
                  </div>
                )}

                {!member.shortDescription &&
                  !member.description && (
                    <p className="team-member-no-description">
                      No detailed information has been
                      added for this team member yet.
                    </p>
                  )}

              </div>
            </div>

          </div>

          {/* BACK BUTTON */}
          <div className="team-member-back-wrapper">
            <Link
              to="/team"
              className="team-member-back-button"
            >
              <ArrowLeft size={17} />
              Back to Our Team
            </Link>
          </div>

        </section>
      </main>

      <JoinCommunity />
    </>
  );
}

export default TeamMember;