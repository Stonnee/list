const Stuff = require('../Model/stuff');

exports.createThing = (req, res, next) => {    
    delete req.body._id;
  const stuff = new Stuff({
    ...req.body
  });
  stuff.save()
    .then(() => {res.status(201).json({ message: 'Post saved successfully!'});})
    .catch((error) => {res.status(400).json({error: error});});
};


exports.modifyThing = (req, res, next) => {
  Stuff.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };


exports.deleteThing = (req, res, next) => {
    Stuff.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Deleted!'});})
    .catch((error) => {res.status(400).json({error: error});});
};


exports.getAllStuff = (req, res, next) => {
  Stuff.find()
  .then((things) => {res.status(200).json(things);})
  .catch((error) => {res.status(400).json({error: error });});
};