import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/content/articles?lang=${language}`)
      .then(res => res.json())
      .then(data => {
        // Filtrar artículos que tengan contenido y título
        const filtered = (data.articles || []).filter((a: Article) => a.title && a.content);
        setArticles(filtered);
        setLoading(false);
      })
      .catch(err => {
        setError('Error cargando artículos');
        setLoading(false);
      });
  }, [language]);

  if (loading) return <div>Cargando artículos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-2 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8">Blog de Salud</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {articles.map(article => (
          <div
            key={article.url}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer group"
            onClick={() => navigate(`/blog${article.url}`)}
          >
            <h2 className="text-xl font-bold text-brand-blue mb-2 group-hover:underline">{article.title}</h2>
            <div className="prose prose-sm max-w-none text-gray-600 mb-2"
              dangerouslySetInnerHTML={{ __html: article.content.slice(0, 180) + '...' }} />
            <span className="mt-auto text-xs text-gray-400">{article.lang === 'es' ? 'Español' : 'English'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
