
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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
