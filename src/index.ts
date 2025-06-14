import express, { Request, Response } from "express";

const app = express(); //create an application instance, app is used to register routes and middleware

interface Note {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
