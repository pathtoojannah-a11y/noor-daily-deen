const BASE = import.meta.env.VITE_DUA_API_BASE || 'https://dua-dhikr-two.vercel.app';

export interface Category {
  slug: string;
  name: string;
  count: number;
  icon: string | null;
}

export interface Dua {
  id: string;
  title: string;
  ar: string;
  en: string;
  translit: string;
  source: string;
  audio: string | null;
  benefits: string[];
}

export async function listCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE}/api/categories`);
    const json = await res.json();
    const arr = json.categories ?? json.data ?? [];
    if (arr.length === 0) {
      const { seedCategories } = await import('./seeds');
      return seedCategories;
    }
    return arr.map((c: any) => ({
      slug: c.slug || c.id || c.name?.toLowerCase()?.replace(/\s+/g, '-') || 'unknown',
      name: c.name || c.title || 'Category',
      count: c.count ?? c.total ?? 0,
      icon: c.icon ?? null
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    const { seedCategories } = await import('./seeds');
    return seedCategories;
  }
}

export async function getDuasByCategory(slug: string): Promise<Dua[]> {
  try {
    const res = await fetch(`${BASE}/api/duas?category=${encodeURIComponent(slug)}`);
    const json = await res.json();
    const arr = json.duas ?? json.data ?? [];
    if (arr.length === 0) {
      const { seedDuas } = await import('./seeds');
      return seedDuas[slug] || [];
    }
    return arr.map((d: any) => ({
      id: d.id ?? d.slug ?? crypto.randomUUID(),
      title: d.title ?? d.name ?? '',
      ar: d.arabic ?? d.textAr ?? d.ar ?? '',
      en: d.translation ?? d.textEn ?? d.en ?? '',
      translit: d.transliteration ?? d.translit ?? '',
      source: d.source ?? d.reference ?? '',
      audio: d.audio ?? null,
      benefits: Array.isArray(d.benefits) ? d.benefits : []
    }));
  } catch (error) {
    console.error('Error fetching duas:', error);
    const { seedDuas } = await import('./seeds');
    return seedDuas[slug] || [];
  }
}

export async function pickDuaFor(slot: 'morning' | 'evening' | 'bedtime'): Promise<Dua | null> {
  const slug = slot === 'morning' ? 'morning' : slot === 'evening' ? 'evening' : 'bedtime';
  const list = await getDuasByCategory(slug);
  return list[Math.floor(Math.random() * Math.max(1, list.length))] ?? null;
}
