import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Article {
  url: string;
  title: string;
  content: string;
  tags?: string[];
  categories?: string[];
  lang?: string;
  layout?: string;
}

const BlogDetail: React.FC = () => {
  const { '*': urlParam } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fallback, setFallback] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setFallback(false);
    const fetchArticle = async (lang: string) => {
      const res = await fetch(`/api/content/articles?lang=${lang}`);
      const data = await res.json();
      const cleanParam = urlParam?.startsWith('/') ? urlParam : '/' + (urlParam || '');
      return (data.articles || []).find((a: Article) => a.url === cleanParam) || null;
    };
    (async () => {
      let found = await fetchArticle(language);
      if (!found && language === 'es') {
        found = await fetchArticle('en');
        setFallback(true);
      }
      if (found) setArticle(found);
      else setError('Artículo no encontrado');
      setLoading(false);
    })();
  }, [urlParam, language]);

  if (loading) return <div>Cargando artículo...</div>;
  if (error) return <div>{error} <button onClick={() => navigate('/blog')}>Volver</button></div>;
  if (!article) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-2 flex justify-center">
      <article className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-gray-100">
        <button onClick={() => navigate('/blog')} className="mb-6 text-brand-blue hover:underline text-sm font-semibold flex items-center gap-1">
          <span className="text-lg">←</span> Volver al blog
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4 leading-tight">{article.title}</h1>
        {fallback && (
          <div className="bg-yellow-100 text-yellow-800 rounded px-3 py-2 mb-4 text-sm font-medium">
            Este artículo no está disponible en español. Mostrando versión en inglés.
          </div>
        )}
        <div
          className="prose max-w-none prose-blue prose-lg"
          style={{
            '--tw-prose-links': '#2563eb',
            '--tw-prose-link-hover': '#1d4ed8',
            '--tw-prose-headings': '#0f172a',
            '--tw-prose-bold': '#0f172a',
            '--tw-prose-bullets': '#2563eb',
            '--tw-prose-hr': '#e5e7eb',
            '--tw-prose-quotes': '#334155',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
};

export default BlogDetail;
