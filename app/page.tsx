"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactList } from "@/components/ContactList";
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Apps</h1>
        <Link href={"/add"}>
          <Button>Add Contact</Button>
        </Link>
      </div>
      <ContactList
        contacts={contacts}
        onEdit={(contact) => `/edit/${contact.id}`}
        onDelete={handleDelete}
      />
    </div>
  );
}
