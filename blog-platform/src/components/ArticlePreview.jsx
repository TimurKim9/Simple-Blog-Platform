import { Link } from 'react-router-dom';

function ArticlePreview({ article }) {
  return (
    <article className="article-card">
      <div className="article-header">
        <div className="article-meta">
          <img
            className="author-icon"
            src="/icons/user.svg"
            alt="faceless guy"
          />

          <div>
            <div className="author-name">
              {article.author.username}
            </div>

            <div className="article-date">
              {new Date(article.createdAt).toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        <button className="favorite-button">
          <img
            className="favorite-icon"
            src="/icons/like.svg"
            alt="like like like"
          />

          {article.favoritesCount}
        </button>
      </div>

      <h2>{article.title}</h2>

      <p className="article-description">
        {article.description}
      </p>

      <div className="article-bottom">
        <div className="article-tags">
          {article.tagList?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <Link
          className="read-more"
          to={`/articles/${article.slug}`}
        >
          Read more...
        </Link>
      </div>
    </article>
  );
}

export default ArticlePreview;