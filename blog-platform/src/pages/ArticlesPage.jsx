import Header from '../components/Header';
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
    <>
      <Header />

      <section className="hero">
        <h1>Realworld Blog</h1>
        <p>A place to share your knowledge.</p>
      </section>

      <main className="articles-page">
        <div className="articles-container">
          <h2>Popular tags</h2>

          <div className="popular-tags">
            <span>one</span>
            <span>something</span>
            <span>chinese</span>
            <span>english</span>
            <span>french</span>
          </div>

          <div className="articles-list">
            {articles.map((article) => (
              <ArticlePreview
                key={article.slug}
                article={article}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default ArticlesPage;