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

  // Fetch the newsletter issue
  const { data: issue, error: issueError } = await supabase
    .from("newsletter_issues")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (issueError) {
    console.error("Error fetching issue:", issueError);
    return (
      <div>
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
      <div>
        An error occurred while fetching SaaS ideas. Please try again later.
      </div>
    );
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
        <div className="prose max-w-none mb-8">
          {formatContent(issue.content)}
        </div>

        <h2 className="text-3xl font-bold mb-6">SaaS Ideas</h2>
        {saasIdeas.map((idea, index) => (
          <div key={idea.id} className="mb-8 p-6 bg-pink-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {index + 1}. {idea.title}
            </h3>
            <p className="mb-4">{idea.full_description}</p>

            <h4 className="text-xl font-semibold mb-2">TikTok Hack:</h4>
            <p className="mb-4">
              {
                idea.idea_validations.find((v) => v.category === "tiktok_hack")
                  ?.content
              }
            </p>

            <h4 className="text-xl font-semibold mb-2">YouTube Hack:</h4>
            <p>
              {
                idea.idea_validations.find((v) => v.category === "youtube_hack")
                  ?.content
              }
            </p>
          </div>
        ))}
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
