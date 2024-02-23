import React from "react";
import { readGrantId } from "@/lib/actions/nylas.actions";
import { cookies } from "next/headers";

const Page = async () => {
  const userGrantId = await readGrantId(
    cookies().get("nylas_user_grant_id")!.toString()
  );

  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <a
        href="/connect/calendar"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {userGrantId ? "Connected! " : "Sign in "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Connect Account to Get Time to Next Meeting
        </p>
      </a>
    </div>
  );
};

export default Page;
