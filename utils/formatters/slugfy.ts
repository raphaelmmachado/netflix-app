//CHAT GPT 🤣
export default function slugify(title: string): string {
  // Remove any non-alphanumeric characters and convert spaces to hyphens
  // Remove any non-alphanumeric characters except letters with accents and convert spaces to hyphens
  let slug = title
    .replace(/[^\p{L}\d\s\-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase and return the slug
  return slug.toLowerCase();
}
