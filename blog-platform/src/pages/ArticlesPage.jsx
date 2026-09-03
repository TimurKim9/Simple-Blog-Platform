import { useEffect, useState } from 'react';
import { getArticles } from '../api/articles';
import ArticlePreview from '../components/ArticlePreview';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getArticles();

        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Articles</h1>

        {articles.map((article) => (
          <ArticlePreview
            key={article.slug}
            article={article}
          />
        ))}
    </div>
  );
}

export default ArticlesPage;