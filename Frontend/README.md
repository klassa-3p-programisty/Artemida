# Artemida — Frontend

**The web client of Artemida, a homework management platform for students, teachers, and administrators.**

## About

This repository contains the **frontend** of [Artemida] - a centralized environment where students manage their homework, teachers organize assignments, and administrators oversee the educational process.

The frontend is the user-facing part of the platform: it renders assignments, deadlines, and dashboards, and communicates with the Artemida backend API.

## Features

Planned and in-progress functionality:

-  **Student workspace** - view assignments, track deadlines, and submit homework.
-  **Teacher tools** - create, distribute, and review assignments.
-  **Admin panel** - oversee users, classes, and the educational process.
-  **Deadline overview** - a clear picture of what is due and when.
-  **Student–teacher communication** - keep feedback and questions in one place.
-  **Responsive design** - comfortable on both desktop and mobile.

## Tech Stack

| Area            | Technology                 |
| --------------- | -------------------------- |
| Framework       | _React_                    |
| Language        | _TypeScript_               |
| Build tool      | _Vite_                     |
| Styling         | _CSS_                      |
| State / Routing | _React Router_             |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js) or yarn / pnpm
- Access to the Artemida backend API (local or remote)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/klassa-3p-programisty/Artemida.git
cd <repository-folder>

# 2. Install dependencies
npm install
```

### Run in Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |

## Project Structure

src/
├── app/                 
│   ├── providers/       
│   ├── router/          
│   ├── app.jsx
│   └── main.jsx
│
├── features/            
│   ├── api/         
│   ├── components/  
│   ├── hooks/       
│   └── index.ts     
│
├── layouts/             
│
├── shared/              
│   ├── ui/              
│   ├── api/             
│   ├── hooks/           
│   └── lib/           
│   
│
└── main.*              

## Roadmap

- [ ] Login Page
- [ ] First Login / Password Change
- [ ] Session Management & Logout
- [ ] Password Recovery Request
- [ ] Admin Recovery Requests
- [ ] Role-based Dashboard
- [ ] Notifications Page
- [ ] Notifications Page
- [ ] Profile Page & Avatar

## Project Status

Artemida is currently in its **early development stage**. Features, structure, and documentation may change frequently as the team learns and iterates.

## Teams

The frontend team is led by the **Main Team Lead** and split into two groups, each coordinated by its own **Team Lead**.

### Main Team Lead

| Name  | Surname  | Role           |
| ----- | -------- | -------------- |
| Denys | Panasiuk | Main Team Lead |

### Team 2

| Name       | Surname     | Role                 |
| ---------- | ----------- | -------------------- |
| Uladzislau | Kirylchyk   | Team Lead            |
| Vladislav  | Andreev     | Frontend developer   |
| Oleksii    | Kosik       | Frontend developer   |
| Selvador   | Piskor      | Frontend developer   |
| Maksym     | Riabashapka | Frontend developer   |

### Team 3

| Name      | Surname   | Role                 |
| --------- | --------- | -------------------- |
| Oleksandr | Dmytruk   | Team Lead            |
| Raman     | Shalakhau | Frontend developer   |
| Valerii   | Shuklin   | Frontend developer   |
| Bohdan    | Smytskyi  | Frontend developer   |

## License

This project is part of an educational initiative. License information will be added later.

