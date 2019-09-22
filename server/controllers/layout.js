// Models
const Layout = require('../models/layout');

module.exports = {
  async findAll(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layouts = await Layout.findAll(filter);

    res.status(200).send(layouts);
  },

  async findByPk(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layout = await Layout.findByPk(req.params.id, filter);

    if (!layout) {
      res.status(404).send({
        message: 'Шаблон не найден!'
      });
      return;
    }

    res.status(200).send(layout);
  },

  async findOne(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Не доступно!'
      });
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const layout = await Layout.findOne(filter);

    if (!layout) {
      res.status(404).send({
        message: 'Шаблон не найден!'
      });
      return;
    }

    res.status(200).send(layout);
  },

  async create(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const createdLayout = await Layout.create(req.body);

    res.status(200).send(createdLayout);
  },

  async update(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const layout = await Layout.findByPk(req.body.id);

    if (!layout) {
      res.status(401).send({
        message: 'Не найдено!'
      });
      return;
    }

    const updateLayout = req.body;
    delete updateLayout.id;

    const updatedLayout = await layout.update(updateLayout);

    res.status(200).send(updatedLayout);
  },

  async remove(req, res) {
    if (!req.adminAccess) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const layout = await Layout.findByPk(req.body.id);

    if (!layout) {
      res.status(404).send({
        message: 'Шаблон не найден!'
      });
    }

    await Layout.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).send({
      message: 'Успешно удалено!'
    });
  },

  async count(req, res) {
    if (!(req.adminAccess || req.managerAccess)) {
      res.status(401).send({
        message: 'Нет доступа!'
      });
      return;
    }

    const filter = JSON.parse(req.query.filter || "{}");

    const count = await Layout.count(filter);

    res.status(200).send({
      count
    });
  }
}
