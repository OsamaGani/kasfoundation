
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import "./EventDetails.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/banners`;

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      try {
        setLoading(true);
        setError("");
        setEvent(null);

        if (!id) {
          throw new Error("Event ID nahi mila.");
        }

        const response = await fetch(`${API_URL}/${id}`);
        console.log("Event API URL:", `${API_URL}/${id}`);
console.log("Response status:", response.status);
console.log("Response content type:", response.headers.get("content-type"));

        const contentType =
          response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            "Backend se JSON response nahi mila. API URL check karo."
          );
        }

        const data = await response.json();

        if (!response.ok || !data.success || !data.banner) {
          throw new Error(
            data.message || "Event load nahi ho paya."
          );
        }

        if (!cancelled) {
          setEvent(data.banner);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Event load karte waqt error aaya."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="event-details-page">
        <div className="event-details-status">
          <p>Loading event details...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="event-details-page">
        <div className="event-details-status">
          <h2>Event unavailable</h2>
          <p>{error || "This event could not be found."}</p>

          <Link to="/" className="event-back-link">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = event.image?.fileId
    ? `${API_URL}/image/${event.image.fileId}`
    : "";

  const registrationUrl = event.registrationUrl?.trim() || "";

  return (
    <main className="event-details-page">
      <div className="event-details-container">
        <Link to="/" className="event-back-link">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {imageUrl && (
          <div className="event-details-image-wrap">
            <img
              src={imageUrl}
              alt={event.title || "KAS Foundation event"}
              className="event-details-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <article className="event-details-card">
          <span className="event-details-category">
            {event.category || "Announcement"}
          </span>

          <h1>{event.title || "KAS Foundation Event"}</h1>

          {event.shortDescription && (
            <p className="event-details-intro">
              {event.shortDescription}
            </p>
          )}

          <div className="event-details-divider" />

          <h2>About This Event</h2>

          <div className="event-full-description">
            {event.fullDescription ||
              "Event details will be updated soon."}
          </div>

          <div className="event-details-note">
            <CalendarDays size={22} />

            <div>
              <strong>Stay Connected</strong>
              <p>
                Follow KAS Foundation for event updates and
                participation information.
              </p>
            </div>
          </div>

          {registrationUrl && (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-register-button"
            >
              {event.buttonText || "Register Now"}
              <ArrowUpRight size={18} />
            </a>
          )}

          <Link to="/" className="event-home-button">
            <ArrowLeft size={17} />
            Return to Home
          </Link>
        </article>
      </div>
    </main>
  );
}
