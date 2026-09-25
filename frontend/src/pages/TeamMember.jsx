import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import JoinCommunity from "../components/JoinCommunity";

import "./TeamMember.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function TeamMember() {
  const { slug } = useParams();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH TEAM MEMBER + SEO
  ===================================================== */

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

        setMember(
          data.teamMember ||
            data.member ||
            null
        );
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

  /* =====================================================
     DYNAMIC SEO
  ===================================================== */

  useEffect(() => {
    const siteName =
      "Khel Aur Shiksha Foundation";

    const memberName =
      member?.name || "Our Team";

    const designation =
      member?.designation ||
      "Football Team";

    const title =
      member?.name
        ? `${member.name} | ${designation} | Khel Aur Shiksha Foundation`
        : `Our Team | Khel Aur Shiksha Foundation`;

    const description =
      member?.shortDescription ||
      (member?.description
        ? member.description
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160)
        : `Meet ${memberName}, a member of Khel Aur Shiksha Foundation working in football development, player development and community initiatives.`);

    const keywords = member?.name
      ? `${member.name}, ${designation}, Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation team, Khel Aur Shiksha Foundation football team, Khel Aur Shiksha Foundation football, Khel Aur Shiksha Foundation coaches, Khel Aur Shiksha Foundation player`
      : "Khel Aur Shiksha Foundation, Khel Aur Shiksha, KAS Foundation, Khel Aur Shiksha Foundation team, Khel Aur Shiksha Foundation football team";

    const currentUrl =
      window.location.href;

    const siteUrl =
      window.location.origin;

    document.title = title;

    const setMeta = (
      attribute,
      name,
      content
    ) => {
      let element =
        document.head.querySelector(
          `meta[${attribute}="${name}"]`
        );

      if (!element) {
        element =
          document.createElement("meta");

        element.setAttribute(
          attribute,
          name
        );

        document.head.appendChild(
          element
        );
      }

      element.setAttribute(
        "content",
        content
      );
    };

    const setLink = (
      rel,
      href
    ) => {
      let element =
        document.head.querySelector(
          `link[rel="${rel}"]`
        );

      if (!element) {
        element =
          document.createElement("link");

        element.setAttribute(
          "rel",
          rel
        );

        document.head.appendChild(
          element
        );
      }

      element.setAttribute(
        "href",
        href
      );
    };

    /* Basic SEO */

    setMeta(
      "name",
      "description",
      description
    );

    setMeta(
      "name",
      "keywords",
      keywords
    );

    setMeta(
      "name",
      "author",
      siteName
    );

    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    /* Open Graph */

    setMeta(
      "property",
      "og:title",
      title
    );

    setMeta(
      "property",
      "og:description",
      description
    );

    setMeta(
      "property",
      "og:type",
      "profile"
    );

    setMeta(
      "property",
      "og:url",
      currentUrl
    );

    setMeta(
      "property",
      "og:site_name",
      siteName
    );

    /* Twitter */

    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "name",
      "twitter:title",
      title
    );

    setMeta(
      "name",
      "twitter:description",
      description
    );

    /* Canonical */

    setLink(
      "canonical",
      currentUrl
    );

    /* Structured Data */

    let structuredData =
      document.getElementById(
        "kas-foundation-team-member-structured-data"
      );

    if (!structuredData) {
      structuredData =
        document.createElement(
          "script"
        );

      structuredData.id =
        "kas-foundation-team-member-structured-data";

      structuredData.type =
        "application/ld+json";

      document.head.appendChild(
        structuredData
      );
    }

    structuredData.textContent =
      JSON.stringify({
        "@context":
          "https://schema.org",

        "@type":
          "Person",

        name:
          memberName,

        description:
          description,

        jobTitle:
          designation,

        url:
          currentUrl,

        memberOf: {
          "@type":
            "Organization",

          name:
            siteName,

          url:
            siteUrl,
        },
      });

    return () => {
      const existingStructuredData =
        document.getElementById(
          "kas-foundation-team-member-structured-data"
        );

      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, [member]);

  const getImageURL = () => {
    const fileId =
      member?.profileImage?.fileId;

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

            <h2>
              Loading...
            </h2>

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

            <h2>
              Team Member Not Found
            </h2>

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

  const imageURL =
    getImageURL();

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

                  <span>
                    No Image
                  </span>

                </div>
              )}

            </div>


            {/* DESCRIPTION */}

            <div className="team-member-content-card">

              <div className="team-member-content-inner">

                <span className="team-member-label">
                  KHEL AUR SHIKSHA FOUNDATION
                </span>

                <h1>
                  {member.name}
                </h1>

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
                      .map(
                        (
                          paragraph,
                          index
                        ) =>
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