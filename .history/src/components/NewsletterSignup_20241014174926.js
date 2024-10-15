"use client";
import React, { useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function NewsletterSignup() {
  const supabase = createClientComponentClient();
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = async (event) => {
      // Ensure the message is from Beehiiv
      if (event.origin !== "https://embeds.beehiiv.com") return;

      try {
        const data = JSON.parse(event.data);
        if (data.type === "signup" && data.email) {
          // Store the email in Supabase
          const { error } = await supabase
            .from("newsletter_subscriptions")
            .insert([{ email: data.email }]);

          if (error) {
            console.error("Supabase insertion error:", error);
          } else {
            console.log("Email successfully stored in Supabase");
          }
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [supabase]);

  return (
    <div className="w-full max-w-md mx-auto">
      <iframe
        ref={iframeRef}
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
