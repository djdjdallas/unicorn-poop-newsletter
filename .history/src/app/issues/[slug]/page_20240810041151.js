import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateStaticParams() {
  const { data: issues } = await supabase
    .from("newsletter_issues")
    .select("slug");

  return issues?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: issue } = await supabase
    .from("newsletter_issues")
    .select("title, description")
    .eq("slug", slug)
    .maybeSingle();

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

export default async function IssuePage({ params }) {
  const { slug } = params;

  const { data: issue, error } = await supabase
    .from("newsletter_issues")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching issue:", error);
    return (
      <div>
        An error occurred while fetching the issue. Please try again later.
      </div>
    );
  }

  if (!issue) {
    notFound();
  }

  // Function to convert newlines to <br> tags and wrap paragraphs
  const formatContent = (content) => {
    return content.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
            {lineIndex < paragraph.split("\n").length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-pink-600 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-6">{issue.title}</h1>
        <p className="text-gray-600 mb-4">
          Published on: {new Date(issue.published_at).toLocaleDateString()}
        </p>
        <div className="prose max-w-none">{formatContent(issue.content)}</div>
      </article>
      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-bold mb-4">Share this magical wisdom:</h2>
        <div className="flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              issue.title
            )}&url=${encodeURIComponent(
              `https://yourdomain.com/issues/${issue.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              `https://yourdomain.com/issues/${issue.slug}`
            )}&title=${encodeURIComponent(issue.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Share on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
