import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/ContactFormEmail";
import AutoReplyEmail from "@/emails/AutoReplyEmail";

// Vérifier si la clé API est disponible
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL || "contact@anthracite.app";

// Initialiser Resend avec la clé API si disponible
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Interface pour les données du formulaire
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Interface pour les erreurs
interface ApiError extends Error {
  message: string;
}

// Fonction pour valider l'email
const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export async function POST(request: NextRequest) {
  try {
    // Récupérer et valider les données du formulaire
    const body: ContactFormData = await request.json();

    const { name, email, phone, subject, message } = body;

    // Validation de base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Le nom, l'email et le message sont requis" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Si la clé API Resend n'est pas disponible, retourner une réponse mock
    if (!resend) {
      console.warn(
        "Clé API Resend non configurée. Émulation de réponse réussie pour le développement."
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Mode développement: Email non envoyé mais formulaire validé",
          notificationId: "dev_mode_no_email_sent",
          autoReplyId: "dev_mode_no_email_sent",
        },
        { status: 200 }
      );
    }

    // Notifications par email - paralléliser l'envoi des deux emails
    const [notificationResponse, autoReplyResponse] = await Promise.all([
      // 1. Email de notification pour vous (le propriétaire du site)
      resend.emails.send({
        from: `Contact Form <contact@anthracite.app>`,
        to: contactEmail,
        subject: `Nouveau message de ${name}: ${subject || "Demande de contact"}`,
        replyTo: email,
        react: ContactFormEmail({
          name,
          email,
          phone: phone || "Non renseigné",
          subject: subject || "Demande de contact",
          message,
        }),
      }),

      // 2. Email de confirmation pour l'utilisateur
      resend.emails.send({
        from: `Anthracite Applications <contact@anthracite.app>`,
        to: email,
        subject: `Votre message a bien été reçu - Anthracite Applications`,
        react: AutoReplyEmail({
          name,
          subject: subject || "votre message",
        }),
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès",
        notificationId: notificationResponse.data?.id,
        autoReplyId: autoReplyResponse.data?.id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Erreur d'envoi d'email:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'envoi du message",
        details: apiError.message,
      },
      { status: 500 }
    );
  }
}
