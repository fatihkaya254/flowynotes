import River from '../models/river.js'

exports.update = async (req, res) => {
  let id = req.body.id
  let where = req.body.where
  let value = req.body.value
  try {
    River.findByIdAndUpdate(
      { _id: id },
      { [where]: value },
      { new: true },
      (err, river) => {
        res.status(200).json({
          river,
          err,
        })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res) => {
  let id = req.body.id
  let who = req.body.who
  try {
    River.findByIdAndDelete({ _id: id }, { creator: who }, (err, river) => {
      res.status(200).json({
        err,
        river,
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.new = async (req, res) => {
  const river = req.body.river
  try {
    const newRiver = await River.create(river)
    res.status(201).json({ newRiver })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.landsRiver = async (req, res) => {
  const land = req.body.land
  River.find({ land }).then((rivers) => {
    var riverMap = {}
    rivers.forEach(function (river) {
      riverMap[river._id] = river
    })
    res.send(riverMap)
  })
}
