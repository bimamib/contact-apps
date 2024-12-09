"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => string;
  onDelete: (id: string) => void;
}

export function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.name}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>{contact.address}</TableCell>
            <TableCell>
              <Link href={onEdit(contact)}>
                <Button variant={"outline"} className="mr-2">
                  Edit
                </Button>
              </Link>
              <Button
                variant={"destructive"}
                onClick={() => onDelete(contact.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
