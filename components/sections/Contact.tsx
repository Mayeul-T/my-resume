"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { sendContactEmail } from "@/lib/actions/contact";

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

  return (
    <Section id="contact" title={t("title")}>
      <div className="mx-auto max-w-2xl">
        <AnimatedElement className="text-center">
          <p className="mb-8 text-lg text-muted-foreground">{t("subtitle")}</p>
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-colors duration-normal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-colors duration-normal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted transition-colors duration-normal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-normal hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formState === "loading" ? t("sending") : t("send")}
            </button>

            {/* Status Messages */}
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
          </form>
        </AnimatedElement>
      </div>
    </Section>
  );
}
