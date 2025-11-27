import { createClient } from "next-sanity";

const client = createClient({
  projectId: "otwwa6lf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export default client;