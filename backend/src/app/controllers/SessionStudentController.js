import * as Yup from 'yup';
import Student from '../models/Student';
import Registration from '../models/Registration';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.body;

    const student = await Student.findByPk(id, {
      attributes: ['id'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const registration = await Registration.findAll({
      include: ['plan', 'student'],
      where: {
        "student_id": id
      }
    })

    if (registration.length <= 0) {
      return res.status(400).json({ error: 'Student has not registration.' });
    }

    return res.json(student);

  }
}
export default new SessionStudentController();
