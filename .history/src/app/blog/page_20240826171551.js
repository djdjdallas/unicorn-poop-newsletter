import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-gray-100 text-gray-900">
      <section className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-blue-600">
              The Tech Unicorn Insights Blog
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Discover the world of tech unicorns and the innovative ideas left
              in their wake.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BlogPost
              title="The Unicorn Diet: What Fuels Billion-Dollar Startups"
              description="Uncover the strategies and resources that power today's most valuable tech companies."
            />
            <BlogPost
              title="Sifting Through Tech Giants' Leftovers"
              description="Explore the overlooked opportunities and niche markets left behind by big tech."
            />
            <BlogPost
              title="From Myth to Reality: Unicorn Founder Stories"
              description="Learn from the journeys of founders who turned their startups into tech unicorns."
            />
            <BlogPost
              title="The Science of Scaling: Unicorn Growth Hacks"
              description="Dive into the methodologies and tactics that help startups achieve rapid, sustainable growth."
              color="text-green-600"
            />
            <BlogPost
              title="Unicorn Droppings: Failed Projects That Spawned Success"
              description="Discover how abandoned ideas and pivots led to unexpected unicorn breakthroughs."
              color="text-purple-600"
            />
            <BlogPost
              title="Mythbusting: Separating Fact from Fiction in Unicorn Valuations"
              description="Debunk common myths about unicorn valuations and funding rounds."
              color="text-red-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogPost({ title, description, color = "text-blue-600" }) {
  return (
    <article className="rounded-lg bg-white shadow-sm transition-all hover:shadow-md border-2 border-gray-200">
      <img
        src="/api/placeholder/400/200"
        alt="Tech Unicorn Blog Post Image"
        width="400"
        height="200"
        className="rounded-t-lg object-cover"
        style={{ aspectRatio: "400/200", objectFit: "cover" }}
      />
      <div className="p-4">
        <h2 className={`text-2xl font-bold ${color}`}>{title}</h2>
        <p className="mt-2 text-gray-700">{description}</p>
        <Link
          href="#"
          className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-600 hover:underline"
        >
          Read More
          <RocketIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
