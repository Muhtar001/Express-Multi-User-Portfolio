// routes/blogRoutes.js
import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: blogs
 *   description: blog management
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blog'
 */
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: true,
        tags: true,
        categories: true,
      },
    });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog ID
 *     responses:
 *       200:
 *         description: blog data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       404:
 *         description: blog not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        user: true,
        tags: true,
        categories: true,
      },
    });
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: blog created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const blog = await prisma.blog.create({
      data: req.body,
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: blog updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: blog not found
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: req.body,
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog ID
 *     responses:
 *       204:
 *         description: blog deleted
 *       400:
 *         description: Invalid input
 *       404:
 *         description: blog not found
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
