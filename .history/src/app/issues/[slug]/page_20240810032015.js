import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateStaticParams() {
  const { data: issues } = await supabase.from("saas_ideas").select("slug");

  return issues.map((issue) => ({
    slug: issue.slug,
  }));
}

export default async function IssuePage({ params }) {
  const { slug } = params;

  const { data: issue, error } = await supabase
    .from("saas_ideas")
    .select(
      `
      *,
      validations:idea_validations(category, content)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching issue:", error);
    return <div>Error loading issue</div>;
  }

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{issue.title}</h1>
      <p className="mb-6">{issue.full_description}</p>

      <h2 className="text-2xl font-bold mb-4">SaaS Idea Details:</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
        <p className="mb-4">{issue.full_description}</p>

        <h4 className="font-bold">TikTok Hack:</h4>
        <p className="mb-2">
          {issue.validations.find((v) => v.category === "tiktok_hack")?.content}
        </p>

        <h4 className="font-bold">YouTube Hack:</h4>
        <p>
          {
            issue.validations.find((v) => v.category === "youtube_hack")
              ?.content
          }
        </p>
      </div>

      {/* Add more sections as needed */}

      <footer className="mt-8 text-center">
        <p>Stay magical, stay down till you come up,</p>
        <p className="font-bold">Captain of Unicorn Poop, Dominick</p>
      </footer>
    </div>
  );
}
