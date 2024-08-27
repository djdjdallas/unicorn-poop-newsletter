import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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

export default async function BlogPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("title, description, slug, published_at")
    .order("published_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
        <Link href="/" className="flex items-center justify-center">
          <UnicornIcon className="size-6 text-gray-800" />
          <span className="sr-only">Newsletter</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
          >
            Home
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Insights from the Startup World
              </h1>
              <p className="max-w-[600px] text-white md:text-xl">
                Discover in-depth articles on tech unicorns, startup strategies,
                and innovative ideas
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Latest Blog Posts
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Explore our most recent articles on tech unicorns and startup
                innovations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts &&
                blogPosts.map((post) => (
                  <Card key={post.slug} className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-gray-900">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Published on:{" "}
                        {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gray-700 hover:text-gray-900 hover:underline"
                      >
                        Read Full Post
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
