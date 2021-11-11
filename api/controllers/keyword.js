import Keyword from '../models/keyword.js'

exports.update = async (req, res) => {
  let id = req.body.id
  let where = req.body.where
  let value = req.body.value
  try {
    Keyword.findByIdAndUpdate({ _id: id }, { [where]: value }, (keyword) => {
      res.status(200).json({
        keyword,
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
      Keyword.findByIdAndDelete({ _id: id }, { creator: who}, (keyword) => {
        res.status(200).json({
          keyword,
        })
      })
    } catch (error) {
      console.log(error)
    }
}

exports.new = async (req, res) => {
  const keyword = req.body.keyword
  try {
      const newKeyword = await Keyword.create(keyword)
      res.status(201).json({ newKeyword})
  } catch (error) {
      res.status(400).json({ message: error})
  }
}

exports.riversKeyword = async (req, res) => {
    const river = req.body.river
    Keyword.find({ river })
      .then(keywords => {
        var keywordMap = {};
        keywords.forEach(function(keyword) {
            keywordMap[keyword._id] = keyword;
        });
        res.send(keywordMap);
      });
};
