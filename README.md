# 🛠️ Node.js + Express + TypeScript Setup Guide

---

## 📦 Project Initialization

```bash
npm init -y //creates package.json
npm install express //installs express
npm install --save-dev typescript @types/node @types/express ts-node nodemon
npx tsc --init //creates tsconfig.json
```

---

## ⚙️ tsconfig.json

Ensure this in `tsconfig.json`:

```json
{
  "target": "ES2020",
  "module": "commonjs",
  "outDir": "./dist",
  "rootDir": "./src",
  "strict": true,
  "esModuleInterop": true
}
```

---

## ⚙️ package.json

Ensure this in `package.json`:

```json
"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## 📚 Key Terms and Concepts

- **Express**: minimalist web framework for Node.js
- **Middleware**: function that has access to request/response and modify or end the request
- **Routing**: Routes map HTTP methods + URL paths to handler functions.  
  We’ll use `express.Router()` to keep routes modular.
- **CRUD**: Create, Read, Update and Delete
- **fs module**: Node builtin fs for "file operations"
- **UUID**: What is this?

---

## 🧱 File Structure

_(Not specified, placeholder for your project layout)_

---

## 🌐 curl

**curl**: A simple command-line tool for making HTTP requests.  
It sends HTTP requests (GET, POST, PUT, DELETE) to a URL and prints the response.

Example:

```bash
curl http://localhost:3000/health //sends GET request to the endpoint and shows JSON response
```

---

## 🔁 Express Core Functions

### app.use vs app.get/post/put/delete vs app.listen

- `app.use()`  
  Registers middleware (functions that run before your route handlers or other middleware)

- `app.get()` / `.post()` / `.put()` / `.delete()`  
  Define route handlers for 4 main HTTP methods

- `app.listen(port, hostname, callback)`  
  Starts your HTTP server and begins listening for incoming connections

---

## 🛠️ Route Example

```ts
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});
```

- `app.get(path, handler)` registers a route for HTTP GET request on the given path
- Handler function: receives two parameters, `_req` (the incoming request) and `res` (the response helper)
- `res.json(..)` sends back a JSON response with `200 OK` status

---

## 🚀 Server Startup Example

```ts
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

---

## 🤔 \_req vs req

Underscore `_req` is used to indicate that the `req` parameter is unused.

---

## 🧩 app.use(express.json())

- Middleware in Express is a function that runs on every request (or a subset of routes) before your route handlers
- `express.json()` is built-in middleware that parses incoming JSON in the request body and populates `req.body` with the resulting object
- Without it, `req.body` is undefined when you send JSON, so you can’t read `title`, `content`, etc.

---

## 🧪 curl POST Example

```bash
curl -i -X POST http://localhost:3000/notes \
 -H "Content-Type: application/json" \
 -d '{"title":"My Test","content":"Hello, Node!"}'
```

---
