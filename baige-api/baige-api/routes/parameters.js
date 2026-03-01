const express = require('express');
const router = express.Router();
const { Parameter,Category,History,User } = require('../models');
const { success, failure } = require('../utils/responses');
const { NotFoundError } = require('../utils/errors');
/**
 * 查询健康参数列表
 * GET /parameters
 */
router.get('/', async function (req, res) {
  try {
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    if (!query.categoryId) {
      throw new Error('获取健康参数列表失败，分类ID不能为空。');
    }

    const condition = {
      attributes: { exclude: ['CategoryId', 'UserId', 'content'] },
      where: { categoryId: query.categoryId },
      order: [['id', 'DESC']],
      limit: pageSize,
      offset: offset
    };

    const { count, rows } = await Parameter.findAndCountAll(condition);
    success(res, '查询健康参数列表成功。', {
      parameters: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize,
      }
    });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 查询课程详情
 * GET /parameters/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const condition = {
      attributes: { exclude: ['CategoryId', 'UserId'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: History,
          as: 'histories',
          attributes: ['id', 'title', 'rank', 'createdAt'],
          order: [['rank', 'ASC'], ['id', 'DESC']]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company']
        }
      ]
    };

    const parameter = await Parameter.findByPk(id, condition);
    if (!parameter) {
      throw new NotFoundError(`ID: ${ id }的课程未找到。`)
    }

    success(res, '查询课程成功。', { parameter });
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
