// Copyright 2020 the Deno authors. All rights reserved. MIT license.

import { Documentation } from "../components/Documentation";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const { query } = useRouter();
  if (!query.url) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="text-3xl text-gray-800">No entrypoint selected</div>
      </div>
    );
  }
  const url = typeof query.url === "string" ? query.url : query.url.join("/");
  return <Documentation entrypoint={url} name={url} />;
};

export default Page;
