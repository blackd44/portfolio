export type ContactField = "name" | "email" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  subject: { max: 150 },
  message: { min: 10, max: 5000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < CONTACT_LIMITS.name.min)
    errors.name = "Your name is too short.";
  else if (name.length > CONTACT_LIMITS.name.max)
    errors.name = `Your name must be under ${CONTACT_LIMITS.name.max} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (subject.length > CONTACT_LIMITS.subject.max)
    errors.subject = `The subject must be under ${CONTACT_LIMITS.subject.max} characters.`;

  if (!message) errors.message = "Please write a message.";
  else if (message.length < CONTACT_LIMITS.message.min)
    errors.message = `Your message must be at least ${CONTACT_LIMITS.message.min} characters.`;
  else if (message.length > CONTACT_LIMITS.message.max)
    errors.message = `Your message must be under ${CONTACT_LIMITS.message.max} characters.`;

  return errors;
}
