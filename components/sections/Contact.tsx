"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { sendContactEmail } from "@/lib/actions/contact";
import { fadeUp, blurIn, stagger, viewportOnce, spring } from "@/lib/motion";

export function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch (_error: unknown) {
      setFormState("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses =
    "w-full rounded-xl glass px-4 py-3 text-foreground placeholder-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:shadow-lg focus:shadow-primary/10";

  return (
    <Section id="contact" title={t("title")}>
      <div className="mx-auto max-w-2xl">
        <motion.p
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 text-center text-lg text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl glass-frost p-6 md:p-8"
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
              {t("name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="John Doe"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="john@example.com"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`resize-none ${inputClasses}`}
              placeholder="Your message..."
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.button
              type="submit"
              disabled={formState === "loading"}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
            >
              {formState === "loading" ? t("sending") : t("send")}
            </motion.button>
          </motion.div>

          {formState === "success" && (
            <p className="text-center text-sm font-medium text-success">
              {t("success")}
            </p>
          )}
          {formState === "error" && (
            <p className="text-center text-sm font-medium text-error">
              {t("error")}
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
