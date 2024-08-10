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
// import NewsletterSignup from "@/components/NewsletterSignup";

export default async function Home() {
  // Fetch issues from Supabase
  const { data: issues, error } = await supabase
    .from("newsletter_issues")
    .select("title, description, slug, published_at")
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching issues:", error);
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-100">
        <Link href="/" className="flex items-center justify-center">
          <UnicornIcon className="size-6 text-gray-800" />
          <span className="sr-only">Newsletter</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#past-issues"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
          >
            Past Issues
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                Get Your Dose of Newsletter Magic!
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Subscribe to our Newsletter for ideas and updates straight to
                your inbox!
              </p>
              {/* <NewsletterSignup /> */}
            </div>
          </div>
        </section>

        {issues && issues.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  Latest Issue
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  {issues[0].title}
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  {issues[0].description}
                </p>
              </div>
              <div className="text-center">
                <Link
                  href={`/issues/${issues[0].slug}`}
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Read Latest Issue
                </Link>
              </div>
            </div>
          </section>
        )}

        <section
          id="past-issues"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-700">
                Past Issues
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Revisit the Magic
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Explore our archive of past newsletter issues.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues &&
                issues.map((issue) => (
                  <Card key={issue.slug} className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-gray-900">
                        {issue.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {issue.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Published on:{" "}
                        {new Date(issue.published_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/issues/${issue.slug}`}
                        className="text-gray-700 hover:text-gray-900 hover:underline"
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

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 bg-gray-100">
        <p className="text-xs text-gray-500">
          &copy; 2024 Newsletter. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
