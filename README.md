# Vue Jobs Board (Vite + Vue 3 + Netlify Functions)

A small job board application built with **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS**.

This is a learning project to get more familiar with Vue, based on this Traversy Media course:  
https://www.youtube.com/watch?v=VeNfHj6MhgA

🔗 **Live Demo:** https://noroon-vue.netlify.app/

---

## 🔄 CI/CD (GitHub Actions + Netlify)

This project uses **GitHub Actions** for continuous integration and Netlify for production deployment.


### Workflow

The GitHub Actions workflow runs automatically on push / pull request:

- installs dependencies
- runs TypeScript type-checking
- runs ESLint
- builds the project

After a successful build, Netlify automatically deploys the latest version of the app.

The workflow configuration can be found here:

`.github/workflows/dev-ci.yml`

---

## 🚀 Features

- Browse job listings
- View job details
- Create / update / delete jobs
- Loading states and error handling
- Toast notifications
- Responsive UI with Tailwind CSS
- Works locally with `json-server`
- Works in production using Netlify Functions (serverless API)

---

## 🛠 Tech Stack

- **Vue 3** + **TypeScript**
- **Vite**
- **Vue Router**
- **Tailwind CSS**
- **Axios**
- **json-server** (local REST API)
- **Netlify Functions** (production serverless API)
- **Vue Toastification**
- **Vue3 Spinners**
- **ESLint + Prettier**

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
nvm use
yarn
```

## 🔥 Local Development

Start the local API using json-server:

```bash
yarn server
```

Start the Vite dev server:

```bash
yarn dev
```

The app will be available at: http://localhost:3000
The json-server API runs on: http://localhost:8000


## 🌍 Netlify Functions (Local Testing)

To run the project with Netlify Functions locally:

```bash
yarn netlify
```

This starts Netlify Dev, including redirects and serverless functions, so you can test production-like API behavior locally.
