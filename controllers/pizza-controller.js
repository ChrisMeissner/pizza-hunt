const { Pizza } = require('../models');

const pizzaController = {
  // the functions will go in here as methods
  // get all pizzas (Mongoose .find() method is similar to Sequelize .findAll())
  getAllPizza(req, res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // get one pizza by id
  getPizzaById({params}, res) {
    Pizza.findOne({ _id: params.id })
    .then(dbPizzaData => {
      // If no pizza is found, send 404
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // create method for handling POST /api/pizzas
  // createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
    .then(dbPizzaData => response.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
  },

  // add the method for updating a pizza PUT /api/pizzas/:id
  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({message: 'No pizza found with this id!'});
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  },

  //create the method to delete a pizza from the database DELETE /api/pizzas/:id
  //delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!'});
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;