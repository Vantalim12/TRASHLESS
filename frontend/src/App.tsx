import React, { useState, useEffect } from "react";
import "./App.css";
import MobileMenu from "./components/MobileMenu";
import "./components/MobileMenu.css";
import "./components/Roadmap.css";
import AdminPanel from "./components/AdminPanel";
import "./components/AdminPanel.css";

interface TeamStats {
  wasteReduced: string;
  communitiesServed: number;
  activeMembers: number;
  projectsCompleted: number;
  volume24h: string;
  marketCap: string;
  price: string;
  isTokenLaunched: boolean;
  tonsOfGarbageCollected: number;
  garbageLastUpdated: string;
}

function App() {
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: "",
    alt: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    // Fetch stats from backend
    const API_BASE_URL =
      process.env.REACT_APP_API_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://trashless-backend1.onrender.com"
        : "http://localhost:5000");

    fetch(`${API_BASE_URL}/api/stats`)
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => {
        console.error("Error fetching stats:", error);
        // Fallback to mock data in production if API fails
        if (process.env.NODE_ENV === "production") {
          setStats({
            volume24h: "$77.0K",
            marketCap: "$68.9K",
            price: "$0.00006944",
            isTokenLaunched: true,
            wasteReduced: "2,500 kg",
            communitiesServed: 12,
            activeMembers: 150,
            projectsCompleted: 8,
            tonsOfGarbageCollected: 15.5,
            garbageLastUpdated: new Date().toLocaleDateString(),
          });
        }
      });
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://trashless-backend1.onrender.com"
          : "http://localhost:5000");

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();
      setSubmitMessage(result.message);
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitMessage("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        // 5 clicks to open admin panel
        setShowAdminPanel(true);
        return 0;
      }
      return newCount;
    });
    // Reset click count after 3 seconds
    setTimeout(() => setClickCount(0), 3000);
  };

  const handleLogoAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
    const logo = e.currentTarget as HTMLDivElement;
    logo.style.transform = "scale(0.95)";
    setTimeout(() => {
      logo.style.transform = "";
    }, 150);
  };

  const handleImageClick = (
    src: string,
    alt: string,
    name: string,
    role: string
  ) => {
    setSelectedImage({ src, alt, name, role });
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage({ src: "", alt: "", name: "", role: "" });
  };

  // Roadmap data
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      status: "completed",
      timeline: "Sep 23-29, 2024",
      items: [
        "Website development and branding",
        "Community building and awareness",
        "Initial garbage collection programs",
        "Token development and testing",
      ],
    },
    {
      phase: "Phase 2",
      title: "Token Launch - Week 1",
      status: "upcoming",
      timeline: "Oct 1-7, 2024",
      items: [
        "Pump.fun token launch preparation",
        "Smart contract deployment",
        "Initial liquidity setup",
        "Community announcement",
      ],
    },
    {
      phase: "Phase 3",
      title: "Token Launch - Week 2",
      status: "upcoming",
      timeline: "Oct 8-14, 2024",
      items: [
        "Pump.fun token public launch",
        "Community token distribution",
        "Trading pair establishment",
        "Marketing campaign launch",
      ],
    },
    {
      phase: "Phase 4",
      title: "Token Launch - Week 3",
      status: "upcoming",
      timeline: "Oct 15-21, 2024",
      items: [
        "Pump.fun token community growth",
        "Expand to 5+ communities",
        "Mobile app development start",
        "Partnership outreach",
      ],
    },
    {
      phase: "Phase 5",
      title: "Token Launch - Week 4",
      status: "upcoming",
      timeline: "Oct 22-28, 2024",
      items: [
        "Pump.fun token ecosystem expansion",
        "NFT collection planning",
        "Advanced waste tracking system design",
        "International expansion research",
      ],
    },
    {
      phase: "Phase 6",
      title: "Ecosystem Growth",
      status: "upcoming",
      timeline: "Nov 2024",
      items: [
        "NFT collection launch",
        "Partnerships with local governments",
        "Advanced waste tracking system",
        "International expansion",
      ],
    },
    {
      phase: "Phase 7",
      title: "Global Impact",
      status: "upcoming",
      timeline: "Dec 2024",
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

  const renderPage = () => {
    return (
      <>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>Making Our Community's Trash Lesser Than Before</h1>
            <p>
              We are a dedicated team of 4 individuals committed to reducing
              waste and creating a more sustainable future for our community.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => window.open("https://pump.fun/", "_blank")}
              >
                Trade $TRASHFUN
              </button>
              <button
                className="btn-secondary"
                onClick={() =>
                  window.open("https://x.com/trashfunpump", "_blank")
                }
              >
                Join X
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/trashfun.png" alt="Environmental cleanup" />
          </div>
        </section>

        {/* Stats Section */}
        {stats && (
          <section className="stats">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{stats.wasteReduced}</h3>
                  <p>Waste Reduced</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.communitiesServed}</h3>
                  <p>Communities Served</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.activeMembers}</h3>
                  <p>Active Members</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.projectsCompleted}</h3>
                  <p>Projects Completed</p>
                </div>
              </div>

              {/* Token & Garbage Collection Stats */}
              <div className="stats-grid token-stats">
                <div className="stat-card token-card">
                  <h3>{stats.volume24h}</h3>
                  <p>24h Volume</p>
                  {!stats.isTokenLaunched && (
                    <span className="coming-soon">Token Coming Soon</span>
                  )}
                </div>
                <div className="stat-card token-card">
                  <h3>{stats.marketCap}</h3>
                  <p>Market Cap</p>
                  {!stats.isTokenLaunched && (
                    <span className="coming-soon">Token Coming Soon</span>
                  )}
                </div>
                <div className="stat-card garbage-card">
                  <h3>{stats.tonsOfGarbageCollected} tons</h3>
                  <p>Garbage Collected</p>
                  <small>
                    Last updated:{" "}
                    {new Date(stats.garbageLastUpdated).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Our Mission</h2>
                <p>
                  At TRASHFUN, we believe that small actions can create big
                  changes. Our mission is to reduce waste in our community
                  through innovative solutions, education, and collective
                  action.
                </p>
                <p>
                  We focus on sustainable practices, community engagement, and
                  environmental awareness to create lasting positive impact.
                </p>
                <ul className="mission-points">
                  <li>♻️ Promote recycling and waste reduction</li>
                  <li>🌍 Educate communities about environmental impact</li>
                  <li>🤝 Foster collaboration for sustainability</li>
                  <li>💡 Develop innovative waste management solutions</li>
                </ul>
              </div>
              <div className="about-image">
                <img src="/trashPic.jpg" alt="Community cleanup" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="team">
          <div className="container">
            <h2>Meet Our Team</h2>
            <p>
              Four passionate individuals working together to make a difference
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">
                  <img
                    src="/Environmental Specialist.png"
                    alt="Environmental Specialist"
                    onClick={() =>
                      handleImageClick(
                        "/Environmental Specialist.png",
                        "Environmental Specialist",
                        "Team Member 1",
                        "Environmental Specialist"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <h3>Team Member 1</h3>
                <p>Environmental Specialist</p>
                <p>
                  Passionate about sustainable solutions and community outreach.
                </p>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img
                    src="/Tech Lead.png"
                    alt="Tech Lead"
                    onClick={() =>
                      handleImageClick(
                        "/Tech Lead.png",
                        "Tech Lead",
                        "Team Member 2",
                        "Technology Lead"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <h3>Team Member 2</h3>
                <p>Technology Lead</p>
                <p>
                  Develops innovative tools for waste tracking and management.
                </p>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img
                    src="/Community Coordinator.png"
                    alt="Community Coordinator"
                    onClick={() =>
                      handleImageClick(
                        "/Community Coordinator.png",
                        "Community Coordinator",
                        "Team Member 3",
                        "Community Coordinator"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <h3>Team Member 3</h3>
                <p>Community Coordinator</p>
                <p>Builds partnerships and organizes community initiatives.</p>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img
                    src="/Operations Manager.png"
                    alt="Operations Manager"
                    onClick={() =>
                      handleImageClick(
                        "/Operations Manager.png",
                        "Operations Manager",
                        "Team Member 4",
                        "Operations Manager"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <h3>Team Member 4</h3>
                <p>Operations Manager</p>
                <p>Ensures smooth execution of all TRASHFUN projects.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="roadmap">
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
                    <div className="phase-icon">
                      {getStatusIcon(item.status)}
                    </div>
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
                Be part of the movement that's making our communities cleaner
                and more sustainable. Follow our progress and contribute to our
                mission.
              </p>
              <div className="roadmap-actions">
                <button className="btn-primary">Join Community</button>
                <button className="btn-secondary">Track Progress</button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2>Get In Touch</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <strong>📧 Email:</strong>
                  <p>trashfun@gmai.com</p>
                </div>
                <div className="contact-item">
                  <strong>📞 Phone:</strong>
                  <p>+1 (+63) 9914769174</p>
                </div>
                <div className="contact-item">
                  <strong>📍 Address:</strong>
                  <p>
                    Lanao del Norte
                    <br />
                    Mindanao, Philippines
                  </p>
                </div>
                <div className="contact-item">
                  <strong>🕒 Office Hours:</strong>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
                {submitMessage && (
                  <div
                    className={`form-message ${
                      submitMessage.includes("Error") ? "error" : "success"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>🌱 TRASHFUN</h3>
                <p>Making our community's trash lesser than before.</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#team">Team</a>
                  </li>
                  <li>
                    <a href="#roadmap">Roadmap</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://facebook.com" aria-label="Facebook">
                    📘
                  </a>
                  <a href="https://x.com/trashfunpump" aria-label="Twitter">
                    🐦
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram">
                    📷
                  </a>
                  <a href="https://linkedin.com" aria-label="LinkedIn">
                    💼
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; 2024 TRASHFUN. All rights reserved. | Built with 💚 for
                the environment
              </p>
            </div>
          </div>
        </footer>
      </>
    );
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="nav-logo"
            onClick={handleLogoClick}
            onMouseDown={handleLogoAnimation}
            style={{ cursor: "pointer" }}
            title={`Click ${5 - clickCount} more times for admin panel`}
            data-clicks={clickCount > 0 ? clickCount : undefined}
          >
            <img
              src="/trashfun.png"
              alt="Trashfun Logo"
              className="logo-image"
            />
            <h2>TRASHFUN</h2>
            {clickCount > 0 && (
              <span className="click-counter">{clickCount}/5</span>
            )}
          </div>
          <ul className="nav-menu desktop-menu">
            <li>
              <a href="#home" onClick={() => setCurrentPage("home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setCurrentPage("home")}>
                About
              </a>
            </li>
            <li>
              <a href="#team" onClick={() => setCurrentPage("home")}>
                Team
              </a>
            </li>
            <li>
              <a href="#roadmap" onClick={() => setCurrentPage("home")}>
                Roadmap
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setCurrentPage("home")}>
                Contact
              </a>
            </li>
          </ul>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onPageChange={setCurrentPage}
          />
        </div>
      </nav>

      {renderPage()}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeImageModal}>
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />
            <div className="modal-info">
              <h3>{selectedImage.name}</h3>
              <p>{selectedImage.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
