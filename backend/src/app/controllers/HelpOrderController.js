import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },

      order: [['id', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });
    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
