import { Check } from "lucide-react";
import "./JoinCommunity.css";

function JoinCommunity() {
  const programs = [
    {
      title: "COMMUNITY PROGRAMS",
      text: "Free and low-cost sports programs for kids and youth.",
    },
    {
      title: "SCHOLARSHIPS & SUPPORT",
      text: "Helping talented players with training and education support.",
    },
    {
      title: "EXPERT COACHING",
      text: "Qualified coaches guiding players in football and other sports.",
    },
    {
      title: "OPPORTUNITIES TO GROW",
      text: "Access to tournaments, events, and career development in sports.",
    },
  ];

  return (
    <section className="join-community-section">
      {/* TOP BLUE CTA */}
      <div className="join-community-banner">
        <h2>JOIN OUR COMMUNITY</h2>

        <div className="join-community-action">
          <span className="join-community-arrow">↘</span>

          <a href="/contact" className="join-community-button">
            BOOK A TRIAL
          </a>
        </div>
      </div>

      {/* PROGRAMS */}
      <div className="join-community-programs">
        {programs.map((program) => (
          <div className="join-community-item" key={program.title}>
            <div className="join-community-check">
              <Check size={29} strokeWidth={3.2} />
            </div>

            <div className="join-community-content">
              <h3>{program.title}</h3>

              <p>{program.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JoinCommunity;
