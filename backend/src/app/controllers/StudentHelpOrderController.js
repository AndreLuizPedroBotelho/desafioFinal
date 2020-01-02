import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async index(req, res) {
    const { studentId } = req.params;
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }
    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: studentId,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
      order: ['updatedAt'],
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    req.body.student_id = studentId;
    const helpOrder = await HelpOrder.create(
      {
        student_id: studentId,
        question: req.body.question,
      },
      {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
          },
        ],
      }
    );

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
