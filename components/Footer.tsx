import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
      <div
        className="h-px w-full"
        style={{ background: "rgba(123,47,255,0.55)" }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src="/icondark.png"
            alt="Neural Mesh Tech Logo"
            width={168}
            height={126}
            className="h-28 w-auto object-contain"
          />
          <p className="font-body text-near-white/55 text-[14px] mt-4">
            Software that ships.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:justify-self-end md:text-right">
          {[
            { label: "Services", href: "/services" },
            { label: "Work", href: "/#work" },
            { label: "Process", href: "/#process" },
            { label: "Contact", href: "/#contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="eyebrow text-near-white/70 hover:text-coral transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-violet/20 py-6 px-6 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-near-white/50 leading-relaxed">
        Neural Mesh Tech &copy; {new Date().getFullYear()}{" "}
        <span className="inline-block">
          · Built with intent, not a template.
        </span>
      </div>
    </footer>
  );
}
