# Network Theory Solver

Production-ready full-stack web app for solving electrical network problems with step-by-step explanations.

## Stack
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Solver engine: Pure JavaScript (Gaussian elimination + complex arithmetic)

## Modules
- Nodal Analysis
- Mesh Analysis
- Thevenin/Norton
- AC Circuits (R, L, C with complex impedance)

## Project Structure
```
client/   # React dashboard UI
server/   # Express solver API
```

## Run locally
### 1) Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2) Start backend
```bash
cd server
npm run dev
```
Backend default URL: `http://localhost:4000`

### 3) Start frontend
```bash
cd client
npm run dev
```
Frontend default URL: `http://localhost:5173`

## REST API
- `POST /solve/nodal`
- `POST /solve/mesh`
- `POST /solve/thevenin`
- `POST /solve/ac`

## Sample Nodal Test Case
Request:
```json
{
  "nodeCount": 2,
  "resistors": [
    { "from": 1, "to": 0, "resistance": 10 },
    { "from": 1, "to": 2, "resistance": 5 },
    { "from": 2, "to": 0, "resistance": 20 }
  ],
  "currentSources": [
    { "from": 0, "to": 1, "current": 2 }
  ]
}
```

Expected behavior:
- KCL equations are generated
- Matrix form is built
- Gaussian elimination steps are returned
- Node voltages are output

## Notes
- Ground is node `0`.
- History is saved in browser `localStorage`.
- Dark mode and sample payload loading are built in.
