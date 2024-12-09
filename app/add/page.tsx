/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/lib/types";

export default function AddContact() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: Contact) => {
    const storedContacts = localStorage.getItem("contacts");
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const newContact = { ...data, id: uuidv4() };
    const updatedContacts = [...contacts, newContact];

    try {
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      router.push("/");
    } catch (e) {
      setError("Failed to save the contact. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Contact</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}
