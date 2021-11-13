import Land from '../models/land.js'
import User from '../models/user.js'

exports.update = async (req, res) => {
  let id = req.body.id
  let where = req.body.where
  let value = req.body.value
  try {
    Land.findByIdAndUpdate(
      { _id: id },
      { [where]: value },
      { new: true },
      (err, land) => {
        res.status(200).json({
          land,
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
    Land.findByIdAndDelete({ _id: id }, { creator: who }, (err, land) => {
      res.status(200).json({
        land,
        err,
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.new = async (req, res) => {
  const land = req.body.land
  try {
    const newLand = await Land.create(land)
    res.status(201).json({ newLand })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.addEditor = async (req, res) => {
  const phone = req.body.phone
  const id = req.body.id
  console.log(phone)
  try {
    const user = await User.findOne({ phone })
    Land.findByIdAndUpdate(
      { _id: id },
      { $push: { editors: user._id } },
      { new: true },
      (err, land) => {
        console.log(land)
        res.status(200).json({
          land,
          err,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}
exports.usersLand = async (req, res) => {
  const user = req.body.user
  Land.find({
    $or: [{ creator: user }, { editors: { $elemMatch: { $eq: user } } }],
  }).then((lands) => {
    var landMap = {}
    lands.forEach(function (land) {
      landMap[land._id] = land
    })
    res.send(landMap)
  })
}
