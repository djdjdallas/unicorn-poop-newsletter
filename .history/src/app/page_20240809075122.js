// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Unicorn Poop Newsletter</title>
        <meta
          name="description"
          content="Sign up for the magical Unicorn Poop Newsletter!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the Unicorn Poop Newsletter!</h1>
        {/* We'll add more content here later */}
      </main>
    </div>
  );
}
