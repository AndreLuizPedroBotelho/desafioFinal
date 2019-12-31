import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: ['title'],
      attributes: ['id', 'title', 'duration', 'price', 'priceDuration'],
    });

    res.json(plans);
  }

  async show(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId, {
      attributes: ['id', 'title', 'duration', 'price', 'priceDuration'],
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { planId } = req.params;
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'Plan dont exists' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { planId } = req.params;
    const plan = await Plan.destroy({
      where: {
        id: planId,
      },
    });

    if (plan < 1) {
      return res.status(400).json({ error: 'Plan dont exists' });
    }

    return res.json({ success: 'Delete with success' });
  }
}

export default new PlanController();
