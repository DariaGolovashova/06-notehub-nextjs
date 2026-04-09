"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <ul>
      {data?.notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <Link href={`/notes/${note.id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}

export default NotesClient;
