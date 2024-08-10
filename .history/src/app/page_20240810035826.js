import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
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

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// You might want to move this to a separate component file
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

// You'll need to create this as a separate Client Component
import NewsletterSignup from "@/components/NewsletterSignup";

export default async function Home() {
  // Fetch issues from Supabase
  const { data: issues, error } = await supabase
    .from("saas_ideas")
    .select("title, short_description, slug")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching issues:", error);
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
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
              <NewsletterSignup />
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
                    From sleek interfaces to bug fixes, we've got the tips to
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
                    This month's spotlight is on a SaaS unicorn that's shaking
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
              {issues &&
                issues.map((issue) => (
                  <Card key={issue.slug}>
                    <CardHeader>
                      <CardTitle>{issue.title}</CardTitle>
                      <CardDescription>
                        {issue.short_description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link
                        href={`/issues/${issue.slug}`}
                        className="text-pink-600"
                      >
                        Read Issue
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
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
