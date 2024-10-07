import * as productService from "../services/productService.js";
import { CreateProduct, PatchProduct, assert } from "../validations/structs.js";

export const getProductList = async (req, res) => {
  const { orderBy } = req.query;
  const page = parseInt(req.query.page) * 1 || 1;
  const pageSize = parseInt(req.query.pageSize) * 1 || 10;
  const keyword = req.query.keyword || "";

  const products = await productService.getProducts({
    orderBy,
    page,
    pageSize,
    keyword,
  });

  res.json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const product = await productService.getProduct(productId, userId);
  res.json(product);
};

export const createProduct = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  assert(data, CreateProduct);
  const newProduct = await productService.createProduct(userId, data);
  res.status(201).json(newProduct);
};

export const updateProductById = async (req, res) => {
  const { productId } = req.params;
  const data = req.body;

  assert(data, PatchProduct);

  const product = await productService.updateProduct(productId, data);
  return res.json(product);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await productService.deleteProduct(productId);
  return res.status(204).json({ message: "게시글이 삭제되었습니다" });
};

export const createFavoriteOnProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const product = await productService.createFavorite(productId, userId);
  return res.json(product);
};

export const deleteFavoriteOnProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const product = await productService.deleteFavorite(productId, userId);
  return res.json(product);
};
