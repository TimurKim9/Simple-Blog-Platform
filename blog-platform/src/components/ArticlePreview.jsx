function ArticlePreview({ article }) {
  return (
    <div>
      <h2>{article.title}</h2>

      <p>{article.description}</p>

      <p>Author: {article.author.username}</p>
    </div>
  );
}

export default ArticlePreview;