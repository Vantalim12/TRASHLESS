import React from "react";
import "./Roadmap.css";

const Roadmap: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      status: "completed",
      timeline: "Q1 2024",
      items: [
        "Website development and branding",
        "Community building and awareness",
        "Initial garbage collection programs",
        "Token development and testing",
      ],
    },
    {
      phase: "Phase 2",
      title: "Token Launch & Expansion",
      status: "current",
      timeline: "Q2 2024",
      items: [
        "Pump.fun token launch",
        "Community token distribution",
        "Expand to 5+ communities",
        "Mobile app development",
      ],
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Growth",
      status: "upcoming",
      timeline: "Q3 2024",
      items: [
        "NFT collection launch",
        "Partnerships with local governments",
        "Advanced waste tracking system",
        "International expansion",
      ],
    },
    {
      phase: "Phase 4",
      title: "Global Impact",
      status: "upcoming",
      timeline: "Q4 2024",
      items: [
        "Global community network",
        "Carbon credit integration",
        "AI-powered waste optimization",
        "Major corporate partnerships",
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "current":
        return "🚀";
      case "upcoming":
        return "⏳";
      default:
        return "📋";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "completed";
      case "current":
        return "current";
      case "upcoming":
        return "upcoming";
      default:
        return "";
    }
  };

  return (
    <div className="roadmap">
      <div className="container">
        <div className="roadmap-header">
          <h2>Our Roadmap</h2>
          <p>Building a sustainable future, one milestone at a time</p>
        </div>

        <div className="roadmap-timeline">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`roadmap-item ${getStatusClass(item.status)}`}
            >
              <div className="roadmap-phase">
                <div className="phase-icon">{getStatusIcon(item.status)}</div>
                <div className="phase-info">
                  <h3>{item.phase}</h3>
                  <h4>{item.title}</h4>
                  <span className="timeline">{item.timeline}</span>
                </div>
              </div>

              <div className="roadmap-content">
                <ul className="roadmap-items">
                  {item.items.map((roadmapItem, itemIndex) => (
                    <li key={itemIndex} className="roadmap-item-text">
                      {roadmapItem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="roadmap-footer">
          <h3>Join Our Journey</h3>
          <p>
            Be part of the movement that's making our communities cleaner and
            more sustainable. Follow our progress and contribute to our mission.
          </p>
          <div className="roadmap-actions">
            <button className="btn-primary">Join Community</button>
            <button className="btn-secondary">Track Progress</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
