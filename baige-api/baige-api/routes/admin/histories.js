const express = require('express');
const router = express.Router();
const { History, Parameter} = require('../../models');
const { Op } = require('sequelize');
const { NotFoundError } = require('../../utils/errors');
const { success, failure } = require('../../utils/responses');

/**
 * 查询历史数据列表
 * GET /admin/histories
 */
router.get('/', async function (req, res) {
  try {
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    if (!query.parameterId) {
      throw new Error('获取历史数据列表失败，健康参数ID不能为空。');
    }

    const condition = {
      ...getCondition(),
      order: [['rank', 'ASC'], ['id', 'ASC']],
      limit: pageSize,
      offset: offset
    };

    condition.where = {
      parameterId: {
        [Op.eq]: query.parameterId
      }
    };

    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${ query.title }%`
        }
      };
    }


    const { count, rows } = await History.findAndCountAll(condition);
    success(res, '查询历史数据列表成功。', {
      histories: rows,
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
 * 查询历史数据详情
 * GET /admin/histories/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const history = await getHistory(req);
    success(res, '查询历史数据成功。', { history });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建历史数据
 * POST /admin/histories
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);

    const history = await History.create(body);
    success(res, '创建历史数据成功。', { history }, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新历史数据
 * PUT /admin/histories/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const history = await getHistory(req);
    const body = filterBody(req);

    await history.update(body);
    success(res, '更新历史数据成功。', { history });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 删除历史数据
 * DELETE /admin/histories/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const history = await getHistory(req);

    await history.destroy();
    success(res, '删除历史数据成功。');
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：关联课程数据
 * @returns {{include: [{as: string, model, attributes: string[]}], attributes: {exclude: string[]}}}
 */
function getCondition() {
  return {
    attributes: { exclude: ['ParameterId'] },
    include: [
      {
        model: Parameter,
        as: 'parameter',
        attributes: ['id', 'name']
      }
    ]
  }
}


/**
 * 公共方法：查询当前历史数据
 */
async function getHistory(req) {
  const { id } = req.params;
  const condition = getCondition();
  const history = await History.findByPk(id,condition);
  if (!history) {
    throw new NotFoundError(`ID: ${ id }的历史数据未找到。`)
  }

  return history;
}

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns {{rank: (number|*), day: (number|*),data: (number|*), title, parameterId: (number|*), content}}
 */
function filterBody(req) {
  return {
    parameterId: req.body.parameterId,
    title: req.body.title,
    content: req.body.content,
    day: req.body.day,
    data: req.body.data,
    rank: req.body.rank
  };
}


module.exports = router;
