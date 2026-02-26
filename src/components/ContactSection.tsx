import { useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Github,
  Send,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { trackFormSubmission, trackEvent } from "../utils/analytics";

export const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "smrxMail",
        "template_9psctrt",
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        },
        "w8Il48fkVMoHG4FM3",
      );

      // Track form submission
      trackFormSubmission("contact_form");
      trackEvent("contact_message_sent", {
        event_category: "engagement",
        event_label: "contact_form",
      });

      alert("Message sent successfully!");

      setContactForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      trackEvent("contact_form_error", {
        event_category: "error",
        event_label: "contact_form",
      });
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-aos="fade-up"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8" data-aos="fade-right">
          <SectionHeading
            title="Let's Build Something Great"
            subtitle="Contact"
          />
          <p className="text-xl text-neutral-500 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-emerald-500">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">
                  Email
                </div>
                <a
                  href="mailto:mohibur.rahman2003@gmail.com"
                  className="font-bold hover:text-emerald-500 transition-colors"
                >
                  mohibur.rahman2003@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-blue-500">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">
                  Phone / WhatsApp
                </div>
                <a
                  href="tel:+8801849314613"
                  className="font-bold hover:text-blue-500 transition-colors"
                >
                  +8801849314613
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-green-500">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">
                  WhatsApp Direct
                </div>
                <a
                  href="https://wa.me/8801849314613"
                  target="_blank"
                  className="font-bold hover:text-green-500 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-blue-600">
                <Facebook size={20} />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">
                  Facebook
                </div>
                <a
                  href="https://facebook.com/mdmohib01"
                  target="_blank"
                  className="font-bold hover:text-blue-600 transition-colors"
                >
                  fb.com/mdmohib01
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-cyan-500">
                <Github size={20} />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">
                  GitHub
                </div>
                <a
                  href="https://github.com/shekhmohibur"
                  target="_blank"
                  className="font-bold hover:text-cyan-500 transition-colors"
                >
                  github.com/shekhmohibur
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleContactSubmit}
          className="glass p-8 md:p-12 rounded-3xl space-y-6 border-neutral-500/10"
          data-aos="fade-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-500 text-neutral-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
          >
            Send Message{" "}
            <Send
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
