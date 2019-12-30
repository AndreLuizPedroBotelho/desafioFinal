import User from '../models/User';
import { Op } from 'sequelize';

class UserController {
  async index(req, res) {
    const { q = '' } = req.query;

    const users = await User.findAll({
      where: {
        [Op.like]: `%${q}%`
      },
      order: ['id'],
    });
    return res.json(users);
  }
}

export default new UserController();
