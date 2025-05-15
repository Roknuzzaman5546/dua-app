import { Router } from 'express';
import { getDBConnection } from '../db';
const router = Router();

router.get('/categories', async (_req, res) => {
  const db = await getDBConnection();
  const categories = await db.all('SELECT * FROM category');
  res.json(categories);
});

router.get('/all-duas', async (_req, res) => {
  const db = await getDBConnection();
  const duas = await db.all('SELECT * FROM dua');
  res.json(duas);
});

router.get('/subcategories/:categoryId', async (req, res) => {
  const db = await getDBConnection();
  const subcategories = await db.all(
    'SELECT * FROM sub_category WHERE cat_id = ?',
    [req.params.categoryId]
  );
  res.json(subcategories);
});

router.get('/duas/:subcategoryId', async (req, res) => {
  const db = await getDBConnection();
  const duas = await db.all(
    'SELECT * FROM dua WHERE subcat_id = ?',
    [req.params.subcategoryId]
  );
  res.json(duas);
});

export default router;
