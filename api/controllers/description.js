import Description from '../models/description.js'

exports.update = async (req, res) => {
  let id = req.body.id
  let where = req.body.where
  let value = req.body.value
  try {
    Description.findByIdAndUpdate(      { _id: id },
      { [where]: value },
      { new: true },
      (err, description) => {
      res.status(200).json({
        description,
        err,
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res) => {
    let id = req.body.id
    let who = req.body.who
    try {
      Description.findByIdAndDelete({ _id: id }, { creator: who}, (err, description) => {
        res.status(200).json({
          description,
          err,
        })
      })
    } catch (error) {
      console.log(error)
    }
}

exports.new = async (req, res) => {
  const description = req.body.description
  try {
      const newDescription = await Description.create(description)
      res.status(201).json({ newDescription})
  } catch (error) {
      res.status(400).json({ message: error})
  }
}

exports.keywordsDescription = async (req, res) => {
    const keyword = req.body.keyword
    Description.find({ keyword })
      .then(descriptions => {
        var descriptionMap = {};
        descriptions.forEach(function(description) {
            descriptionMap[description._id] = description;
        });
        res.send(descriptionMap);
      });
};
