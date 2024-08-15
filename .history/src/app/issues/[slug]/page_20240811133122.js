import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateStaticParams() {
  const { data: issues, error } = await supabase
    .from("newsletters")
    .select("slug")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return issues.map((issue) => ({
    slug: issue.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: issue, error } = await supabase
    .from("newsletters")
    .select("title, description")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching issue metadata:", error);
    return {
      title: "Issue Not Found",
      description: "The requested newsletter issue could not be found.",
    };
  }

  if (!issue) {
    return {
      title: "Issue Not Found",
      description: "The requested newsletter issue could not be found.",
    };
  }

  return {
    title: issue.title,
    description: issue.description,
  };
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

export default async function IssuePage({ params }) {
  const { slug } = params;

  // Fetch the newsletter issue
  const { data: issue, error: issueError } = await supabase
    .from("newsletters")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (issueError) {
    console.error("Error fetching issue:", issueError);
    return (
      <div className="text-center py-12">
        An error occurred while fetching the issue. Please try again later.
      </div>
    );
  }

  if (!issue) {
    notFound();
  }

  // Fetch all saas ideas with their validations
  const { data: saasIdeas, error: saasError } = await supabase
    .from("saas_ideas")
    .select(
      `
      *,
      idea_validations (
        category,
        content,
        "order"
      )
    `
    )
    .order("id");

  if (saasError) {
    console.error("Error fetching SaaS ideas:", saasError);
    return (
      <div className="text-center py-12">
        An error occurred while fetching SaaS ideas. Please try again later.
      </div>
    );
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
            href="/#past-issues"
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <article>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              {issue.title}
            </h1>
            <p className="text-gray-600 mb-4">
              Published on: {new Date(issue.published_at).toLocaleDateString()}
            </p>
            <div
              className="prose max-w-none mb-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: issue.content }}
            />

            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              SaaS Ideas
            </h2>
            {saasIdeas.map((idea, index) => (
              <div key={idea.id} className="mb-8 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {index + 1}. {idea.title}
                </h3>
                <p className="mb-4 text-gray-700">{idea.full_description}</p>

                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                  TikTok Hack:
                </h4>
                <p className="mb-4 text-gray-700">
                  {
                    idea.idea_validations.find(
                      (v) => v.category === "tiktok_hack"
                    )?.content
                  }
                </p>

                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                  YouTube Hack:
                </h4>
                <p className="text-gray-700">
                  {
                    idea.idea_validations.find(
                      (v) => v.category === "youtube_hack"
                    )?.content
                  }
                </p>
              </div>
            ))}
          </article>

          <div className="mt-8 border-t pt-4 border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Share this issue:
            </h2>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  issue.title
                )}&url=${encodeURIComponent(
                  `https://yourdomain.com/issues/${issue.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  `https://yourdomain.com/issues/${issue.slug}`
                )}&title=${encodeURIComponent(issue.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
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
