export const WORK_QUERY = `*[_type == "work"] | order(order asc) {
  _id,
  title,
  subtitle,
  category,
  videoUrl,
  "thumbnailUrl": thumbnail.asset->url
}`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  order
}`;

export const HEADER_QUERY = `*[_type == "header"][0] {
  logo,
  menu,
  cta
}`;

export const CLIENTS_QUERY = `*[_type == "clientLogo"] | order(order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url,
  order
}`;

export const QUOTE_QUERY = `*[_type == "quote"][0] {
  _id,
  quote,
  author,
  role
}`;