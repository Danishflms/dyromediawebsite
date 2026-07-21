import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "dyro-media",
  title: "Dyro Media",

  projectId: projectId ?? "",
  dataset: dataset ?? "",
  basePath: "/studio",

  schema,

  plugins: [
    structureTool({ structure }),
    // Vision lets you run raw GROQ queries from the Studio — dev/debug only.
    ...(process.env.NODE_ENV === "development" ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
});
