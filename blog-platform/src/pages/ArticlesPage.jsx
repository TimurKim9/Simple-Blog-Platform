import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getArticles } from '../api/articles';
import ArticlePreview from '../components/ArticlePreview';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const limit = 10;

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);

        const offset = (page - 1) * limit;

        const data = await getArticles(limit, offset);

        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [page]);

  const totalPages = Math.ceil(articlesCount / limit);

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

          <div className="pagination">
            {Array.from(
              { length: Math.min(totalPages, 7) },
              (_, index) => {
                 const pageNumber = index + 1;

                return (
                  <button
                     key={pageNumber}
                     className={page === pageNumber ? 'active' : ''}
                     onClick={() => setPage(pageNumber)}
                    >
                     {pageNumber}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ArticlesPage;