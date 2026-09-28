"use client";

import InputAutoHeight from "@/app/_components/form/autoHeight";
import Input from "@/app/_components/form/input";
import {
  CONTACT_LIMITS,
  ContactErrors,
  ContactField,
  validateContact,
} from "@/utils/contact";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const empty = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [sending, setSending] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const errors = validateContact(values);
  const errorFor = (field: ContactField) =>
    (submitted || touched[field] ? errors[field] : undefined) ??
    serverErrors[field];

  const changed = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const touch = (field: ContactField) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSubmitted(true);
    if (Object.keys(errors).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setServerErrors(data.errors);
        throw new Error(data.error);
      }

      toast.success("Message sent, I'll get back to you soon!");
      setValues(empty);
      setTouched({});
      setSubmitted(false);
      setFormKey((k) => k + 1);
    } catch (err) {
      toast.error(
        (err instanceof Error && err.message) ||
          "Couldn't send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const messageLength = values.message.trim().length;

  return (
    <form key={formKey} onSubmit={submit} noValidate>
      <Input
        label="Full Name"
        name="name"
        onChange={changed}
        onBlur={touch("name")}
        error={errorFor("name")}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        onChange={changed}
        onBlur={touch("email")}
        error={errorFor("email")}
        required
      />
      <Input
        label="Subject (optional)"
        name="subject"
        onChange={changed}
        onBlur={touch("subject")}
        error={errorFor("subject")}
      />
      <InputAutoHeight
        label="Message"
        name="message"
        onChange={changed}
        onBlur={touch("message")}
        error={errorFor("message")}
        hint={`${messageLength}/${CONTACT_LIMITS.message.max}`}
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        onChange={changed}
        className="absolute left-[-9999px] size-px opacity-0"
      />
      <button type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
