export const servicesQuery = `*[_type == "serviceCategory"] {
  _id,
  title,
  slug,
  description,
  "image": image.asset->url,
  "services": services[]->{
    _id,
    title,
    description
  }
} | order(_createdAt asc)`;
