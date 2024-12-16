# Registrer pasient

This repository contains a Next.js 13 application (with the App Router) using Tailwind CSS, TypeScript, and includes a pre-set GitHub Actions workflow for CI/CD. The project can be developed either locally on your macOS machine or within a Visual Studio Code Dev Container.

These instructions are written for those who have minimal development experience. Follow them step-by-step, and you’ll have the application running in no time.

## Contents

- [Overview](#overview)  
- [Prerequisites](#prerequisites)  
- [Option A: Run in a VS Code Dev Container](#option-a-run-in-a-vs-code-dev-container)  
- [Option B: Run Locally on macOS with NVM](#option-b-run-locally-on-macos-with-nvm)  
- [Running the Application](#running-the-application)  
- [Project Structure](#project-structure)  
- [Making Changes](#making-changes)  
- [Deployment](#deployment)  
- [Troubleshooting](#troubleshooting)  
- [Further Reading](#further-reading)

---

## Overview

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS  
- **Language:** TypeScript  
- **Validation:** Includes logic for checking Norwegian fødselsnummer validity.  
- **Dark Mode:** Tailwind-based dark mode support.  
- **CI/CD:** GitHub Actions workflow for automated deployment (e.g., to Azure).

This project is fully set up with development conveniences. Just follow the instructions below to get started.

---

## Prerequisites

You have two main setup options:

### If Using a Dev Container (Recommended for Beginners)
- **Docker Desktop:** Install from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).  
- **Visual Studio Code (VS Code):** Install from [https://code.visualstudio.com/download](https://code.visualstudio.com/download).  
  Then, in VS Code:
  - Go to the Extensions pane (View > Extensions).
  - Install the **"Dev Containers"** extension.

No other tools are required. The Dev Container environment will handle everything else.

### If Running Locally on macOS with NVM
If you prefer not to use a Dev Container, you need Node.js. We recommend using **nvm** (Node Version Manager) because it lets you install and switch between Node.js versions easily without interfering with your system.

1. **Install Homebrew (if you don’t have it):**  
   Open Terminal (`Cmd+Space` and type "Terminal"), then:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install NVM using Homebrew:**
   ```bash
   brew install nvm
   ```
   
   After installation, follow Homebrew’s post-install instructions. Usually, you need to add something like this to your `~/.zshrc` (or `~/.bashrc`):
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
   ```
   
   Then run:
   ```bash
   source ~/.zshrc
   ```

3. **Install Node.js via NVM:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```
   
   This installs and uses the latest long-term support version of Node.js.

4. **Check Node and NPM versions:**
   ```bash
   node -v
   npm -v
   ```
   
   This should show you the installed versions. If successful, you’re ready to proceed.

---

## Option A: Run in a VS Code Dev Container

1. **Clone the Repository:**
   ```bash
   git clone <REPO_URL>
   ```
   Replace `<REPO_URL>` with your actual repository URL.

2. **Open in VS Code:**
   - Launch VS Code.
   - Go to **File > Open Folder** and select the cloned folder.

3. **Open in Dev Container:**
   - If prompted, select “Reopen in Container”. If not prompted:
     - Open the Command Palette (`Shift+Cmd+P`).
     - Type: "Dev Containers: Rebuild and Reopen in Container" and select it.
   
   VS Code will build and start a container with all dependencies installed.

---

## Option B: Run Locally on macOS with NVM

1. **Clone the Repository:**
   ```bash
   git clone <REPO_URL>
   cd <REPO_NAME>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   
   This downloads all necessary libraries.

---

## Running the Application

**Same steps for Dev Container or Local Setup:**

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   Go to [http://localhost:3000](http://localhost:3000). You should see the application’s interface.

---

## Project Structure

- **`app/`**: Main source directory for Next.js App Router.  
  - `app/page.tsx` is the main page.  
  - `app/api/registerArrival/route.ts` handles arrival registration API calls.
  
- **`components/`**: UI components, including `keypad.tsx`.

- **`.devcontainer/`**: Configuration for VS Code Dev Container.

- **`.github/workflows/`**: GitHub Actions CI/CD workflows.

- **`tailwind.config.js`**, `postcss.config.js`: Tailwind and PostCSS configurations.

---

## Making Changes

- Change `.tsx` files in the `app/` or `components/` folders to update UI or logic.
- Adjust styles using Tailwind classes directly in the JSX.
- TypeScript is in use, so you’ll see errors in VS Code if something’s off. Hover over underlined code to see suggestions.

---

## Deployment

- **GitHub Actions:**  
  The `.github/workflows` directory contains deployment workflows. When you push changes to certain branches (e.g., `main`), it may trigger an automated deployment (e.g., to Azure App Services).
  
---

## Troubleshooting

- **Dev Container Issues:**
  - Make sure Docker Desktop is running.
  - Ensure you have the “Dev Containers” extension installed in VS Code.

- **NVM/Node Issues (Local):**
  - If `node -v` doesn’t show a version, ensure you ran `nvm use --lts`.
  - If `npm install` fails, try running `nvm install --lts` again or restart your terminal.

- **No Page at http://localhost:3000:**
  - Make sure `npm run dev` is running.
  - Check the terminal for any error messages.

- **Type Errors:**
  - VS Code will underline problematic code. Hover for details and fix accordingly.

---

## Further Reading

- **Next.js Documentation:**  
  [https://nextjs.org/docs](https://nextjs.org/docs)
  
- **Tailwind CSS Documentation:**  
  [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

- **TypeScript Handbook:**  
  [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

- **NVM Documentation:**  
  [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- **GitHub Actions Documentation:**  
  [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
