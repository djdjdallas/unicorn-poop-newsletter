// pages/index.js
"use client";
import Head from "next/head";

import Link from "next/link";
import { useState } from "react";

// You'll need to create these components or use a UI library
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your newsletter signup logic here
    console.log("Subscribing email:", email);
    // Reset the email input after submission
    setEmail("");
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Head>
        <title>Unicorn Poop Newsletter</title>
        <meta
          name="description"
          content="Sign up for the Unicorn Poop Newsletter – your go-to source for sparkles, SaaS ideas, and a whole lot of fun!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <UnicornIcon className="size-6" />
          <span className="sr-only">Unicorn Poop Newsletter</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Past Issues
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-pink-600">
                Get Your Dose of Unicorn Magic!
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Subscribe to the Unicorn Poop Newsletter for sparkles, SaaS
                ideas, and magical updates straight to your inbox!
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500">
                  We value your privacy as much as our unicorns value their
                  glitter. Read our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-600">
                Latest Issue
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-600">
                What's New in Unicorn Land
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Check out the highlights from our most recent newsletter issue,
                featuring magical updates, sparkly insights, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rainbow Mane Care</CardTitle>
                  <CardDescription>
                    Discover how to keep your SaaS mane vibrant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    From sleek interfaces to bug fixes, we’ve got the tips to
                    keep your SaaS looking fresh and magical.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-pink-600">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Glitter Hoof Polish</CardTitle>
                  <CardDescription>
                    The latest trends in SaaS design.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Dive into the newest design patterns that are making SaaS
                    apps sparkle across the globe.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-pink-600">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Unicorn of the Month</CardTitle>
                  <CardDescription>Meet our SaaS star!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This month’s spotlight is on a SaaS unicorn that’s shaking
                    up the industry with innovation and a sprinkle of magic.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-pink-600">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-600">
                Past Issues
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-600">
                Revisit the Magic
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Explore our archive of past newsletter issues to relive the
                wonder and whimsy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>August 2024 Issue</CardTitle>
                  <CardDescription>Summer Solstice Special</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Celebrate the longest day of the year with our guide to
                    hosting the perfect unicorn picnic (and SaaS launch).
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/issues/${issue.slug}`}
                    className="text-pink-600"
                  >
                    Read Issue
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>May 2024 Issue</CardTitle>
                  <CardDescription>Flower Power Edition</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn about the magical properties of spring flowers and how
                    to weave them into your SaaS strategy.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-pink-600">
                    Read Issue
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>April 2024 Issue</CardTitle>
                  <CardDescription>
                    April Showers Bring Rainbow Powers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Discover new ways to harness the magic of rainbows and boost
                    your SaaS success.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-pink-600">
                    Read Issue
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          &copy; 2024 Unicorn Poop Newsletter. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function UnicornIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 17.5c0 2.485-4.477 4.5-10 4.5S0 19.985 0 17.5 4.477 13 10 13s10 2.015 10 4.5Z" />
      <path d="M10 13s3-4 3-6c0-1.655-1.345-3-3-3S7 5.345 7 7c0 2 3 6 3 6Z" />
      <path d="M20 17.5c0-2.485-4.477-4.5-10-4.5S0 15.015 0 17.5" />
    </svg>
  );
}
