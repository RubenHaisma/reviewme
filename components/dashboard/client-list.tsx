"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  lastReviewRequest?: Date | null;
}

export function ClientList({ clients }: { clients: Client[] }) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function sendReviewRequest(clientId: string) {
    setIsLoading(clientId);
    try {
      const response = await fetch("/api/review-requests/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send review request");
      }

      toast.success("Review request sent successfully");
    } catch (error) {
      toast.error("Failed to send review request");
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Added</TableHead>
          <TableHead>Last Request</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(client.createdAt), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>
              {client.lastReviewRequest
                ? formatDistanceToNow(new Date(client.lastReviewRequest), {
                    addSuffix: true,
                  })
                : "Never"}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => sendReviewRequest(client.id)}
                disabled={isLoading === client.id}
              >
                {isLoading === client.id ? "Sending..." : "Send Review Request"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}