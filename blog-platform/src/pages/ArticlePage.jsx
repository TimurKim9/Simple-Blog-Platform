import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticle } from '../api/articles';

function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticle() {
      try {
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>{article.title}</h1>

      <p>{article.description}</p>

      <p>Author: {article.author.username}</p>

      <ReactMarkdown>{article.body}</ReactMarkdown>
    </div>
  );
}

export default ArticlePage;