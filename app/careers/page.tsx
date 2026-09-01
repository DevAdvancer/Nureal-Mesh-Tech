"use client";

import { useState } from "react";
import Link from "next/link";

const ROLES = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    description: "Build performant, beautiful user interfaces using React, Next.js, and Tailwind CSS. You will own the frontend for our core products.",
  },
  {
    id: "backend-developer",
    title: "Backend Engineer",
    type: "Full-time",
    location: "Remote",
    description: "Design and implement scalable APIs, work with Node.js/Python, and optimize databases to handle our growing user base.",
  },
  {
    id: "ai-engineer",
    title: "AI/ML Engineer",
    type: "Full-time",
    location: "Remote",
    description: "Train, tune, and deploy machine learning models. You should be comfortable with Python, PyTorch/TensorFlow, and prompt engineering.",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    type: "Contract",
    location: "Remote",
    description: "Create pixel-perfect, intuitive user experiences. You will collaborate closely with engineering to turn wireframes into reality.",
  }
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverLetter: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setStatus("submitting");
    try {
      const roleDetails = ROLES.find(r => r.id === selectedRole);
      const roleName = roleDetails ? roleDetails.title : selectedRole;
      
      const message = `Role: ${roleName}\nPortfolio: ${formData.portfolio}\n\nCover Letter:\n${formData.coverLetter}`;

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ name: "", email: "", portfolio: "", coverLetter: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0D1A] text-near-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow text-violet mb-4">Join Us</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">Build the future with us.</h1>
          <p className="text-lg text-near-white/70 max-w-2xl">
            We are always looking for exceptional talent to join our team. 
            If you are passionate about building great products, we want to talk to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Roles List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-medium text-coral mb-6">Open Roles</h2>
            {ROLES.map((role) => (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 border cursor-pointer transition-all duration-200 ${selectedRole === role.id ? 'border-violet bg-violet/10' : 'border-[#7B2FFF]/30 bg-transparent hover:border-violet/60'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium">{role.title}</h3>
                  <span className="text-xs font-mono bg-violet/20 text-violet px-2 py-1 rounded">
                    {role.type}
                  </span>
                </div>
                <p className="text-sm text-near-white/60 mb-4">{role.location}</p>
                <p className="text-sm text-near-white/80">{role.description}</p>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="bg-[#1C1A26] p-8 border border-white/5 h-fit sticky top-32">
            <h2 className="text-2xl font-display font-medium mb-6">
              {selectedRole ? `Apply for ${ROLES.find(r => r.id === selectedRole)?.title}` : "Select a role to apply"}
            </h2>
            
            {status === "success" ? (
              <div className="bg-sage/10 text-sage p-6 border border-sage/30 text-center">
                <h3 className="text-xl mb-2">Application Received!</h3>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => { setStatus("idle"); setSelectedRole(null); }}
                  className="mt-6 btn-violet !text-xs"
                >
                  Apply for another role
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`space-y-4 ${!selectedRole ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-near-white/60 mb-2">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-input w-full"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-near-white/60 mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-input w-full"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-near-white/60 mb-2">Portfolio / LinkedIn / GitHub</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="contact-input w-full"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-near-white/60 mb-2">Cover Letter</label>
                  <textarea
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="contact-input w-full h-32 resize-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-coral text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={!selectedRole || status === "submitting"}
                  className="btn-violet w-full justify-center mt-4 disabled:opacity-50"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
