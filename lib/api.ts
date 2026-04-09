"use client";
import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get(`/${id}`);
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers,
  });
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await axios.post<Note>(BASE_URL, note, { headers });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${id}`, { headers });
  return data;
};
