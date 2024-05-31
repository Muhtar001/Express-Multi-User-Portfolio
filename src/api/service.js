// routes/serviceRoutes.js
import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: services
 *   description: service management
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [services]
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/service'
 */
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        user: true,
        tags: true,
        categories: true,
      },
    });
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: service ID
 *     responses:
 *       200:
 *         description: service data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/service'
 *       404:
 *         description: service not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        user: true,
        tags: true,
        categories: true,
      },
    });
    if (!service) {
      return res.status(404).json({ error: 'service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/service'
 *     responses:
 *       200:
 *         description: service created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/service'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const service = await prisma.service.create({
      data: req.body,
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/service'
 *     responses:
 *       200:
 *         description: service updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/service'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: service not found
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.update({
      where: { id },
      data: req.body,
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: service ID
 *     responses:
 *       204:
 *         description: service deleted
 *       400:
 *         description: Invalid input
 *       404:
 *         description: service not found
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
