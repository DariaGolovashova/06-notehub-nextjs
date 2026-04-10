// import { fetchNoteById } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../Notes.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// async function NoteDetailsPage({ params }: PageProps) {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//   });
async function NoteDetailsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        perPage: 10,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetailsPage;
