import { useState } from "react";

// ─── Job Data ────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Zync Labs",
    salary: "₹6–9 LPA",
    type: "Remote",
    location: "Anywhere",
    description:
      "Join Zync Labs to craft pixel-perfect UIs using React and Tailwind. You'll collaborate with designers and backend engineers to ship features used by 500K+ users. We believe in async-first culture, good documentation, and genuine ownership.",
    requirements: ["React.js", "CSS/Tailwind", "REST APIs", "Git"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Blueframe Studio",
    salary: "₹5–8 LPA",
    type: "Full-Time",
    location: "Bangalore",
    description:
      "Blueframe Studio is looking for a passionate designer to lead product design across our SaaS tools. You'll own the end-to-end design process—from user research and wireframes to polished Figma prototypes and design systems.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Stackify",
    salary: "₹8–12 LPA",
    type: "Full-Time",
    location: "Hyderabad",
    description:
      "Stackify builds infrastructure tools for growing startups. As a Backend Developer, you'll design scalable REST APIs, manage PostgreSQL databases, and implement microservices using Node.js and Docker in a fast-paced agile team.",
    requirements: ["Node.js", "PostgreSQL", "Docker", "REST APIs"],
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Insightful AI",
    salary: "₹4–7 LPA",
    type: "Remote",
    location: "Anywhere",
    description:
      "Turn raw data into stories that drive decisions. At Insightful AI, you'll build dashboards in Power BI, run SQL queries, and work directly with business teams to identify growth opportunities and operational improvements.",
    requirements: ["SQL", "Power BI", "Python", "Excel"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNest",
    salary: "₹10–15 LPA",
    type: "Full-Time",
    location: "Pune",
    description:
      "CloudNest powers CI/CD pipelines for 200+ companies. You'll manage Kubernetes clusters, automate deployments, and improve reliability across AWS and GCP environments. Strong Linux skills and cloud enthusiasm required.",
    requirements: ["Kubernetes", "AWS/GCP", "CI/CD", "Linux"],
  },
  {
    id: 6,
    title: "Mobile Developer",
    company: "Appify",
    salary: "₹7–11 LPA",
    type: "Remote",
    location: "Anywhere",
    description:
      "Appify creates delightful consumer apps for iOS and Android. You'll build features in React Native, integrate third-party SDKs, and optimize app performance. We ship weekly and celebrate fast learners.",
    requirements: ["React Native", "iOS/Android", "REST APIs", "TypeScript"],
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── Shared Nav ──────────────────────────────────────────────────────────────
const Nav = ({ navigate }) => (
  <nav style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.1rem 2.5rem", background: "var(--nav-bg)",
    borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100,
    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)"
  }}>
    <span
      onClick={() => navigate("home")}
      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.35rem", color: "var(--accent)", cursor: "pointer", letterSpacing: "-0.5px" }}
    >
      Quick<span style={{ color: "var(--text-primary)" }}>Hire</span>
    </span>
    <div style={{ display: "flex", gap: "0.6rem" }}>
      <NavBtn onClick={() => navigate("home")}>Home</NavBtn>
      <NavBtn onClick={() => navigate("jobs")} accent>Browse Jobs</NavBtn>
    </div>
  </nav>
);

const NavBtn = ({ children, onClick, accent }) => (
  <button onClick={onClick} style={{
    background: accent ? "var(--accent)" : "transparent",
    color: accent ? "#fff" : "var(--text-secondary)",
    border: accent ? "none" : "1px solid var(--border)",
    borderRadius: "8px", padding: "0.45rem 1.1rem",
    fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.88rem",
    cursor: "pointer", transition: "all 0.2s"
  }}>{children}</button>
);

// ─── Home Page ───────────────────────────────────────────────────────────────
const HomePage = ({ navigate }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    navigate("jobs", { search: query });
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", maxWidth: "680px", position: "relative" }}>
        <span style={{ display: "inline-block", background: "var(--tag-bg)", color: "var(--accent)", borderRadius: "999px", padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem", border: "1px solid var(--accent-muted)" }}>
          🚀 For students & freshers
        </span>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-1.5px" }}>
          Find Your Dream<br />
          <span style={{ color: "var(--accent)" }}>Job Today.</span>
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Discover remote and full-time opportunities curated for students. No experience? No problem.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", maxWidth: "520px", margin: "0 auto 1.5rem", background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: "14px", padding: "0.5rem 0.5rem 0.5rem 1.2rem", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}><SearchIcon /></div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder='Try "Designer" or "Developer"'
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "1rem", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
          />
          <button onClick={handleSearch} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.6rem 1.4rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
            Search
          </button>
        </div>

        <button
          onClick={() => navigate("jobs")}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "var(--text-secondary)", border: "1.5px solid var(--border)", borderRadius: "10px", padding: "0.75rem 1.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          Browse All Jobs <ArrowIcon />
        </button>

        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "3.5rem" }}>
          {[["6+", "Open Roles"], ["3", "Job Types"], ["100%", "Free to Apply"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--accent)" }}>{num}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Job Card ────────────────────────────────────────────────────────────────
const JobCard = ({ job, onClick }) => (
  <div
    onClick={() => onClick(job)}
    style={{ background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: "16px", padding: "1.4rem 1.6rem", cursor: "pointer", transition: "all 0.22s" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
        <BriefcaseIcon /> {job.company}
      </div>
      <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "999px", background: job.type === "Remote" ? "rgba(99,240,180,0.12)" : "rgba(99,102,241,0.12)", color: job.type === "Remote" ? "#22c987" : "var(--accent)", border: `1px solid ${job.type === "Remote" ? "rgba(99,240,180,0.25)" : "rgba(99,102,241,0.25)"}` }}>
        {job.type}
      </span>
    </div>

    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>{job.title}</h3>

    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.95rem" }}>{job.salary}</span>
      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
        <PinIcon /> {job.location}
      </span>
    </div>

    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {job.requirements.slice(0, 3).map(r => (
        <span key={r} style={{ fontSize: "0.75rem", padding: "0.25rem 0.65rem", background: "var(--tag-bg)", color: "var(--text-secondary)", borderRadius: "6px", border: "1px solid var(--border)" }}>{r}</span>
      ))}
    </div>
  </div>
);

// ─── Jobs List Page ───────────────────────────────────────────────────────────
const JobsPage = ({ navigate, initialSearch = "" }) => {
  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState("All");

  const filtered = JOBS.filter(j => {
    const matchFilter = filter === "All" || j.type === filter;
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-primary)", marginBottom: "0.4rem", letterSpacing: "-0.5px" }}>All Jobs</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.8rem" }}>{filtered.length} role{filtered.length !== 1 ? "s" : ""} found</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem", alignItems: "center" }}>
        <div style={{ display: "flex", flex: 1, minWidth: "200px", alignItems: "center", gap: "0.5rem", background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: "10px", padding: "0.5rem 1rem" }}>
          <span style={{ color: "var(--text-muted)" }}><SearchIcon /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search job title or company..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", "Remote", "Full-Time"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "var(--accent)" : "var(--card-bg)", color: filter === f ? "#fff" : "var(--text-secondary)", border: `1.5px solid ${filter === f ? "var(--accent)" : "var(--border)"}`, borderRadius: "8px", padding: "0.5rem 1.1rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", transition: "all 0.18s" }}>{f}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>No jobs match your search.</div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>Try a different keyword or clear the filter.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {filtered.map(job => <JobCard key={job.id} job={job} onClick={j => navigate("detail", { job: j })} />)}
        </div>
      )}
    </div>
  );
};

// ─── Job Detail Page ─────────────────────────────────────────────────────────
const DetailPage = ({ job, navigate }) => {
  const [applied, setApplied] = useState(false);

  if (!job) { navigate("jobs"); return null; }

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <button onClick={() => navigate("jobs")} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: "var(--text-secondary)", border: "1.5px solid var(--border)", borderRadius: "8px", padding: "0.45rem 1rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", marginBottom: "2rem" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
      ><BackIcon /> Back to Jobs</button>

      <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: "20px", padding: "2.2rem", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.8rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--text-primary)", margin: "0 0 0.4rem", letterSpacing: "-0.5px" }}>{job.title}</h1>
            <div style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.4rem" }}><BriefcaseIcon /> {job.company}</div>
          </div>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "0.4rem 1rem", borderRadius: "999px", background: job.type === "Remote" ? "rgba(99,240,180,0.12)" : "rgba(99,102,241,0.12)", color: job.type === "Remote" ? "#22c987" : "var(--accent)", border: `1px solid ${job.type === "Remote" ? "rgba(99,240,180,0.25)" : "rgba(99,102,241,0.25)"}` }}>
            {job.type}
          </span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.8rem", paddingBottom: "1.8rem", borderBottom: "1px solid var(--border)" }}>
          <Chip label="Salary" value={job.salary} />
          <Chip label="Location" value={job.location} />
        </div>

        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.8rem", fontSize: "1rem" }}>About this Role</h4>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.8rem", fontSize: "0.97rem" }}>{job.description}</p>

        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.8rem", fontSize: "1rem" }}>Skills Required</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {job.requirements.map(r => (
            <span key={r} style={{ padding: "0.4rem 0.9rem", background: "var(--tag-bg)", color: "var(--text-secondary)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.88rem" }}>{r}</span>
          ))}
        </div>

        {!applied ? (
          <button
            onClick={() => setApplied(true)}
            style={{ width: "100%", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "12px", padding: "1rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Apply Now →
          </button>
        ) : (
          <div style={{ background: "rgba(34,201,135,0.1)", border: "1.5px solid rgba(34,201,135,0.3)", borderRadius: "12px", padding: "1.2rem", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
              <span style={{ color: "#22c987", display: "flex" }}><CheckIcon /></span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#22c987", fontSize: "1.1rem" }}>Application Submitted!</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>We'll get back to you within 3–5 business days. 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Chip = ({ label, value }) => (
  <div style={{ background: "var(--tag-bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.45rem 0.9rem" }}>
    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block" }}>{label}</span>
    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent)", fontSize: "0.95rem" }}>{value}</span>
  </div>
);

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [pageProps, setPageProps] = useState({});

  const navigate = (target, props = {}) => {
    setPage(target);
    setPageProps(props);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0d0f14;
          --nav-bg: rgba(13,15,20,0.85);
          --card-bg: #13161e;
          --border: rgba(255,255,255,0.08);
          --accent: #6366f1;
          --accent-muted: rgba(99,102,241,0.25);
          --tag-bg: rgba(255,255,255,0.04);
          --text-primary: #f1f3f9;
          --text-secondary: #8b8fa8;
          --text-muted: #565970;
          --shadow-lg: 0 20px 60px rgba(0,0,0,0.4);
        }
        body { background: var(--bg); color: var(--text-primary); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        ::selection { background: rgba(99,102,241,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>

      <Nav navigate={navigate} />

      {page === "home" && <HomePage navigate={navigate} />}
      {page === "jobs" && <JobsPage navigate={navigate} initialSearch={pageProps.search || ""} />}
      {page === "detail" && <DetailPage job={pageProps.job} navigate={navigate} />}
    </>
  );
}