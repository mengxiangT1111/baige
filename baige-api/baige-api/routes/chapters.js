const express = require('express');
const router = express.Router();
const { Parameter, Category, History, User } = require('../models');
const { success, failure } = require('../utils/responses');
const { NotFoundError } = require("../utils/errors");

/**
 * 查询历史数据详情
 * GET /histories/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const condition = {
      attributes: { exclude: ['ParameterId'] },
      include: [
        {
          model: Parameter,
          as: 'parameter',
          attributes: ['id', 'name'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'nickname', 'avatar', 'company'],
            }
          ]
        }
      ]
    };

    const history = await History.findByPk(id, condition);
    if (!history) {
      throw new NotFoundError(`ID: ${ id }的历史数据未找到。`)
    }

    // 同属一个课程的所有历史数据
    const histories = await History.findAll({
      attributes: { exclude: ['ParameterId', 'content'] },
      where: { parameterId: history.parameterId },
      order: [['rank', 'ASC'], ['id', 'DESC']]
    });

    success(res, '查询历史数据成功。', { history, histories });
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
