import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Users, AlertCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./OurTeam.css";

const API_URL = "https://kasfoundation.onrender.com/api";

function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/team`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load team members."
          );
        }

        setTeamMembers(data.team || []);
      } catch (err) {
        console.error("Public team fetch error:", err);

        setError(
          err.message || "Unable to load team members."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const getImageURL = (member) => {
    const fileId = member?.profileImage?.fileId;

    if (!fileId) {
      return "";
    }

    return `${API_URL}/team/image/${fileId}`;
  };

  return (
    <>
      <Navbar />

      <main className="our-team-page">
        {/* =========================
            PAGE HEADER
        ========================== */}
        <section className="our-team-header">
          <h1>OUR STAFF</h1>

          <p className="staff-description">
            At KHEL AUR SHIKSHA FOUNDATION, our dedicated team works
            tirelessly to inspire, guide, and empower young talent.
            Each member of our staff brings unique expertise, passion,
            and commitment to helping children achieve their dreams
            through football and education.
          </p>
        </section>

        {/* =========================
            LOADING
        ========================== */}
        {loading && (
          <section className="our-team-state">
            <Loader2
              size={42}
              className="our-team-loading-icon"
            />

            <h2>Loading Team</h2>

            <p>
              Please wait while we load our team members.
            </p>
          </section>
        )}

        {/* =========================
            ERROR
        ========================== */}
        {!loading && error && (
          <section className="our-team-state our-team-error">
            <div className="our-team-state-icon">
              <AlertCircle size={38} />
            </div>

            <h2>Unable to Load Team</h2>

            <p>{error}</p>
          </section>
        )}

        {/* =========================
            EMPTY
        ========================== */}
        {!loading &&
          !error &&
          teamMembers.length === 0 && (
            <section className="our-team-state">
              <div className="our-team-state-icon">
                <Users size={38} />
              </div>

              <h2>No Team Members Yet</h2>

              <p>
                Team members will appear here once they are added
                from the admin panel.
              </p>
            </section>
          )}

        {/* =========================
            TEAM GRID
        ========================== */}
        {!loading &&
          !error &&
          teamMembers.length > 0 && (
            <section className="our-team-section">
              <div className="our-team-grid">
                {teamMembers.map((member, index) => {
                  const imageURL = getImageURL(member);

                  return (
                    <Link
                      key={member._id}
                      to={`/team/${member.slug}`}
                      className="team-card"
                      style={{
                        "--card-delay": `${index * 0.08}s`,
                      }}
                    >
                      <div className="team-card-image">
                        {imageURL ? (
                          <img
                            src={imageURL}
                            alt={member.name}
                            loading="lazy"
                          />
                        ) : (
                          <div className="team-card-image-placeholder">
                            <Users size={42} />
                          </div>
                        )}
                      </div>

                      <div className="team-card-info">
                        <h2>{member.name}</h2>

                        <p>{member.designation}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
      </main>

      <JoinCommunity />
    </>
  );
}

export default OurTeam;