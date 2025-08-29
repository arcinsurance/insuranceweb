import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Configuración de endpoints y cache
const SOURCES = {
  articles: {
    en: 'https://www.healthcare.gov/api/articles.json',
    es: 'https://www.cuidadodesalud.gov/api/articles.json',
  },
  glossary: {
    en: 'https://www.healthcare.gov/api/glossary.json',
    es: 'https://www.cuidadodesalud.gov/api/glossary.json',
  },
};

const CACHE_TTL = 30 * 60 * 1000; // 30 minutos
const cache = {
  articles: { en: null, es: null, en_ts: 0, es_ts: 0 },
  glossary: { en: null, es: null, en_ts: 0, es_ts: 0 },
};

async function getCached(type, lang) {
  const now = Date.now();
  const tsKey = lang + '_ts';
  if (cache[type][lang] && now - cache[type][tsKey] < CACHE_TTL) {
    return cache[type][lang];
  }
  const url = SOURCES[type][lang] || SOURCES[type]['en'];
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch ' + type);
  const data = await res.json();
  cache[type][lang] = data;
  cache[type][tsKey] = now;
  return data;
}

// Endpoint para artículos
router.get('/articles', async (req, res) => {
  const lang = req.query.lang === 'es' ? 'es' : 'en';
  try {
    const data = await getCached('articles', lang);
    res.json(data);
  } catch (e) {
    console.error('Error en /api/content/articles:', e);
    res.status(500).json({ error: 'Error fetching articles', details: e.message });
  }
});

// Endpoint para glosario
router.get('/glossary', async (req, res) => {
  const lang = req.query.lang === 'es' ? 'es' : 'en';
  try {
    const data = await getCached('glossary', lang);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching glossary', details: e.message });
  }
});

export default router;
