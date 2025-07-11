"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ApiError extends Error {
  message: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = t("contactForm.validation.nameRequired");
    }

    if (!formState.email.trim()) {
      newErrors.email = t("contactForm.validation.emailRequired");
    } else if (!validateEmail(formState.email)) {
      newErrors.email = t("contactForm.validation.emailInvalid");
    }

    if (!formState.message.trim()) {
      newErrors.message = t("contactForm.validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }

    // Clear previous submit error if user modifies form after error
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Une erreur est survenue lors de l'envoi du message"
        );
      }

      setSubmitted(true);
    } catch (error: unknown) {
      console.error("Erreur d'envoi:", error);
      const apiError = error as ApiError;
      setSubmitError(
        apiError.message ||
          "Une erreur est survenue. Veuillez réessayer ultérieurement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Different states of the form
  if (submitted) {
    return (
      <motion.div
        className="bg-card-bg rounded-lg p-8 shadow-lg border border-border text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">
          {t("contactForm.success.title")}
        </h3>
        <p className="text-secondary mb-6">
          {t("contactForm.success.message")}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormState({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }}
          className="px-6 py-2 bg-accent hover:bg-accent-secondary text-white rounded-md transition-colors duration-300"
        >
          {t("contactForm.success.sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card-bg rounded-lg p-8 shadow-lg border border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {submitError && (
        <motion.div
          className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {submitError}
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-secondary text-sm font-medium mb-2"
            >
              Nom complet <span className="text-accent">*</span>
            </label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                placeholder="Nom complet"
              />
            </motion.div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-secondary text-sm font-medium mb-2"
            >
              Email <span className="text-accent">*</span>
            </label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                placeholder="adresse@email.com"
              />
            </motion.div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-secondary text-sm font-medium mb-2"
            >
              Téléphone <span className="text-muted">(optionnel)</span>
            </label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="+33 1 23 45 67 89"
              />
            </motion.div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-secondary text-sm font-medium mb-2"
            >
              Sujet <span className="text-muted">(optionnel)</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="Site vitrine">Site vitrine</option>
              <option value="Application web">Application web</option>
              <option value="E-commerce">Boutique en ligne</option>
              <option value="Refonte de site">Refonte de site</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-secondary text-sm font-medium mb-2"
            >
              Message <span className="text-accent">*</span>
            </label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
                  errors.message ? "border-red-500" : "border-border"
                }`}
                placeholder="Décrivez l'univers que vous souhaitez créer..."
              ></textarea>
            </motion.div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 bg-accent hover:bg-accent-secondary text-white rounded-lg shadow-lg transition-all flex items-center space-x-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Envoyer le message</span>
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
