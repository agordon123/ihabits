import { headers } from "next/headers";
import React from "react";

const Page = () => {
  const authorization = headers().get("authorization");
  if (!authorization) {
    return <div>Unauthorized</div>;
  }
  return <div>Page</div>;
};

export default Page;
