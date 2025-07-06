# 🧠 DevScribe

**AI-powered documentation generator** — instantly create high-quality `README.md` files from your codebase.

## 🚀 Live Demo

👉 [devscribe.vercel.app](https://devscribe-sigma.vercel.app/) (auto-updated)

---

## 📦 Features

- 📂 Upload `.zip` of any codebase
- 🤖 Automatically generates `README.md` with:
  - Project description
  - Installation & usage
  - Tech stack & features
  - Contribution & license info
- 💾 Download the result instantly
- 🌐 Serverless & blazing-fast (built on Next.js 15 + Vercel)

---

## 🛠️ Tech Stack

- ⚡ **Next.js 15 (App Router + TypeScript)**
- 🎨 Tailwind CSS for UI
- 🔐 Vercel serverless functions
- 🤖 OpenAI GPT-4 for README generation

---


## 🧑‍💻 Local Setup

```bash
git clone https://github.com/ultimateebeast/devscribe.git
cd devscribe
pnpm install
touch .env.local
# Add your OpenAI key in the file:
# OPENAI_API_KEY=sk-...

pnpm dev
