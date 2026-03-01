const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Parameter, Category, User } = require('../models');
const { success, failure } = require('../utils/responses');

/**
 * 查询首页数据
 * GET /
 */
router.get('/', async function (req, res, next) {
  try {
    // 焦点图（首部数据）
    const recommendedParameters = await Parameter.findAll({
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
          attributes: ['id', 'username', 'nickname', 'avatar', 'company'],
        }
      ],
      where: {
        reminder: {
          [Op.ne]: 0
        }
      },
      order: [['reminder','desc'],['id', 'asc']],
      limit: 10
    });
    // 手环数据
    const likesParameters = await Parameter.findAll({
      attributes: { exclude: ['CategoryId', 'UserId'] },
      where: { categoryId:1 },
      order: [['id', 'asc']]
    });
    // 睡眠数据
    const introductoryParameters = await Parameter.findAll({
      attributes: { exclude: ['CategoryId', 'UserId'] },
      where: { categoryId:2 },
      order: [['id', 'asc']],
      limit: 10
    });

    success(res, '获取首页数据成功。', {
      recommendedParameters,
      likesParameters,
      introductoryParameters
    });

  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
