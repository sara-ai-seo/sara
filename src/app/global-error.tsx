"use client";

import React from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <html>
      <body>
        <section className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-col justify-center">
            <h2>Something went wrong!</h2>
            <button
              className="p-2 mt-3 rounded-md bg-red-200"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
