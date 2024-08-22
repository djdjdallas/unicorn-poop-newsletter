"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Load Beehiiv script
    const script = document.createElement("script");
    script.src = "https://beehiiv.com/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Supabase submission
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email }]);

      if (error) throw error;

      // Beehiiv submission
      if (window.beehiiv) {
        await window.beehiiv.subscribe("4a201491-ea1e-42c7-8e21-765012205009", {
          email,
        });
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus(error.code === "23505" ? "duplicate" : "error");
    }
  };

  return (
    <div>
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
      </form>
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
      <iframe
        src="https://embeds.beehiiv.com/4a201491-ea1e-42c7-8e21-765012205009?slim=true"
        data-test-id="beehiiv-embed"
        height="52"
        frameBorder="0"
        scrolling="no"
        style={{
          margin: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "100%",
        }}
      />
    </div>
  );
}
