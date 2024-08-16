"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email }]);

      if (error) throw error;

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus(error.code === "23505" ? "duplicate" : "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full sm:w-auto"
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>
      {status === "success" && (
        <p className="text-green-500 mt-2">Successfully subscribed!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-2">
          An error occurred. Please try again.
        </p>
      )}
      {status === "duplicate" && (
        <p className="text-yellow-500 mt-2">
          This email is already subscribed.
        </p>
      )}
    </form>
  );
}
