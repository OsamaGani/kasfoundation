
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import "./EventDetails.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/banners`;

// KAS Foundation WhatsApp number (country code included)
const WHATSAPP_NUMBER = "919004630950";

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

        const response = await fetch(`${API_URL}/${id}`);
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            "Unable to load event details. Please try again later."
          );
        }

        const data = await response.json();

        if (!response.ok || !data.success || !data.banner) {
          throw new Error(
            data.message || "Event details could not be loaded."
          );
        }

        if (!cancelled) {
          setEvent(data.banner);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Something went wrong. Please try again."
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
        <div className="event-state-card">
          <div className="event-loader" />
          <h2>Loading event</h2>
          <p>Please wait while we prepare the details.</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="event-details-page">
        <div className="event-state-card">
          <span className="event-eyebrow">KAS FOUNDATION</span>
          <h2>Event unavailable</h2>
          <p>{error || "This event could not be found."}</p>

          <Link to="/" className="event-primary-button">
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

  // WhatsApp message with the current event title
  const whatsappMessage = `Hello KAS Foundation!

I'm interested in participating in the ${
    event.title || "KAS Foundation event"
  }.

Please share the participation details and next steps.

Thank you!`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="event-details-page">
      <div className="event-details-container">
        <nav className="event-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{event.category || "Event"}</span>
        </nav>

        <section className="event-hero">
          <div className="event-poster-panel">
            <div className="event-poster-glow" />

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={event.title || "KAS Foundation event poster"}
                className="event-details-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="event-poster-placeholder">
                <Sparkles size={40} />
                <span>KAS Foundation</span>
              </div>
            )}

            <div className="event-poster-caption">
              <ShieldCheck size={17} />
              <span>Organised by KAS Foundation</span>
            </div>
          </div>

          <div className="event-hero-content">
            <div className="event-brand-label">
              <span className="event-brand-dot" />
              <span>KHEL AUR SHIKSHA FOUNDATION</span>
            </div>

            <span className="event-details-category">
              <Sparkles size={14} />
              {event.category || "Announcement"}
            </span>

            <h1>{event.title || "KAS Foundation Event"}</h1>

            {event.shortDescription && (
              <p className="event-details-intro">
                {event.shortDescription}
              </p>
            )}

            <div className="event-hero-divider" />

            <div className="event-organiser">
              <div className="event-organiser-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <strong>KAS Foundation</strong>
                <span>Empowering through sports and education</span>
              </div>
            </div>

            {/* WhatsApp Interest Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-whatsapp-button"
            >
              <MessageCircle size={20} />
              <span>I'm Interested</span>
              <ArrowUpRight size={18} />
            </a>

            {/* Optional registration button */}
            {registrationUrl && (
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-primary-button"
              >
                {event.buttonText || "Register Now"}
                <ArrowUpRight size={19} />
              </a>
            )}

            <p className="event-hero-footnote">
              Discover opportunities. Participate. Make an impact.
            </p>
          </div>
        </section>

        <section className="event-about-section">
          <div className="event-about-heading">
            <div>
              <span className="event-section-kicker">
                EVENT OVERVIEW
              </span>
              <h2>About This Event</h2>
            </div>

            <div className="event-heading-icon">
              <CalendarDays size={23} />
            </div>
          </div>

          <div className="event-full-description">
            {event.fullDescription ||
              "More information about this event will be available soon."}
          </div>

          <div className="event-bottom-banner">
            <div className="event-bottom-icon">
              <Sparkles size={23} />
            </div>

            <div>
              <h3>Be part of something meaningful.</h3>
              <p>
                Stay connected with KAS Foundation for upcoming events,
                activities and opportunities.
              </p>
            </div>
          </div>

          <div className="event-page-footer">
            <Link to="/" className="event-back-link">
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <span>© KAS Foundation</span>
          </div>
        </section>
      </div>
    </main>
  );
}
