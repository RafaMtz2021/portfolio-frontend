const API_URL = import.meta.env.PUBLIC_API_URL; // se define en `.env`

export async function fetchServices() {
  const res = await fetch(`${API_URL}/items/services`);
  const json = await res.json();
  return json.data;
}

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/items/projects?fields=*,image.filename_disk`);
  const json = await res.json();
  return json.data;
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_URL}/items/blog_posts?fields=*,image.filename_disk`);
  const json = await res.json();
  return json.data;
}

export async function fetchSinglePost(slug: string) {
  const res = await fetch(`${API_URL}/items/blog_posts?filter[slug][_eq]=${slug}`);
  const json = await res.json();
  return json.data[0];
}

export function getImageUrl(filename: string) {
  return `${API_URL}/assets/${filename}`;
}
