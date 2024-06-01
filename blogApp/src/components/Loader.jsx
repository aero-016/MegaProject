import React from "react";
import { Container } from "../components";
export default function Loader() {
  return (
    <div className="w-full py-8 ">
      <Container>
        <div className="flex flex-wrap justify-center gap-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex flex-col bg-neutral-300 w-72 h-64 animate-pulse rounded-xl p-4 gap-4" key={index}>
              <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
              <div className="flex flex-col gap-2">
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
