import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import "./App.css";
// ============================================================================
// OPTION 4: HIGH-PERFORMANCE LIVE SYSTEM METRICS RIBBON COMPONENT
// ============================================================================
function SystemMetrics() {
  const [ping, setPing] = useState(14);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    // Continuously simulate active runtime data pipeline ticks
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * (19 - 11 + 1)) + 11);
      setFps(Math.floor(Math.random() * (62 - 58 + 1)) + 58);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-metrics-ribbon">
      <div className="metrics-scroll-wrapper">
        <span>● ENGINE_STATUS: ACTIVE</span>
        <span>● PORT: 5173</span>
        <span>● PING: {ping}ms</span>
        <span>● ENVIRONMENT: PRODUCTION</span>
        <span>● GRAPHICS_PIPELINE: WEBGL_2.0</span>
        <span>● STREAM_INTEGRITY: SECURED</span>
        <span>● RENDER_SPEED: {fps}FPS</span>
      </div>
    </div>
  );
}

// ============================================================================
// OPTION 3: KINETIC MAGNETIC BUTTON ELEMENT WRAPPER
// ============================================================================
function MagneticWrapper({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Map absolute focal midpoint boundary coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate targeted proximity pull offsets
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply a magnetic pull radius constraint
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    // Reset element positioning cleanly on boundary exit
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

const SKILLS = [
  { category: "Languages", items: ["Java", "Python", "C", "SQL", "JavaScript"] },
  { category: "Frontend & Backend", items: ["React.js", "Vite", "Node.js", "Express.js", "HTML5", "CSS3"] },
  { category: "Databases & Core", items: ["MySQL", "MongoDB", "Data Structures", "Algorithms", "Software Engineering"] }
];

const PROJECTS = [
  {
    title: "CampusCare",
    category: "Complaint Management System",
    tags: ["React.js", "Node.js", "Express.js", "MySQL"],
    description: "Developed a comprehensive grievance logging platform deploying synchronized student and administrator dashboards. Implemented complaint registration tracking frameworks, verification systems, and real-time status timelines.",
    link: "https://github.com/AMIRTHAMOZHIVS/Campus_Care"
  },
  {
    title: "Next Cart",
    category: "E-Commerce Architecture",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description: "Built an e-commerce ecosystem integrating secure session registration modules, custom login pathways, dynamic catalog product searches, and optimized cart layout state updates.",
    link: "https://github.com/AMIRTHAMOZHIVS/Next_cart"
  },
  {
    title: "CPU Scheduling Simulator",
    category: "Operating Systems Visualization",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "Engineered an operational browser layout tool displaying complex CPU priority execution metrics. Renders fully interactive Gantt Charts alongside calculated waiting and turnaround performance matrix structures.",
    link: "https://github.com/AMIRTHAMOZHIVS/CPU_SCHEDULING"
  }
];

const EDUCATION_CERTIFICATIONS = {
  edu: [
    { period: "2024 - 2028", degree: "B.E. Computer Science and Engineering", school: "Kongu Engineering College", meta: "Current CGPA: 8.52" },
    { period: "2023 - 2024", degree: "Higher Secondary (CS Maths)", school: "R.G. Matric Higher Secondary School", meta: "Final Score: 93.16%" }
  ],
  certs: [
    "NPTEL Human Computer Interaction (Elite Grade Evaluation Status)",
    "NPTEL Privacy and Security in Online Social Media Systems",
    "Professional React.js Client-Side Engineering Certification"
  ]
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! Welcome to my private space. Ask me anything about my full stack skills, machine learning internship, or projects! Your thread is completely confidential." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Framer Motion scroll tracker tracking scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("seenSplash");
    if (hasSeenSplash) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const handleFinishLoading = () => {
    setIsLoading(false);
    sessionStorage.setItem("seenSplash", "true");
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 90;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    const userQuery = inputValue.toLowerCase().trim();
    setInputValue("");

    setTimeout(() => {
      let response = "I've logged your request, but I couldn't quite map that to a specific project module. Try asking me about my 'projects', 'technical skills', 'internship', or how to 'contact' me!";

      if (userQuery.includes("project") || userQuery.includes("campuscare") || userQuery.includes("cart") || userQuery.includes("cpu")) {
        response = "I have built three major applications: 1️⃣ CampusCare (a Complaint Management System using React and MySQL), 2️⃣ Next Cart (a MERN stack e-commerce architecture), and 3️⃣ a CPU Scheduling Simulator in vanilla JavaScript. Which one would you like to know more about?";
      } 
      else if (userQuery.includes("skill") || userQuery.includes("language") || userQuery.includes("code") || userQuery.includes("java") || userQuery.includes("python")) {
        response = "My technical stack spans languages like Java, Python, C, SQL, and JavaScript. On the web engineering side, I build robust systems using React.js, Vite, Node.js, Express.js, and MongoDB.";
      } 
      else if (userQuery.includes("intern") || userQuery.includes("cubeai") || userQuery.includes("work") || userQuery.includes("experience")) {
        response = "I am currently working as a Machine Learning Intern at CubeAI Solutions, where I assist in developing and optimizing intelligent data models alongside my academic coursework.";
      } 
      else if (userQuery.includes("education") || userQuery.includes("college") || userQuery.includes("kongu") || userQuery.includes("cgpa")) {
        response = "I am pursuing my B.E. in Computer Science and Engineering at Kongu Engineering College (Class of 2028), maintaining an active CGPA of 8.52. I completed my schooling at R.G. Matric with a 93.16% score.";
      } 
      else if (userQuery.includes("contact") || userQuery.includes("email") || userQuery.includes("phone") || userQuery.includes("hire")) {
        response = "Let's connect! You can reach me directly via email at amirthshan06@gmail.com or call me at +91 94434 98599. My location coordinates are Tamil Nadu, India.";
      }
      else if (userQuery.includes("resume") || userQuery.includes("cv") || userQuery.includes("download")) {
        response = "You can download a hard copy of my professional resume directly using the PDF button in the top navigation header or the action link in the footer layout!";
      }
      else if (userQuery.includes("hello") || userQuery.includes("hi") || userQuery.includes("hey")) {
        response = "Hello! I am Amirthamozhi's secure session assistant. Ask me anything about his engineering capabilities, academic credentials, or recent project builds!";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: response }]);
    }, 550);
  };

  return (
    <div className="portfolio-container">
      
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          
          {/* Top Scrolling Progress Bar indicator */}
          <motion.div className="scroll-progress-bar" style={{ scaleX }} />

          {/* Navigation Bar */}
          <nav className="nav-bar">
            <span className="nav-logo">AMIRTHAMOZHI //</span>
            <div className="nav-links">
              <a href="#about" onClick={(e) => scrollToSection(e, "about")}>About</a>
              <a href="#skills" onClick={(e) => scrollToSection(e, "skills")}>Skills</a>
              <a href="#showcase" onClick={(e) => scrollToSection(e, "showcase")}>Projects</a>
              <a href="#credentials" onClick={(e) => scrollToSection(e, "credentials")}>Timeline</a>
              <a href="/resume.pdf" download="Amirthamozhi_VS_Resume.pdf" className="nav-resume-btn">Resume ⬇</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="nav-cta">Connect</a>
            </div>
            
            {/* INJECTED SYSTEM METRICS RIBBON */}
            <SystemMetrics />
          </nav>

          {/* Hero Section */}
          <section id="about" className="hero-section">
            <div className="hero-split-layout">
              <div className="hero-text-block">
                <span className="status-badge">● ML Intern @ CubeAI Solutions || CSE Student</span>
                <h1 className="main-title">
                  Engineering secure applications from <br />
                  <span className="gradient-text">data algorithms to UI components.</span>
                </h1>
                <p className="description">
                  Hi, I'm <strong style={{color: '#fff', fontWeight: '700'}}>Amirthamozhi V S</strong>. I'm a Computer Science Engineering undergrad at Kongu Engineering College combining scalable database modeling with high-performance web development tools.
                </p>
                
                <div className="social-icons-row">
                  <MagneticWrapper>
                    <a href="https://github.com/AMIRTHAMOZHIVS" target="_blank" rel="noreferrer" title="GitHub Profile" className="icon-wrapper">
                      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  </MagneticWrapper>

                  <MagneticWrapper>
                    <a href="https://www.linkedin.com/in/amirthamozhivs" target="_blank" rel="noreferrer" title="LinkedIn Profile" className="icon-wrapper">
                      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </MagneticWrapper>

                  <MagneticWrapper>
                    <a href="https://leetcode.com/u/AMIRTHAMOZHIVS/" target="_blank" rel="noreferrer" title="LeetCode Profile" className="icon-wrapper">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.411L7.11 5.826a1.374 1.374 0 0 0-.411.961c0 .365.148.717.411.961l5.412 5.411a1.365 1.365 0 0 0 1.923 0c.263-.26.411-.61.411-.96a1.365 1.365 0 0 0-.411-.962L9.982 6.79l3.501-3.5a1.373 1.373 0 0 0-.001-1.942A1.376 1.376 0 0 0 13.483 0zm-6.22 10.457a1.36 1.36 0 0 0-.954.398l-4.14 4.14a1.365 1.365 0 0 0 0 1.923l5.411 5.411c.267.267.63.415.962.415.334 0 .697-.148.961-.415l4.141-4.14a1.365 1.365 0 0 0 0-1.923l-5.411-5.412a1.354 1.354 0 0 0-.97-.397z"/></svg>
                    </a>
                  </MagneticWrapper>
                </div>
              </div>

              <div className="hero-image-block">
                <div className="profile-image-container">
                  <img src="/profile.jpeg" alt="Amirthamozhi V S Portrait" className="profile-img" />
                  <div className="image-accent-border"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="skills-section">
            <div className="section-container">
              <p className="section-subtitle"> Engineering Frameworks</p>
              <h2 className="section-title">Technical Capabilities</h2>
              <div className="skills-grid">
                {SKILLS.map((group, idx) => (
                  <div key={idx} className="skills-card">
                    <h3 className="skills-category-title">{group.category}</h3>
                    <div className="skills-chip-wrapper">
                      {group.items.map((skill, i) => (
                        <span key={i} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Selected Work Grid */}
          <section id="showcase" className="showcase-section">
            <div className="section-container">
              <p className="section-subtitle"> Deployed Projects</p>
              <h2 className="section-title">Selected Work</h2>
              <div className="projects-grid">
                {PROJECTS.map((project, index) => (
                  <div key={index} className="project-card">
                    <div>
                      <span className="project-category">{project.category}</span>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-description">{project.description}</p>
                    </div>
                    <div>
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                      <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                        Explore Codebase <span>→</span>
                      </a>
                   // </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education & Credentials */}
          <section id="credentials" className="skills-section" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="section-container">
              <p className="section-subtitle"> Academic Paths</p>
              <h2 className="section-title">Education & Credentials</h2>
              <div className="skills-grid">
                <div className="skills-card">
                  <h3 className="skills-category-title">Education History</h3>
                  {EDUCATION_CERTIFICATIONS.edu.map((edu, i) => (
                    <div key={i} className="edu-item">
                      <div className="edu-meta-row">
                        <span className="edu-period">{edu.period}</span>
                        <span className="edu-score">{edu.meta}</span>
                      </div>
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <p className="edu-school">{edu.school}</p>
                    </div>
                  ))}
                </div>
                <div className="skills-card">
                  <h3 className="skills-category-title">Professional Validation</h3>
                  <ul className="certs-list-ul">
                    {EDUCATION_CERTIFICATIONS.certs.map((cert, i) => <li key={i}>{cert}</li>)}
                    <li>Executive Member — College CSE Association (2025 - 2026)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Interface */}
          <footer id="contact" className="portfolio-footer">
            <div className="footer-content">
              <h2>Let's build something exceptional together.</h2>
              <p className="footer-meta-text">Direct Contact: +91 94434 98599 // Tamil Nadu, India</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
                <a href="mailto:amirthshan06@gmail.com" className="email-link-btn">amirthshan06@gmail.com</a>
                <a href="/resume.pdf" download="Amirthamozhi_VS_Resume.pdf" className="footer-resume-btn">Download Resume PDF</a>
              </div>
              <div className="footer-bottom-meta">
                <p>© {new Date().getFullYear()} — Amirthamozhi V S</p>
                <p className="footer-subtext">Isolated Thread Stream Secured</p>
              </div>
            </div>
          </footer>

          {/* Session Isolated Secure Chat UI Widget */}
          <div className="chat-widget-wrapper">
            <AnimatePresence>
              {chatOpen && (
                <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} className="chat-window">
                  <div className="chat-header">
                    <h4>Private Session Assistant</h4>
                    <button onClick={() => setChatOpen(false)}>✕</button>
                  </div>
                  <div className="chat-messages-container">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`chat-bubble-row ${msg.sender === "user" ? "user-align" : "bot-align"}`}>
                        <span className={`chat-bubble ${msg.sender === "user" ? "user-style" : "bot-style"}`}>{msg.text}</span>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Send a private message..." />
                    <button type="submit">Send</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <button className="chat-trigger-btn" onClick={() => setChatOpen(!chatOpen)}>
              {chatOpen ? "Close Chat" : "💬 Chat Safely"}
            </button>
          </div>

        </motion.div>
      )}
    </div>
  );
}