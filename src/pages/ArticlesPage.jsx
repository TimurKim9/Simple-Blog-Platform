
import Header from '../components/Header';
import ArticlePreview from '../components/ArticlePreview';
import Tag from '../components/Tag';
import Banner from '../components/Banner';
import Pagination from '../components/Pagination';

import { useEffect, useState } from 'react';
import { getArticles } from '../api/articles';

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
        setError(null);

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

  return (
    <>
      <Header />

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : (
        <>
          <Banner />

          <main className="articles-page">
            <div className="articles-container">
              <h2>Popular tags</h2>

              <div className="popular-tags">
                <Tag name="one" />
                <Tag name="something" />
                <Tag name="chinese" />
                <Tag name="english" />
                <Tag name="french" />
              </div>

              <div className="articles-list">
                {articles.map((article) => (
                  <ArticlePreview
                    key={article.slug}
                    article={article}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default ArticlesPage;
