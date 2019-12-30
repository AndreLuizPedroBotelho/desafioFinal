import * as Yup from 'yup';
import Student from '../models/Student';
import { Op } from 'sequelize';

class StudentController {
  async index(req, res) {
    const { q = '' } = req.query;

    const students = await Student.findAll({
      attributes: ['id', 'age', 'name', 'email'],
      where: {
        name: {
          [Op.like]: `%${q}%`
        }
      },
    }
    );
    res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
      attributes: ['id', 'age', 'name', 'email', 'weight', 'height'],
    })

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User alredy exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.destroy({
      where: {
        id
      },
    });

    if (student < 1) {
      return res.status(400).json({ error: 'Student dont exists' });
    }

    return res.json({ success: 'Delete with success' });
  }
}

export default new StudentController();
