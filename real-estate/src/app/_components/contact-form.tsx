"use client";

import { startTransition, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Enter a full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a contact number"),
  message: z.string().min(12, "Tell us a bit more"),
});

type ContactFields = z.infer<typeof contactSchema>;

type ContactFormProps = {
  title: string;
  description: string;
  buttonLabel: string;
  propertySlug?: string;
  agentEmail?: string;
};

export function ContactForm({
  title,
  description,
  buttonLabel,
  propertySlug,
  agentEmail,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pending, startLocalTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setApiError(null);
    startLocalTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, propertySlug, agentEmail }),
        });

        if (!res.ok) {
          const data = (await res.json()) as { error?: string };
          setApiError(data.error ?? "Something went wrong. Please try again.");
          return;
        }

        startTransition(() => {
          setSubmitted(`Thank you, ${values.name}. We'll be in touch shortly.`);
          reset();
        });
      } catch {
        setApiError("Network error. Please try again.");
      }
    });
  });

  const inputClass =
    "w-full rounded-2xl border border-line bg-panel px-4 py-3 outline-none focus:border-sky";

  return (
    <div className="luxury-panel p-6">
      <div className="mb-6 space-y-2">
        <p className="eyebrow">Get in touch</p>
        <h3 className="font-serif text-3xl">{title}</h3>
        <p className="text-sm leading-7 text-muted">{description}</p>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block space-y-2 text-sm font-medium">
          Name
          <input {...register("name")} className={inputClass} />
          {errors.name && <span className="text-xs text-sky">{errors.name.message}</span>}
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Email
          <input {...register("email")} type="email" className={inputClass} />
          {errors.email && <span className="text-xs text-sky">{errors.email.message}</span>}
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Phone
          <input {...register("phone")} type="tel" className={inputClass} />
          {errors.phone && <span className="text-xs text-sky">{errors.phone.message}</span>}
        </label>
        <label className="block space-y-2 text-sm font-medium">
          Message
          <textarea {...register("message")} rows={5} className={inputClass} />
          {errors.message && <span className="text-xs text-sky">{errors.message.message}</span>}
        </label>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-sky hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : buttonLabel}
        </button>
        {submitted && <p className="text-sm text-sky">{submitted}</p>}
        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
      </form>
    </div>
  );
}
