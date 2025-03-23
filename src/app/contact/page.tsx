import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Anthracite Apps",
  description:
    "Contactez-moi pour discuter de votre projet web. Je suis à votre écoute et prêt à répondre à vos besoins spécifiques.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background overflow-hidden relative">
        {/* Background effects */}
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-500 to-blue-500">
                  Parlons de votre projet
                </h1>
                <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                  J&apos;ai hâte de transformer votre vision en réalité numérique. 
                  Prenez contact pour que nous puissions discuter de votre projet ensemble.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="bg-card-bg p-8 rounded-2xl shadow-lg border border-accent/10 h-full backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 gradient-accent">
                      Mes coordonnées
                    </h2>

                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Email
                          </h3>
                          <p className="text-secondary">
                            <a
                              href="mailto:contact@anthracite-applications.com"
                              className="hover:text-accent transition-colors"
                            >
                              contact@anthracite-applications.com
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Téléphone
                          </h3>
                          <p className="text-secondary">
                            <a
                              href="tel:+33631156784"
                              className="hover:text-accent transition-colors"
                            >
                              +33 6 31 15 67 84
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Adresse
                          </h3>
                          <p className="text-secondary">Grenoble, France</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 p-6 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-accent/10">
                      <h3 className="text-xl font-semibold mb-2 text-primary">
                        À partir de 200€
                      </h3>
                      <p className="text-secondary mb-4">
                        Des solutions web modernes et sur mesure adaptées à votre budget
                      </p>
                      <div className="flex gap-2">
                        <div className="w-1/3 h-1 bg-accent/30 rounded-full"></div>
                        <div className="w-1/2 h-1 bg-accent/20 rounded-full"></div>
                        <div className="w-1/4 h-1 bg-accent/10 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="bg-card-bg p-8 rounded-2xl border border-border shadow-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

                    <h2 className="text-2xl font-bold mb-6 gradient-accent">
                      Envoyez-moi un message
                    </h2>
                    <ContactForm />
                  </div>
                </div>
              </div>

              <div className="text-center mt-12 text-secondary">
                <p>
                  Je réponds généralement dans un délai de 24 heures ouvrées.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
