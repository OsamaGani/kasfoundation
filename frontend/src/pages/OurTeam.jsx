import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinCommunity from "../components/JoinCommunity";

import "./OurTeam.css";

const placeholderImage =
  "https://placehold.co/800x1000/e9ebf5/0637a5?text=Team+Member";

const teamMembers = [
  {
    name: "SAUD YOUSAF",
    role: "Founder & Chairman",
    image: placeholderImage,
    slug: "saud-yousaf",
  },
  {
    name: "ZOHAIR ALTAF GONDAL",
    role: "Director Operations",
    image: placeholderImage,
    slug: "zohair-altaf-gondal",
  },
  {
    name: "ARSHAD NADEEM",
    role: "Coaching",
    image: placeholderImage,
    slug: "arshad-nadeem",
  },
  {
    name: "MUHAMMAD HARIS",
    role: "Left Back",
    image: placeholderImage,
    slug: "muhammad-haris",
  },
  {
    name: "MUHAMMAD NOOR",
    role: "Centre Back",
    image: placeholderImage,
    slug: "muhammad-noor",
  },
  {
    name: "ABDUL RAHIM",
    role: "Striker",
    image: placeholderImage,
    slug: "abdul-rahim",
  },
  {
    name: "RAMZAN",
    role: "Left Winger",
    image: placeholderImage,
    slug: "ramzan",
  },
  {
    name: "WALID",
    role: "Right Back",
    image: placeholderImage,
    slug: "walid",
  },
  {
    name: "HAMAD",
    role: "Goalkeeper",
    image: placeholderImage,
    slug: "hamad",
  },
  {
    name: "REHAN",
    role: "Central Midfielder",
    image: placeholderImage,
    slug: "rehan",
  },
  {
    name: "TALHA",
    role: "Central Midfielder",
    image: placeholderImage,
    slug: "talha",
  },
  {
    name: "KASHIF",
    role: "Right Back",
    image: placeholderImage,
    slug: "kashif",
  },
  {
    name: "SHAHBAZ ALI",
    role: "Centre Back",
    image: placeholderImage,
    slug: "shahbaz-ali",
  },
];

function OurTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="our-team-page">
        <section className="our-team-header">
          <h1>OUR STAFF</h1>

          <p className="staff-description">
            At The Grassroots Foundation, our dedicated team works tirelessly to
            inspire, guide, and empower young talent. Each member of our staff
            brings unique expertise, passion, and commitment to helping children
            achieve their dreams through football and education.
          </p>
        </section>

        <section className="our-team-section">
          <div className="our-team-grid">
            {teamMembers.map((member, index) => {
              const cardContent = (
                <>
                  <div className="team-card-image">
                    <img src={member.image} alt={member.name} />
                  </div>

                  <div className="team-card-info">
                    <h2>{member.name}</h2>
                    <p>{member.role}</p>
                  </div>
                </>
              );

              return (
                <Link
                  key={member.name}
                  to={`/team/${member.slug}`}
                  className="team-card"
                  style={{
                    "--card-delay": `${index * 0.08}s`,
                  }}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <div className="our-team-floating-contact">
        <a
          href="tel:+0000000000"
          className="our-team-phone"
          aria-label="Call us"
        >
          <Phone size={23} />
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="our-team-whatsapp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </a>
      </div>

      <JoinCommunity />

      <Footer />
    </>
  );
}

export default OurTeam;
