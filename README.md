
# installation de next

# installation shadcn

```
npx shadcn-ui@latest add card

```


## pour la form
```
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
```

## setup prisma
```
npm i -D prisma
npm i @prisma/client
npx prisma init
```

## on utilise neon comme database
- on crée un compte, et on configure la db

quand on a ajouté une table User dans la database de prisma, on fait :
```
npx prisma generate
npx prisma db push  
```

pour reinitialiser la bdd prisma

```
npx prisma migrate reset 
npx prisma db push  

```


## documentation next auth v5
https://authjs.dev/

#### installation du prisma adapter
```
npm i @auth/prisma-adapter
```

#### pour bcrypt
```
npm i bcrypt
npm i -D @types/bcrypt
```

## installation et configuration de next auth v5 - login
https://authjs.dev/guides/upgrade-to-v5

```
npm install next-auth@beta
```

pour voir les auth configurer :
http://localhost:3000/api/auth/providers


## pour l'envoie de mail de verification
https://resend.com/

```
npm install resend

```


## pour le loader
```
npm i react-spinners
```


# le demo sur vercel
https://next-auth-v5-advanced-2024-neon-typescript-prisma-postgresql.vercel.app/



# le tuto
https://youtube.com/watch?v=1MTyCvS05V4&list=PLfe-EbMNSdYrtApoOiy0TkNPOLV-xyF97&index=28&t=134s
https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide


# bug à resoudre
- pour l'envoie de mail de verification : trouver un domaine pour pouvoir envoyer le mail à plusieurs personnes
- sur resend l'envoie de mail est uniquement pour une personne



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## les variables d'environnement à remplir
DATABASE_URL="[ votre postgres url sur neon ou autre]"
DIRECT_URL="[ votre directus url sur neon ou autre]"

AUTH_SECRET="[votre code perso pour next-auth]"

GITHUB_CLIENT_ID=[oauth github]
GITHUB_CLIENT_SECRET=[oauth github]

GOOGLE_CLIENT_ID=[oauth google]
GOOGLE_CLIENT_SECRET=[oauth google]

RESEND_API_KEY=[votre api key resend pour le mail]


NEXT_PUBLIC_APP_URL=["http://localhost:3000" ou votre url en production]


## Deploy on Vercel

### le demo sur vercel
https://next-auth-v5-advanced-2024-neon-typescript-prisma-postgresql.vercel.app/


# Learn how to add advanced authentication to your NextJS App.

Key Features:
- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification (2FA)
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)