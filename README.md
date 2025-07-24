# 📋 Task Management Dashboard — Code Challenge

This project is a **Task Management System** built with **Vue 3 + Tailwind CSS v3.4** on the frontend and **NestJS + Drizzle ORM** on the backend. The goal is to deliver a fully functional **CRUD interface for managing tasks**, including real-time updates, filtering, and visual analytics like charts and tables.

> 🔧 Fork this repository to get started and begin building your solution.

## 🚀 Challenge Goal

Build a **responsive web page** that allows users to **create, view, update, and delete tasks**, with visual feedback and data representation using:

- 📦 **Vue 3**
- 🎨 **Tailwind CSS v3.4**
- 📊 **Charts (Chart.js)**
- 🗂️ **Tables with filters**
- 🧠 **Reactive data flows (All components react to the same filter)**
- 📦 **PrimeVue** (UI component framework)
- 🔁 **Vue Query (`useQuery`)** for fetching and caching data reactively

---

## 🖥️ Frontend Features

The main page must include:

### ✅ Task Overview Cards

- Three cards representing:
  - 🔴 High Urgency
  - 🟠 Medium Urgency
  - 🟢 Low Urgency  
    Each card shows the total number of tasks in that urgency level.

### 📈 Task Timeline Chart

- **X-Axis**: Task creation dates.
- **Y-Axis**: Number of tasks created on that day.
- Must update dynamically when filters are applied.

### 📋 Task Table

- A table listing **all tasks**, displaying their key information.
- Must include controls to:
  - Filter by **urgency (priority)**.
  - Filter by **date/time range**.
- The table should update **reactively** with any CRUD operation.

---

## 🧩 Task Model (Fields)

Each task in the system includes rich metadata for real-world scenarios:

| Field            | Type        | Description                                            |
| ---------------- | ----------- | ------------------------------------------------------ |
| `id`             | UUID        | Unique task identifier                                 |
| `title`          | string      | Short title of the task                                |
| `description`    | string      | Detailed description                                   |
| `priority`       | enum/string | `LOW`, `MEDIUM`, or `HIGH`                             |
| `status`         | enum/string | `TODO`, `IN_PROGRESS`, `DONE`                          |
| `createdAt`      | datetime    | Date of task creation                                  |
| `dueDate`        | datetime    | Optional deadline                                      |
| `assignedTo`     | string      | User or team responsible                               |
| `tags`           | string[]    | Array of labels/tags                                   |
| `estimatedHours` | number      | Expected effort in hours                               |
| `isRecurring`    | boolean     | Whether this task repeats                              |
| `recurrenceRule` | string/null | If recurring, format like `FREQ=WEEKLY;BYDAY=MO,WE,FR` |

---

## 🛠️ Backend Setup

The backend uses **NestJS** with **Drizzle ORM** and **PostgreSQL**.

### 📂 Directory: `/backend`

#### 🧱 Requirements

- Node.js v18+
- Docker + Docker Compose

## 🧩 Additionally

You are encouraged to go beyond the basic requirements. Feel free to:

- Add any new features or improvements you believe would enhance the system.
- Refactor and structure the code as you see fit.
- Choose additional tools or libraries that help you deliver a better experience.
- Apply best practices in UI/UX, performance, and maintainability.

> 🎯 This description is meant to help you get started — everything else is up to your creativity and engineering skills.
