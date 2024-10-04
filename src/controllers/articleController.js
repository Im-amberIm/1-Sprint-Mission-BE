import articleService from "../services/articleService";

const getArticleList = async (req, res) => {
  const { orderBy } = req.query || "recent";
  const page = parseInt(req.query.page) * 1 || 1;
  const pageSize = parseInt(req.query.pageSize) * 1 || 10;
  const keyword = req.query.keyword || "";

  const articles = await articleService.getArticles({
    orderBy,
    page,
    pageSize,
    keyword,
  });

  return res.json(articles);
};

const getArticleById = async (req, res) => {
  const { articleId } = req.params;
  const article = await articleService.getArticle(articleId);
  return res.json(article);
};

const createArticle = async (req, res) => {
  const data = req.body;
  const newArticle = await articleService.createArticle(data);

  return res.status(201).json(newArticle);
};

const updateArticleById = async (req, res) => {
  const { articleId } = req.params;
  const data = req.body;
  const updatedArticle = await articleService.updateArticle(articleId, data);
  return res.json(updatedArticle);
};

const deleteArticleById = async (req, res) => {
  const { articleId } = req.params;
  await articleService.deleteArticle(articleId);
  return res.status(204).json({ message: "게시글이 삭제되었습니다" });
};

export default {
  getArticleList,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
