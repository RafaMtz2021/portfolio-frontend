const API_URL = import.meta.env.PUBLIC_API_URL;

function checkApiUrl() {
  if (!API_URL) {
    throw new Error('❌ PUBLIC_API_URL no está definido. Asegúrate de establecer la variable de entorno correctamente.');
  }
}

async function safeFetch(url: string) {
  checkApiUrl();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ Error al hacer fetch: ${url} - Status: ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json?.data ?? null;
  } catch (err) {
    console.error(`❌ Error al hacer fetch: ${url}`, err);
    return null;
  }
}

export async function fetchServices() {
  return await safeFetch(`${API_URL}/items/services`);
}

export async function fetchProjects() {
  return await safeFetch(`${API_URL}/items/projects?fields=*,image.filename_disk`);
}

export async function fetchBlogPosts() {
  return await safeFetch(`${API_URL}/items/blog_posts?fields=*,image.filename_disk`);
}

export async function fetchSinglePost(slug: string) {
  const data = await safeFetch(`${API_URL}/items/blog_posts?filter[slug][_eq]=${slug}`);
  return Array.isArray(data) ? data[0] : null;
}

export function getImageUrl(filename: string) {
  checkApiUrl();
  return `${API_URL}/assets/${filename}`;
}
