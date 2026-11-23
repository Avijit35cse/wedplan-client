# 💍 WedPlan — Wedding Planning Platform

<p align="center">
  <strong>Plan Your Perfect Day, All in One Place.</strong>
  <br />
  A modern wedding planning platform connecting customers with trusted wedding service providers.
</p>

<p align="center">
  <a href="https://wedplan-client-avijit.vercel.app">🌐 Live Website</a> •
  <a href="https://github.com/Avijit35cse/wedplan-client">💻 Client Repository</a> •
  <a href="https://github.com/Avijit35cse/wedplan-server">⚙️ Server Repository</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Authentication-Better_Auth-orange" alt="Better Auth" />
</p>

---

## ✨ Overview

**WedPlan** is a full-stack wedding planning platform built to simplify the process of discovering, managing, and booking wedding-related services.

Customers can explore wedding services, find suitable vendors, and submit booking requests. Vendors can manage their businesses, publish services, and handle customer bookings. Administrators oversee users, service approvals, and platform transactions.

WedPlan provides three dedicated role-based experiences:

- **Customer** — Discover and book wedding services.
- **Vendor** — Manage services, bookings, and subscriptions.
- **Admin** — Manage users, services, and transactions.

## 🚀 Key Features

### 👰 Customer Experience
- Browse approved and active wedding services.
- Search services by name.
- Explore services by category and location.
- View detailed service information and vendor profiles.
- Submit wedding service booking requests.
- Track booking request status.
- Cancel eligible pending bookings.
- Manage personal profile information.
- Access a personalized customer dashboard.

### 🤵 Vendor Experience
- Dedicated vendor dashboard with overview statistics.
- Create, update, and delete wedding services.
- Upload service images through ImgBB.
- Track service approval status.
- Manage service availability.
- View customer booking requests.
- Accept or reject pending booking requests.
- Manage subscription information.
- Upgrade to Premium through Stripe Checkout.

### 🛡️ Admin Experience
- Dedicated admin dashboard.
- View registered users and platform statistics.
- Search and filter users.
- Block and unblock user accounts.
- Review submitted wedding services.
- Approve or reject services.
- Manage published services.
- Monitor platform transactions.

### ⚡ Platform Highlights
- Email and password authentication.
- Google authentication.
- Better Auth integration with MongoDB.
- JWT-based backend authentication.
- Role-based protected dashboards.
- Stripe Checkout integration.
- Webhook-based Premium subscription activation.
- Responsive layouts for desktop, tablet, and mobile.
- Loading, empty, and error states.
- Toast notifications for user feedback.
- Animated homepage sections.

## 🧰 Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Base UI |
| Authentication | Better Auth |
| Database | MongoDB |
| Backend | Express.js |
| Payment Gateway | Stripe |
| Image Hosting | ImgBB |
| Animation | Motion |
| Icons | Lucide React |
| Notifications | Sonner |
| Deployment | Vercel |

## 📸 Application Preview

> Add your actual application screenshots here to make the repository more visually engaging.

| Home Page | Services | Dashboard |
|---|---|---|
| Add screenshot | Add screenshot | Add screenshot |

## 🏗️ Project Architecture

WedPlan follows a separate client-server architecture.

```text
WedPlan
│
├── wedplan-client
│   ├── Next.js App Router
│   ├── Authentication
│   ├── Role-based Dashboards
│   ├── Service Discovery
│   ├── Booking Interface
│   └── Payment Pages
│
└── wedplan-server
    ├── Express.js API
    ├── JWT Verification
    ├── Role Authorization
    ├── MongoDB Operations
    ├── Stripe Integration
    └── ImgBB Upload
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20 or later
- npm
- MongoDB database
- Google OAuth credentials
- Stripe test-mode account
- ImgBB API key

### 1. Clone the Repository

```bash
git clone https://github.com/Avijit35cse/wedplan-client.git
```

### 2. Navigate to the Project

```bash
cd wedplan-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string
DB_NAME=wedplan

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your own credentials.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔐 Environment & Security

Sensitive credentials must be configured through environment variables.

- Better Auth secret and configuration.
- MongoDB connection credentials.
- Google OAuth client credentials.
- Backend API URL.

**Never commit `.env`, `.env.local`, or any file containing private credentials to GitHub.**

The backend has its own environment configuration for Stripe, ImgBB, MongoDB, and authentication verification.

## 💳 Payment Integration

WedPlan uses Stripe Checkout for Vendor Premium subscriptions.

The payment flow:

1. Vendor requests a Premium upgrade.
2. Backend creates a Stripe Checkout Session.
3. Vendor completes payment through Stripe.
4. Stripe sends a signed webhook event.
5. Backend verifies the event.
6. Verified payment events update the subscription and transaction records.

Premium access must not be activated solely from the frontend success redirect.

## 🚀 Deployment

The frontend is deployed on Vercel.

**Production URL:**  
https://wedplan-client-avijit.vercel.app

Before deployment, configure the production environment variables and ensure that:

- Backend API URL points to the deployed server.
- Better Auth production URL and trusted origins are correct.
- Google OAuth callback URL matches the production domain.
- MongoDB credentials are valid.
- Stripe Checkout and webhook URLs are configured.

## 🔗 Related Repositories

| Repository | Link |
|---|---|
| Frontend | [wedplan-client](https://github.com/Avijit35cse/wedplan-client) |
| Backend | [wedplan-server](https://github.com/Avijit35cse/wedplan-server) |
| Live Website | [WedPlan](https://wedplan-client-avijit.vercel.app) |

## 👨‍💻 Author

**Avijit Barua**

- GitHub: [@Avijit35cse](https://github.com/Avijit35cse)
- LinkedIn: [Avijit Barua](https://linkedin.com/in/avijit-barua-dev)

---

<p align="center">
  Made with ❤️ by Avijit Barua
  <br />
  <strong>WedPlan — Plan Your Perfect Day.</strong>
</p>
