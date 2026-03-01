const express = require('express');
const router = express.Router();
const { Parameter, Category, User, History } = require('../../models');
const { Op } = require('sequelize');
const { NotFoundError } = require('../../utils/errors');
const { success, failure } = require('../../utils/responses');

/**
 * 查询健康参数列表
 * GET /admin/parameters
 */
router.get('/', async function (req, res) {
  try {
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    const condition = {
      ...getCondition(),
      order: [['id', 'ASC']],
      limit: pageSize,
      offset: offset
    };



    if (query.categoryId) {
      condition.where = {
        categoryId: {
          [Op.eq]: query.categoryId
        }
      };
    }

    if (query.userId) {
      condition.where = {
        userId: {
          [Op.eq]: query.userId
        }
      };
    }

    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${ query.name }%`
        }
      };
    }

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
 * 查询健康参数详情
 * GET /admin/parameters/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const parameter = await getParameter(req);
    success(res, '查询健康参数成功。', { parameter });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建健康参数
 * POST /admin/parameters
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);
      // 获取当前登录的用户 ID
    body.userId = req.user.id;

    const parameter = await Parameter.create(body);
    success(res, '创建健康参数成功。', { parameter }, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新健康参数
 * PUT /admin/parameters/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const parameter = await getParameter(req);
    const body = filterBody(req);

    await parameter.update(body);
    success(res, '更新健康参数成功。', { parameter });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 删除健康参数
 * DELETE /admin/parameters/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const parameter = await getParameter(req);
    const count = await History.count({ where: { parameterId: req.params.id } });
    if (count > 0) {
      throw new Error('当前健康参数有历史数据，无法删除。');
    }
    await parameter.destroy();
    success(res, '删除健康参数成功。');
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：关联分类、用户数据
 * @returns {{include: [{as: string, model, attributes: string[]}], attributes: {exclude: string[]}}}
 */
function getCondition() {
  return {
    attributes: { exclude: ['CategoryId', 'UserId'] },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'avatar']
      }
    ]
  }
}


/**
 * 公共方法：查询当前健康参数
 */
async function getParameter(req) {
  const { id } = req.params;
  const condition = getCondition();
  const parameter = await Parameter.findByPk(id, condition);
  if (!parameter) {
    throw new NotFoundError(`ID: ${ id }的健康参数未找到。`)
  }

  return parameter;
}

/**
 * 
 * @param {*} req 
 * @returns 
 */
function filterBody(req) {
  return {
    categoryId: req.body.categoryId,
    name: req.body.name,
    image: req.body.image,
    upthreshold: req.body.upthreshold,
    downthreshold: req.body.downthreshold,
    number:req.body.number,
    reminder:req.body.reminder,
    unit:req.body.unit,
  };
}


module.exports = router;
