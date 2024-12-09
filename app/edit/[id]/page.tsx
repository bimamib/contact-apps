/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/lib/types";

export default function EditContact({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const foundContact = contacts.find((c: Contact) => c.id === params.id);
      if (foundContact) {
        setContact(foundContact);
      } else {
        setError("Contact not found");
      }
    }
  }, [params.id]);

  const handleSubmit = (data: Contact) => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.map((c: Contact) =>
        c.id === params.id ? { ...data, id: params.id } : c
      );
      try {
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        router.push("/");
      } catch (e) {
        setError("Failed to save changes. Please try again.");
      }
    }
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!contact) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <ContactForm contact={contact} onSubmit={handleSubmit} />
    </div>
  );
}
