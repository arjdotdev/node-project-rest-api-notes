npm init -y //creates package.json
npm install express //installs express
npm install --save-dev typescript @types/node @types/express ts-node nodemon
npx tsc --init //creates tsconfig.json

Ensure this in tsconfig.json
{
"target": "ES2020",
"module": "commonjs",
"outDir": "./dist",
"rootDir": "./src",
"strict": true,
"esModuleInterop": true
}

Ensure this in package.json
"scripts": {
"dev": "nodemon --watch src --exec ts-node src/index.ts",
"build": "tsc",
"start": "node dist/index.js"
}

Key Terms and Concepts
Express: minimalist web framework for Nodejs
Middleware: function that has access to request/response and modify or end the request
Routing:Routes map HTTP methods + URL paths to handler functions.
We’ll use express.Router() to keep routes modular.
CRUD: Create, Read, Update and Delete
fs module: Node builtin fs for "file operations"

UUID: What is this?
File Structure

curl: It is a simple command-line tool for making HTTP requests. It sends HTTP requests (GET, POST, PUT, DELETE) to a URL and prints the response.
eg: curl http://localhost:3000/health //sends GET rewuest to the endpoint and shows JSON response

app.get(path,handler)
eg:
app.get("/", (\_req: Request, res: Response) => {
res.json({ status: "OK" });
});
registers a route for HTTP GET request on the given path.
Handler function: It receives two parameters, \_req(the incoming request) and res(the response helper)
res.json(..) sends back a JSON response with 200 status code.

app.listen(port, function): starts the HTTP server, callback runs once the server is up
eg:
app.listen(PORT, () => {
console.log(`🚀 Server running at http://localhost:${PORT}`);
});

\_req vs req

app.use(express.json())
Middleware in Express is a function that runs on every request (or a subset of routes) before your route handlers.
express.json() is built-in middleware that parses incoming JSON in the request body and populates req.body with the resulting object. Without it, req.body is undefined when you send JSON, so you can’t read title, content, etc.

curl -i -X POST http://localhost:3000/notes \
 -H "Content-Type: application/json" \
 -d '{"title":"My Test","content":"Hello, Node!"}'
