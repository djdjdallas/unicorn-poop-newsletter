"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Here you would typically send the email to your backend or directly to Beehiiv's API
    // For now, we'll just simulate an API call
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If successful:
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
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
    </form>
  );
}
