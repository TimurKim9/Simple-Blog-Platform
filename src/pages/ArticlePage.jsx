
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import Header from '../components/Header';
import { getArticle } from '../api/articles';

function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        setError(null);

        const data = await getArticle(slug);
        setArticle(data.article);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  return (
    <>
      <Header />

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : article ? (
        <main className="article-page">
          <section className="single-article-header">
            <div className="single-article-header-content">
              <h1>{article.title}</h1>

              <div className="article-author">
                <img
                  className="author-icon"
                  src="/icons/user.svg"
                  alt="user"
                />

                <div>
                  <strong>{article.author.username}</strong>
                  <small>
                    {format(
                      new Date(article.createdAt),
                      'dd/MM/yyyy'
                    )}
                  </small>
                </div>
              </div>
            </div>
          </section>

          <section className="article-content">
            <p className="article-description">
              {article.description}
            </p>

            <ReactMarkdown>
              {article.body}
            </ReactMarkdown>

            <div className="article-tags">
              {article.tagList.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="article-actions">
              <div className="article-author-bottom">
                <img
                  className="author-icon"
                  src="/icons/user.svg"
                  alt="user"
                />

                <div>
                  <strong>{article.author.username}</strong>
                  <small>
                    {format(
                      new Date(article.createdAt),
                      'dd/MM/yyyy'
                    )}
                  </small>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
}

export default ArticlePage;
