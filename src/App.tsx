import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  X, 
  Menu, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Award, 
  Layers, 
  GraduationCap, 
  Briefcase, 
  PenTool, 
  Maximize2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import aboutLocalImage from "./assets/about.jpg";
import landingPageVideo from "./assets/LandingPage.mp4";
import hca1 from "./assets/HCA1.JPG";
import hca2 from "./assets/HCA2.JPG";
import hca3 from "./assets/HCA3.JPG";
import goodreads1 from "./assets/Goodreads1.JPG";
import goodreads2 from "./assets/Goodreads2.JPG";
import goodreads3 from "./assets/Goodreads3.JPG";
import goodreads4 from "./assets/Goodreads4.JPG";
import berries1 from "./assets/Berries1.JPG";
import berries2 from "./assets/Berries2.JPG";
import berries3 from "./assets/Berries3.JPG";
import berries4 from "./assets/Berries4.JPG";
import berries5 from "./assets/Berries5.JPG";
import ikaria1 from "./assets/Ikaria1.JPG";
import ikaria2 from "./assets/Ikaria2.JPG";
import ikaria3 from "./assets/Ikaria3.JPG";
import gratis1 from "./assets/Gratis1.JPG";
import gratis2 from "./assets/Gratis2.JPG";
import gratis3 from "./assets/Gratis3.JPG";
import sanctum1 from "./assets/Sanctum1.JPG";
import sanctum2 from "./assets/Sanctum2.JPG";
import sanctum3 from "./assets/Sanctum3.JPG";
import sanctum4 from "./assets/Sanctum4.JPG";
import sanctum5 from "./assets/Sanctum5.JPG";
import sanctum6 from "./assets/Sanctum6.JPG";
import sanctum7 from "./assets/Sanctum7.JPG";

export default function App() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Live Miami (Eastern Time) Clock
  const [miamiTime, setMiamiTime] = useState("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    const updateTime = () => setMiamiTime(formatter.format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lightbox Zoom State with Gallery Navigation
  const [lightboxImg, setLightboxImg] = useState<{
    images: { src: string; caption: string }[];
    imgIndex: number;
    title: string;
  } | null>(null);

  // Carousel Image Index State per project ID
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});

  // Projects Pagination State (3 projects per page across 2 pages)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsTopRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top of projects section whenever currentPage changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (projectsTopRef.current) {
        projectsTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Scroll to top of the page whenever the active nav section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeLink]);

  // Control the landing video behavior by section: loop on Home, replay from the start on Projects/About and on pagination changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeLink === "Home") {
      video.loop = true;
      video.currentTime = 0;
      void video.play().catch(() => undefined);
      return;
    }

    video.loop = false;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [activeLink, currentPage]);

  // Some mobile browsers silently block the initial autoplay attempt (e.g. before the video
  // has buffered), leaving the native paused state visible until something retries play().
  // Retry once data is ready, and once more on the first touch/click as a safety net.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.paused) {
        void video.play().catch(() => undefined);
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

  // Architectural AutoCAD Cursor Refs (Direct DOM updates for 0ms lag)
  const cursorContainerRef = useRef<HTMLDivElement | null>(null);
  const hLineRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);
  const pickboxRef = useRef<HTMLDivElement | null>(null);
  const coordsRef = useRef<HTMLDivElement | null>(null);
  const mouseXRef = useRef<number>(-1000);
  const mouseYRef = useRef<number>(-1000);
  const rafIdRef = useRef<number | null>(null);

  const navLinks = ["Home", "Projects", "About"];

  // Hardware-accelerated mouse tracking for zero-latency AutoCAD crosshair
  useEffect(() => {
    const updateCursorDOM = () => {
      const x = mouseXRef.current;
      const y = mouseYRef.current;

      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      if (pickboxRef.current) {
        pickboxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (coordsRef.current) {
        coordsRef.current.textContent = `AUTOCAD MODE | X: ${Math.round(x)}px | Y: ${Math.round(y)}px`;
      }
      rafIdRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;

      if (cursorContainerRef.current) {
        cursorContainerRef.current.style.opacity = (isModalOpen || lightboxImg) ? "0" : "1";
      }

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateCursorDOM);
      }
    };

    const handleMouseLeave = () => {
      if (cursorContainerRef.current) {
        cursorContainerRef.current.style.opacity = "0";
      }
    };

    const handleMouseDown = () => {
      if (pickboxRef.current) {
        pickboxRef.current.classList.add("w-6", "h-6", "bg-white/30", "ring-2", "ring-white/50");
        pickboxRef.current.classList.remove("w-4", "h-4");
      }
    };

    const handleMouseUp = () => {
      if (pickboxRef.current) {
        pickboxRef.current.classList.remove("w-6", "h-6", "bg-white/30", "ring-2", "ring-white/50");
        pickboxRef.current.classList.add("w-4", "h-4");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isModalOpen, lightboxImg]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || activeLink === "Home") return;

    if (video.currentTime >= 5) {
      video.pause();
      video.currentTime = 5;
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSubmitStatus("submitting");

    const subject = encodeURIComponent(`Portfolio Inquiry from ${email}`);
    const body = encodeURIComponent(`Sender Email: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:zoe.kissoon@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmitStatus("success");
      setEmail("");
      setMessage("");
    }, 1000);
  };

  // Reset contact status when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => setSubmitStatus("idle"), 300);
    }
  }, [isModalOpen]);

  const projectsData = [
    {
      id: "sanctum",
      title: "Sanctum",
      subtitle: "Master's Thesis — Faena Forum, Miami Beach",
      award: "Master Project Award: Creative Risk Taking (2025)",
      category: "Research & Experiential Spatial Design",
      images: [
        { src: sanctum1, caption: "Sanctum Experiential Spatial Model & Light Study" },
        { src: sanctum2, caption: "Sacred Motifs & Stained Glass Communion Lounge Elevation" },
        { src: sanctum3, caption: "Attention Restoration Spatial Layout & Floral Column Details" },
        { src: sanctum4, caption: "Sanctum Interior Material Study" },
        { src: sanctum5, caption: "Communion Lounge Spatial Composition" },
        { src: sanctum6, caption: "Floral Column Detail & Ritual Experience" },
        { src: sanctum7, caption: "Sanctum Final Presentation Rendering" }
      ],
      paragraphs: [
        "Sanctum was created as a solution to the question: 'Using Social Cognitive and Attention Restoration Theories, how can loneliness and social isolation in tech dependent individuals be addressed through spatial strategies derived from sacred and ritual architecture?' In answering this question, the idea to create a place of worship and religious exchange transpired, because churches, mosques, temples, etc. are inherently places of gathering.",
        "The issue of technological dependence and lowered social interaction is a 2-part problem. First, we must redirect user attention from their phones. In solving this, attributes of sacred architecture such as light, scale, and pattern are utilized as another means of visual stimulus. To resolve social interaction, there must be a plethora of social spaces and seating arrangements that give the user the freedom to choose how they interact with the space and each other.",
        "Grounding the design in biophilic elements, floral column motifs, stained glass elevations, and a central Communion Lounge, Sanctum was recognized with the 2025 Master Project Award at Florida International University."
      ],
      tags: ["Attention Restoration", "Faena Forum", "Sacred Motifs", "Spatial Research", "Revit & AutoCAD"]
    },
    {
      id: "hca-aventura",
      title: "HCA Aventura Hospital Emergency Department Expansion",
      subtitle: "Healthcare Interior Architecture",
      award: "Healthcare Studio Expansion Project",
      category: "Healthcare & Emergency Department Design",
      images: [
        { src: hca1, caption: "HCA Aventura Emergency Reception & Waiting Lounge" },
        { src: hca2, caption: "Reception Desk Detail with Travertine White Porcelain Veneer" },
        { src: hca3, caption: "Patient Flow Wayfinding & Clinical Waiting Area" }
      ],
      paragraphs: [
        "This reception space was designed to establish a calm, efficient first point of contact for patients while reinforcing HCA’s emphasis on clarity, care, and professionalism. The layout prioritizes intuitive wayfinding and clear sightlines to reduce stress upon arrival, while material selections and lighting were chosen to create a welcoming yet clinical-appropriate environment.",
        "The reception desk acts as both a functional hub and a visual anchor, balancing privacy for staff with approachability for visitors. Overall, the design supports smooth patient flow, accessibility, and a reassuring first impression within a high-volume healthcare setting.",
        "Material selections include Travertine White Porcelain wall veneer, Smoke Bush Rose wall finish, Teal Tile accents, and Granville Cherry casework with integrated LED light strips and custom 45-degree cut handles."
      ],
      tags: ["Healthcare Design", "Wayfinding", "Travertine Porcelain", "Teal Tile", "Granville Cherry", "Revit & AutoCAD"]
    },
    {
      id: "goodreads",
      title: "The Goodreads Workplace",
      subtitle: "Commercial Corporate Office",
      award: "Corporate Workplace Design Studio",
      category: "Commercial & Corporate Interiors",
      images: [
        { src: goodreads1, caption: "Goodreads Company Library & Collaborative Workplace" },
        { src: goodreads2, caption: "Group Collaboration Lounge with Exposed Industrial Brickwork" },
        { src: goodreads3, caption: "Flexible Work Stations & Linear Spatial Layout" },
        { src: goodreads4, caption: "Additional Goodreads Workplace Detail" }
      ],
      paragraphs: [
        "Goodreads strives to create an environment where users have the power to choose how they would like to work. From an open collaborative space to their own company library, this workplace gives users the option to develop their own space.",
        "Through the combination of the exposed, industrial, and linear elements that create a 'work-in-progress' feel, the Goodreads workplace is an opportunity to re-establish company values of authenticity and experimentation.",
        "The company’s colors of browns and tans are utilized in addition to pops of burgundy, navy blue, and light green to bring in a more modern feel in its pursuit to embrace both the old and the new."
      ],
      tags: ["Workplace Design", "Industrial Aesthetics", "Company Library", "Space Planning", "Revit & Enscape"]
    },
    {
      id: "berries-hotel",
      title: "The Berries Hotel",
      subtitle: "Luxury Hospitality & Entertainment",
      award: "Hospitality Design Studio",
      category: "Hospitality & Art Deco Interiors",
      images: [
        { src: berries1, caption: "The Berries Hotel Mezzanine & Sunberry Jazz Club" },
        { src: berries2, caption: "Sunberry Bar & Curvilinear Art Deco Interior Elevation" },
        { src: berries3, caption: "The Juniper Club Speakeasy Entrance & Velvet Lounge" },
        { src: berries4, caption: "Additional Hotel Lounge Detail" },
        { src: berries5, caption: "Signature Hospitality Interior Rendering" }
      ],
      paragraphs: [
        "The hotel utilizes the symmetrical and curvilinear patterns of the Art Deco Movement of the 1920s. These patterns are reflected by the forms of Le Erté’s 'The Marriage Dance', a famous 1920s print that is defined by its symmetry along its vertical axis, curvilinear circulation, and two distinct forms.",
        "Inspired by the lavish designs of the era, velvet draperies and colors of navy blues, dark greens, dusty roses with gold accents will be utilized throughout the space to evoke the allure of the Roaring 20’s. Spaces recall the glamor of the Prohibition era with dim, moody lighting, intimate seating arrangements, and a sense of mystery through obscured openings and hidden niches.",
        "Includes the Sunberry Bar, Sunberry Restaurant and Jazz Club, The Juniper Club Speakeasy, and Snowberry Spa, paired with signature Art Deco cocktail concepts."
      ],
      tags: ["Art Deco", "Erté Inspiration", "Sunberry Bar", "Jazz Club Speakeasy", "Revit & AutoCAD"]
    },
    {
      id: "ikaria-tbi",
      title: "Ikaria Traumatic Brain Injury Rehabilitation Center",
      subtitle: "Healthcare & Wellness Facility",
      award: "Healthcare & Rehabilitation Design Studio",
      category: "Rehabilitative & Wellness Architecture",
      images: [
        { src: ikaria1, caption: "Ikaria Rehabilitation Gym & Natural Light Courtyard" },
        { src: ikaria2, caption: "Neuropathic Tissue PARTI Spatial Flow & Circular Arches" },
        { src: ikaria3, caption: "Mediterranean Terracotta & Natural Stone Materiality" }
      ],
      paragraphs: [
        "Inspired by Newman’s idea of health as expanding consciousness and King’s framework of interconnected systems, the material composition reflects flow, awareness, and unity. The curved circulation paths converge at a shared center.",
        "The PARTI was developed by examining neuropathic tissue under a microscope. By analyzing the organic and circular shapes in the sample, along with their interconnected nature, these elements were spatially integrated into the project layout.",
        "Ikaria, a Greek island in the Aegean Sea known for having one of the highest percentages of centenarians in the world, inspires the mood board: warm colors of blues, tans, and greens that recall the natural environment through stone caves and blue waters."
      ],
      tags: ["Neuropathic PARTI", "TBI Rehabilitation", "Mediterranean Stone", "Biophilic Wellness", "Revit & Enscape"]
    },
    {
      id: "gratis-lespri",
      title: "Gratis Lespri Retail Store",
      subtitle: "Retail Architecture & Cultural Branding",
      award: "Festival of the Trees Merit Scholarship 2024 Winner: G1 Retail",
      category: "Retail & Cultural Interiors",
      images: [
        { src: gratis1, caption: "Gratis Lespri Retail Storefront & Custom Display Pods" },
        { src: gratis2, caption: "Botanica Medicine Workshop & Communal Cafe Lounge" },
        { src: gratis3, caption: "Préfète Duffaut Inspired Curvilinear Display & Organic Wood Pods" }
      ],
      paragraphs: [
        "In an effort to negate the effects of gentrification within the Miami Design District, Gratis Lespri seeks to evoke the cultural diversity of Haiti through its deeply devout spiritual roots in botanicas. This sense of community is fostered through medicine workshops, a cafe, and lounge areas that nurture a communal response.",
        "Natural colors of browns and greens, as well as elements of wood, are used to describe the organic characteristics of the products and its connections to the earth.",
        "Inspired by the painting by Haitian artist Préfète Duffaut, 'Ville Imaginaire Animée', the design combines curves and linear elements to visually depict the integration of the formal, strict attributes of the Design District (linear) with the vibrant, rich culture of Little Haiti (curves)."
      ],
      tags: ["Festival of Trees Winner", "Miami Design District", "Haitian Botanica", "Préfète Duffaut Inspiration", "Revit & AutoCAD"]
    }
  ];

  return (
    <div className={`relative w-full min-h-screen flex flex-col justify-between overflow-x-clip bg-background text-foreground select-none cursor-auto ${(isModalOpen || lightboxImg) ? 'sm:cursor-auto' : 'sm:cursor-none'}`}>

      {/* ========================================================= */}
      {/* ARCHITECTURAL AUTOCAD DRAFTING CROSSHAIR CURSOR (desktop only) */}
      {/* ========================================================= */}
      <div
        ref={cursorContainerRef}
        className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-0 transition-opacity duration-150 hidden sm:block"
      >
        {/* Horizontal Crosshair Line */}
        <div
          ref={hLineRef}
          className="absolute left-0 right-0 top-0 h-[1px] bg-white/50 will-change-transform"
        />
        {/* Vertical Crosshair Line */}
        <div
          ref={vLineRef}
          className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/50 will-change-transform"
        />

        {/* Central Precision Pickbox Box */}
        <div
          ref={pickboxRef}
          className="absolute top-0 left-0 w-4 h-4 border border-white/90 bg-white/10 flex items-center justify-center transition-[width,height,background-color] duration-75 will-change-transform"
        >
          <div className="w-1 h-1 bg-white rounded-full opacity-90" />
        </div>

        {/* Live Coordinate Badge (Bottom Left) */}
        <div 
          ref={coordsRef}
          className="absolute bottom-4 left-4 font-mono text-[10px] text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 tracking-widest pointer-events-none hidden sm:block shadow-lg"
        >
          AUTOCAD MODE | X: 0px | Y: 0px
        </div>
      </div>

      {/* Fullscreen Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          src={landingPageVideo}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={() => {
            const video = videoRef.current;
            if (video) {
              video.pause();
              if (Number.isFinite(video.duration) && video.duration > 0) {
                video.currentTime = 5;
              }
            }
          }}
        />
        {/* Warm beige overlay to enhance text legibility */}
        <div className="absolute inset-0 bg-[#d9c7a8]/55 mix-blend-multiply z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3d2f22] via-[#6f5a3d]/35 to-[#d8c4a0]/20 z-0 pointer-events-none" />
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-md border-b border-white/[0.05] transition-all">
        <div className="max-w-7xl mx-auto px-8 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <button
            id="nav-logo"
            onClick={() => setActiveLink("Home")}
            className="text-2xl sm:text-3xl tracking-tight text-foreground select-none group flex items-center gap-1 text-left whitespace-nowrap cursor-auto sm:cursor-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Zipporah Kissoon
            <sup className="text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors">®</sup>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-8 py-2.5 rounded-full shadow-inner shadow-white/[0.02]">
            {navLinks.map((link) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  id={`nav-link-${link.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setActiveLink(link)}
                  className={`text-sm tracking-wide transition-all duration-300 relative py-1 whitespace-nowrap cursor-none ${
                    isActive ? "text-foreground font-medium" : "text-[#e4cda8] hover:text-[#fdf3e6]"
                  }`}
                >
                  {link}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">

            {/* Desktop Contact CTA Button */}
            <button
              id="desktop-cta"
              onClick={() => setIsModalOpen(true)}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-foreground hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/10 whitespace-nowrap cursor-none"
            >
              Reach Me
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-foreground hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Slide-Out Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden overflow-y-auto cursor-auto"
          >
            {/* Slide-Out Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
              <span
                className="text-2xl tracking-tight text-foreground select-none whitespace-nowrap"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Zipporah Kissoon
              </span>
              <button
                id="mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-foreground hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slide-Out Nav Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeLink === link;
                return (
                  <button
                    key={link}
                    id={`mobile-nav-link-${link.toLowerCase().replace(" ", "-")}`}
                    onClick={() => {
                      setActiveLink(link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-3xl tracking-tight py-1 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      isActive ? "text-foreground font-medium" : "text-[#e4cda8] hover:text-[#fdf3e6]"
                    }`}
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {link}
                  </button>
                );
              })}
            </div>

            {/* Slide-Out CTA */}
            <div className="px-6 pb-10">
              <button
                id="mobile-drawer-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full text-center py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                Reach Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Display Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 md:py-[80px]">
        <AnimatePresence mode="wait">
          {/* HOME VIEW — Restored to original clean, cinematic full-screen hero layout */}
          {activeLink === "Home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto"
            >
              {/* Main Display Heading */}
              <h1
                id="hero-title"
                className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise select-none"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Where <em className="not-italic text-[#cda97d]">spaces</em> rise <br className="hidden sm:block" />
                <em className="not-italic text-[#cda97d]">through storytelling.</em>
              </h1>

              {/* Narrative Subtext */}
              <p
                id="hero-subtext"
                className="text-[#FAF0E6] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-sans font-normal"
              >
                I craft research-driven hospitality, retail, and spatial interiors—balancing human-centered narrative with material tactile depth, ADA accessibility, and technical precision in Revit and AutoCAD.
              </p>

              {/* Begin Journey CTA Button */}
              <button
                id="hero-cta"
                onClick={() => setActiveLink("Projects")}
                className="liquid-glass rounded-full px-14 py-5 text-base font-medium text-foreground mt-12 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/20 animate-fade-rise-delay-2 whitespace-nowrap cursor-none"
              >
                Begin Journey
              </button>
            </motion.div>
          )}

          {/* PROJECTS VIEW */}
          {activeLink === "Projects" && (
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full mx-auto space-y-12 text-left"
            >
              <div ref={projectsTopRef} className="text-center max-w-3xl mx-auto scroll-mt-24">
                <h1
                  className="text-4xl sm:text-6xl tracking-tight font-normal text-[#e4cda8] select-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  My Work
                </h1>
              </div>

              {/* Projects List with Paragraphs & Picture Frames (3 Projects per page) */}
              <div className="space-y-12">
                {projectsData
                  .slice((currentPage - 1) * 3, currentPage * 3)
                  .map((project, idx) => {
                    const activeIdx = currentImageIndices[project.id] || 0;
                    const currentImg = project.images[activeIdx] || project.images[0];

                    return (
                      <article
                        key={project.id}
                        className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                      >
                        {/* Picture Frame Column with Interactive Multi-Photo Navigation */}
                        <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-last' : ''}`}>
                          <div 
                            onClick={() => setLightboxImg({
                              images: project.images,
                              imgIndex: activeIdx,
                              title: project.title
                            })}
                            className="relative group rounded-2xl overflow-hidden border border-white/10 bg-black/50 cursor-pointer"
                          >
                            <img 
                              src={currentImg.src} 
                              alt={currentImg.caption}
                              className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                            {/* Navigation Button < (Previous Image) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndices((prev) => ({
                                  ...prev,
                                  [project.id]: (activeIdx - 1 + project.images.length) % project.images.length
                                }));
                              }}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/20 transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10 hover:scale-110 active:scale-95"
                              title="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Navigation Button > (Next Image) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndices((prev) => ({
                                  ...prev,
                                  [project.id]: (activeIdx + 1) % project.images.length
                                }));
                              }}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/20 transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10 hover:scale-110 active:scale-95"
                              title="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Counter Badge (e.g., 1 / 3) */}
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-mono text-white/90 z-10">
                              <span>{activeIdx + 1} / {project.images.length}</span>
                            </div>

                            {/* Expand Icon Button (No Text Overlay on Picture) */}
                            <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-white transition-all z-10 opacity-80 group-hover:opacity-100">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Image Caption rendered below the picture frame */}
                          <p className="mt-2.5 text-xs font-mono text-muted-foreground/80 px-1 leading-normal">
                            {currentImg.caption}
                          </p>

                          {/* Project Tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-muted-foreground/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Narrative Paragraphs Column */}
                        <div className="md:col-span-7 space-y-4 text-left">
                          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#f6ebdc] bg-[#5f4632]/60 border border-[#8d6f4c]/40 px-3 py-1 rounded-full">
                            <Award className="w-3.5 h-3.5 text-[#f6ebdc]" />
                            <span>{project.award}</span>
                          </div>

                          <h2
                            className="text-3xl sm:text-4xl tracking-tight text-[#e4cda8]"
                            style={{ fontFamily: "'Instrument Serif', serif" }}
                          >
                            {project.title}
                          </h2>
                          <p className="text-xs font-mono text-[#f6ebdc] uppercase tracking-wider">{project.subtitle} · {project.category}</p>

                          <div className="space-y-3 text-[#f6ebdc] text-xs sm:text-sm leading-relaxed font-sans pt-2">
                            {project.paragraphs.map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>

              {/* Projects Pagination Controls */}
              <div className="pt-6 flex items-center justify-center border-t border-white/[0.08]">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full liquid-glass border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <span className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs font-mono shadow-sm">
                    {currentPage}
                  </span>

                  <button
                    onClick={() => handlePageChange(2)}
                    disabled={currentPage === 2}
                    className="px-4 py-2 rounded-full liquid-glass border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ABOUT VIEW */}
          {activeLink === "About" && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full mx-auto space-y-12 text-left"
            >
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-muted-foreground/80 font-mono mb-2 block">
                  Lauderdale Lakes, Florida · FIU M.Int.Arch
                </span>
                <h1
                  className="text-4xl sm:text-6xl tracking-tight font-normal text-[#e4cda8] select-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  About Zipporah Kissoon
                </h1>
              </div>

              {/* Personal Bio & Contact Summary */}
              <div className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                    <img 
                      src={aboutLocalImage}
                      alt="Zipporah Kissoon"
                      className="w-full h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="p-3 bg-black/60 border-t border-white/10 text-[11px] font-mono text-white/70 text-center">
                      Zipporah (Zoe) Kissoon — M.Int.Arch
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4 text-left">
                  <h2 className="text-3xl font-normal text-[#e4cda8]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Hi there,
                  </h2>

                  <p className="text-[#f6ebdc] text-xs sm:text-sm leading-relaxed font-sans">
                    My name is Zipporah Kissoon, but you can call me Zoe. I have recently received my Master’s in Interior Architecture from Florida International University in Miami, FL (2021 — 2026).
                  </p>

                  <p className="text-[#f6ebdc] text-xs sm:text-sm leading-relaxed font-sans">
                    I’ve lived my whole life in South Florida’s rich and culturally diverse environment and I am passionate about creating areas of comfort and security in the enclosed space. This portfolio is a reflection of my time spent in the program and the skills I have learned in that time. I am glad to share my work with you.
                  </p>

                  <div className="pt-3 space-y-2 border-t border-white/[0.06] text-xs font-mono text-[#f6ebdc]">
                    <p className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-white/80" />
                      <span>Florida International University — M.Int.Arch (2021 — 2026)</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/80" />
                      <span>3910 NW 34th Ave, Lauderdale Lakes, FL, 33309</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-white/80" />
                      <span>zoe.kissoon@gmail.com · 954-859-9720</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Honor Awards & Skills - Vertical Stack with Awards on Top */}
              <div className="flex flex-col gap-8 text-left w-full">
                
                {/* Academic Awards & Scholarships */}
                <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between space-y-6">
                  <h3 className="text-2xl font-normal text-foreground flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    <Award className="w-4 h-4 text-white/80" /> Awards &amp; Honors
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    {[
                      { title: "NEWH South Florida Chapter Scholarship Winner", year: "2025" },
                      { title: "NEWH Design for Inclusivity Scholarship Challenge Recipient", year: "2024" },
                      { title: "Festival of the Trees Merit Scholarship Winner (G1 Retail)", year: "2024" },
                      { title: "Festival of the Trees Merit Scholarship Winner (D3 Pavaza)", year: "2023" },
                    ].map((award, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3 hover:bg-white/[0.06] transition-colors">
                        <p className="font-medium text-foreground">{award.title}</p>
                        <span className="font-mono text-[10px] text-white/70 bg-white/10 px-2.5 py-1 rounded-full shrink-0">{award.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Software Skills */}
                <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between space-y-6">
                  <h3 className="text-2xl font-normal text-foreground flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    <PenTool className="w-4 h-4 text-white/80" /> Technical Skills
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                    {[
                      { name: "AutoCAD", score: "5 / 5" },
                      { name: "Revit", score: "5 / 5" },
                      { name: "Adobe Photoshop", score: "4 / 5" },
                      { name: "Adobe InDesign", score: "4 / 5" },
                      { name: "Sketching", score: "5 / 5" },
                      { name: "Graphic Presentation", score: "5 / 5" },
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-white/60 text-[10px] mt-1.5">{skill.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox Modal for Picture Frames with Multi-Photo Controls */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-black/90 border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 text-left cursor-default"
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 group">
                <img 
                  src={lightboxImg.images[lightboxImg.imgIndex].src} 
                  alt={lightboxImg.images[lightboxImg.imgIndex].caption} 
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />

                {/* Lightbox < Previous Button */}
                <button
                  onClick={() => {
                    setLightboxImg((prev) => prev ? {
                      ...prev,
                      imgIndex: (prev.imgIndex - 1 + prev.images.length) % prev.images.length
                    } : null);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Lightbox > Next Button */}
                <button
                  onClick={() => {
                    setLightboxImg((prev) => prev ? {
                      ...prev,
                      imgIndex: (prev.imgIndex + 1) % prev.images.length
                    } : null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Lightbox Image Counter Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white/90 z-20">
                  {lightboxImg.imgIndex + 1} / {lightboxImg.images.length}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-white/80">
                <div>
                  <h3 className="text-xl font-normal text-white mb-0.5" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {lightboxImg.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {lightboxImg.images[lightboxImg.imgIndex].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Minimalist Personal Footer */}
      <footer className="relative z-10 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-end text-right text-xs font-mono text-[#f6ebdc] bg-transparent">
          Zipporah Kissoon <span id="miami-time" className="select-none">&nbsp;| {miamiTime}</span>
        </div>
      </footer>

      {/* Direct Personal Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-auto">
            
            {/* Backdrop with elegant blur */}
            <motion.div
              id="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              id="modal-body"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-lg liquid-glass rounded-3xl border border-white/[0.08] shadow-2xl p-8 sm:p-10 text-left z-10 overflow-hidden cursor-default"
            >
              {/* Subtle ambient light source */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                id="modal-close"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {submitStatus !== "success" ? (
                  <motion.div
                    key="form-state"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-muted-foreground/80" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">Contact Zipporah</span>
                    </div>
                    
                    <h2 
                      className="text-4xl tracking-tight text-[#e4cda8] mb-3"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      Let's connect.
                    </h2>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">
                      Whether you have an inquiry regarding interior design projects, studio collaboration, or full-time opportunities, please feel free to reach out.
                    </p>

                    {/* Quick Direct Contacts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                      <a href="mailto:zoe.kissoon@gmail.com" className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-white/80 transition-colors cursor-pointer">
                        <Mail className="w-3.5 h-3.5 text-white/60 shrink-0" />
                        <span className="truncate">zoe.kissoon@gmail.com</span>
                      </a>
                      <a href="tel:9548599720" className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-white/80 transition-colors cursor-pointer">
                        <Phone className="w-3.5 h-3.5 text-white/60 shrink-0" />
                        <span className="truncate">954-859-9720</span>
                      </a>
                      <a href="https://www.linkedin.com/in/zipporah-kissoon" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-white/80 transition-colors cursor-pointer">
                        <Linkedin className="w-3.5 h-3.5 text-white/60 shrink-0" />
                        <span className="truncate">LinkedIn</span>
                      </a>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <div>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address (required)"
                          className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-white/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none cursor-text"
                        />
                      </div>

                      <div>
                        <textarea
                          id="contact-message"
                          rows={3}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your message or project inquiry... (required)"
                          className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-white/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none cursor-text"
                        />
                      </div>

                      <button
                        id="submit-button"
                        type="submit"
                        disabled={!email.trim() || !message.trim() || submitStatus === "submitting"}
                        className="w-full bg-white text-black hover:bg-white/90 font-medium text-sm rounded-full py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                      >
                        {submitStatus === "submitting" ? (
                          <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6">
                      <Check className="w-6 h-6 text-foreground" />
                    </div>
                    
                    <h2 
                      className="text-4xl tracking-tight text-foreground mb-3"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      Message Sent.
                    </h2>
                    
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed font-sans mb-8">
                      Thank you for reaching out. I will respond to your inquiry as soon as possible.
                    </p>

                    <button
                      id="success-close"
                      onClick={() => setIsModalOpen(false)}
                      className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.03] transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
                    >
                      Return to Portfolio
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
