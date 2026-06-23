import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? "backdrop-blur-md" : ""
        }`}
        style={{ backgroundColor: scrolled || isOpen ? "rgba(15,13,26,0.95)" : "transparent" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center z-50">
            <img src="/totalfavicon.png" alt="Neural Mesh Tech Logo" className="h-10 md:h-12 w-auto object-contain" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-[12px] uppercase tracking-[0.18em] text-near-white/80 hover:text-coral transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <a href="/#contact" className="btn-violet !py-2.5 !px-5 !text-[12px]">
              Let's Talk
            </a>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-near-white p-2 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="h-px w-full" style={{ background: "rgba(123,47,255,0.3)" }} />
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0F0D1A] flex flex-col justify-center px-8 transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {links.map((l, index) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className={`font-display text-[28px] font-semibold text-near-white hover:text-coral transition-all duration-300 transform ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {l.label}
            </a>
          ))}
          <div
            className={`mt-8 transform transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${links.length * 75}ms` }}
          >
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="btn-violet inline-flex !py-3.5 !px-8 text-[15px]"
            >
              Let's Talk
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
