<div align="center">
  <h2>A Decentralized Automated Trading Bot for ADA Holders</h2>
  <p><strong>Staking & Asset Growth Solution</strong></p>
  <img src="./frontend/src/assets/images/logo.png" alt="Dualtarget Logo" width="200" />
</div>

---


## 🎯 Project Overview

Dualtarget is a decentralized automated trading bot designed for ADA holders. It combines blockchain staking capabilities with intelligent trading strategies to help users grow and manage their cryptocurrency assets efficiently.

**Demo Video:**

[![Watch Demo](./frontend/src/assets/images/youtube.png)](https://www.youtube.com/watch?v=DCWY93O_QAU&t=1s "Everything Is AWESOME")

---

## 📁 Project Structure

### Frontend Architecture (`/frontend`)

| Directory           | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `app`               | Route management using directory-based structure (Next.js App Router) |
| `assets`            | Static resources including images, icons, and fonts                   |
| `components`        | Reusable React components organized by feature                        |
| `configs`           | Configuration files for routes, wallets, and API endpoints            |
| `constants`         | Application constants and static configuration values                 |
| `contexts`          | Global state management using React Context API                       |
| `data`              | Static data resources (FAQs, guides, etc.)                            |
| `helpers` / `utils` | Utility functions for common operations                               |
| `hooks`             | Custom React hooks for logic separation and reusability               |
| `layouts`           | Layout components that define page structure                          |
| `libs`              | Third-party library integrations                                      |
| `services`          | API integration layer (Blockfrost, Koios, Minswap SDK)                |
| `styles`            | Global CSS/SCSS styles                                                |
| `translations`      | i18n translation files for multi-language support                     |
| `types`             | TypeScript type definitions                                           |

### Key Configuration Files

- **`wallets.ts`** - Chrome wallet extension paths and configurations
- **`routes.ts`** - Absolute route definitions for the application

### Backend Architecture (`/backend`)

Go-based REST API with support for:

- Account management
- Transaction processing
- Mail services
- Integration with blockchain APIs (Blockfrost, Koios)

---

## 🚀 Quick Start

Clone the repository and navigate to the frontend directory:

```bash
git clone https://github.com/independenceee/dualtarget.git
cd dualtarget/frontend
```

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Git**: [Download](https://git-scm.com/downloads)
- **Node.js** (v16+): [Download](https://nodejs.org/en)
- **Docker** (optional): [Download](https://www.docker.com)

### Step 1: Environment Setup

Configure environment variables in `next.config.mjs`. You'll need API keys from:

- [Blockfrost](https://blockfrost.io) - Cardano blockchain API
- [Koios](https://www.koios.rest) - Alternative Cardano API

Example configuration:

```typescript
const nextConfig = {
  env: {
    // MAINNET
    BLOCKFROST_NETWORK_NAME_MAINNET: "Mainnet",
    BLOCKFROST_RPC_URL_MAINNET: "https://cardano-mainnet.blockfrost.io/api/v0",
    BLOCKFROST_PROJECT_API_KEY_MAINNET: "YOUR_KEY",
    KOIOS_RPC_URL_MAINNET: "https://api.koios.rest/api/v1",
    NEXT_APP_BASE_URL_MAINNET: "https://api.dualtarget.vn/api/v1",

    // PREPROD (Testnet)
    BLOCKFROST_NETWORK_NAME_PREPROD: "Preprod",
    BLOCKFROST_RPC_URL_PREPROD: "https://cardano-preprod.blockfrost.io/api/v0",
    BLOCKFROST_PROJECT_API_KEY_PREPROD: "YOUR_KEY",
    KOIOS_RPC_URL_PREPROD: "https://preprod.koios.rest/api/v1",
    NEXT_APP_BASE_URL_PREPROD: "https://preprod.dualtarget.vn/api/v1",
  },
};

export default nextConfig;
```

### Step 2: Choose Installation Method

#### Method 1: Docker (Recommended)

```bash
docker compose up --build
```

Application will be available at **http://localhost:3000**

#### Method 2: Node.js

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser

### Step 3: Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

This project is released under the [MIT License](./LICENSE). See the LICENSE file for more details.

---

## 💬 Contact & Support

For questions, feedback, or support, please reach out to:

- **Email**: [nguyenkhanh17112003@gmail.com](mailto:nguyenkhanh17112003@gmail.com)
- **GitHub**: [independenceee/dualtarget](https://github.com/independenceee/dualtarget)

---

<div align="center">
  <p>Made with ❤️ for the Cardano Community</p>
</div>
