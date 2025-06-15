import express, { Request, Response } from "express";

const app = express(); //create an application instance, app is used to register routes and middleware

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 1) JSON body parsing middleware
app.use(express.json());

// 2) Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

// 3) In-memory store
const notes: Note[] = [];

// 4) GET /notes — list all notes
app.get("/notes", (_req: Request, res: Response) => {
  res.json(notes);
});

// 5) POST /notes — create a new note
app.post("/notes", (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  const now = new Date().toISOString();
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };

  notes.push(newNote);
  return res.status(201).json(newNote);
});

// 6 Get note by ID
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(note);
});

// 7 PUT /notes/:id — update a note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body as { title?: string; content?: string };

  const noteIndex = notes.findIndex((n) => n.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  // Merge in any provided fields
  if (title !== undefined) notes[noteIndex].title = title;
  if (content !== undefined) notes[noteIndex].content = content;
  notes[noteIndex].updatedAt = new Date().toISOString();

  res.json(notes[noteIndex]);
});

// 8 DELETE /notes/:id — delete a note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Note not found" });
  }
  notes.splice(idx, 1);
  // 204 No Content indicates successful deletion with empty body
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
