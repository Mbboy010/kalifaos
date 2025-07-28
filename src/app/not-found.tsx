// app/not-found.tsx
"use client"
import NotFou from "../components/not/NotFound"
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
    <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <div className="container mx-auto min-h-full">
          <NotFou />
      </div>
    </>
  );
}