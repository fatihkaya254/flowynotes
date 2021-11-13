import Description from '../models/description.js'
import Keyword from '../models/keyword.js'
import Land from '../models/land.js'
import River from '../models/river.js'

exports.backupAll = async (req, res) => {
  const user = req.body.user
  try {
    Land.find({
      $or: [{ creator: user }, { editors: { $elemMatch: { $eq: user } } }],
    }).then((lands) => {
      var landMap = []
      lands.forEach(function (land) {
        landMap.push(land._id)
      })
      River.find({ land: landMap }).then((rivers) => {
        var riverMap = []
        rivers.forEach(function (river) {
          riverMap.push(river._id)
        })
        Keyword.find({ river: riverMap }).then((keywords) => {
          var keywordMap = []
          keywords.forEach(function (keyword) {
            keywordMap.push(keyword._id)
          })
          Description.find({ keyword: keywordMap }).then((descriptions) => {
            res.status(200).json({ lands, rivers, keywords, descriptions })
          })
        })
      })
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}
