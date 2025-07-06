# 🧠 DevScribe

> AI-powered documentation generator — instantly create professional `README.md` files from any codebase.

[![Contributors](https://img.shields.io/github/contributors/ultimateebeast/devscribe?color=green)](https://github.com/ultimateebeast/devscribe/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/ultimateebeast/devscribe)](https://github.com/ultimateebeast/devscribe/issues)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🚀 Live Demo

👉 [devscribe.vercel.app](https://devscribe-sigma.vercel.app/)  
📥 Upload a `.zip` of your codebase — 📄 get a polished README.md instantly!

---

## 📦 Features

- 📁 Upload `.zip` of any repo
- 🤖 AI-powered README generation using OpenAI GPT-4
- 📜 Sections: Project summary, install/use, tech stack, features, license
- 🧠 Intelligent file filtering (`index.js`, `package.json`, etc.)
- 💾 1-click download of generated `README.md`
- 💡 Clean, minimal UI with Tailwind CSS

---

## 🛠️ Tech Stack

- ⚡ Next.js 15 (App Router, TypeScript)
- 🎨 Tailwind CSS
- 🧠 OpenAI GPT-4 API
- ☁️ Vercel (serverless deployment)
- 🔄 JSZip for archive processing

---


## 🧑‍💻 Local Development

```bash
git clone https://github.com/ultimateebeast/devscribe.git
cd devscribe
pnpm install
touch .env.local
