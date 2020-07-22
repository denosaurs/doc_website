// Copyright 2020 the Deno authors. All rights reserved. MIT license.

import { createContext, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { DocNode } from "./docs";

const flattendContext = createContext<DocNode[]>([]);

export function useFlattend() {
  return useContext(flattendContext);
}

export const FlattendProvider = flattendContext.Provider;

export interface DocsData {
  timestamp: string;
  nodes: DocNode[];
}

export async function getData(
  url: string,
  reload: boolean = false,
  lib: boolean = false,
): Promise<DocsData> {
  const query = new URLSearchParams();
  query.append("url", url);
  query.append("reload", String(reload));
  query.append("lib", String(lib));
  const req = await fetch(
    `/api/docs?${query}`
  );
  if (!req.ok) throw new Error((await req.json()).error);
  const resp = await req.json();
  return {
    timestamp: resp.timestamp,
    nodes: resp.nodes,
  };
}
