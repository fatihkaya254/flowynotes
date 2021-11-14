import Test from '../models/test.js'

exports.update = async (req, res) => {
  let id = req.body.id
  let where = req.body.where
  let value = req.body.value
  try {
    Test.findByIdAndUpdate(
      { _id: id },
      { [where]: value },
      { new: true },
      (err, test) => {
        res.status(200).json({
          test,
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
    Test.findByIdAndDelete({ _id: id }, { creator: who }, (err, test) => {
      res.status(200).json({
        test,
        err,
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.new = async (req, res) => {
  const user = req.body.user
  const keyword = req.body.keyword
  const correctness = req.body.boolean
  const test = await Test.findOne({ keyword, user })
  if (test) {
    const id = test._id
    const answers = test.answers
    if (answers.length >= 20) answers.shift()
    answers.push(correctness)
    try {
      Test.findByIdAndUpdate(
        { _id: id },
        { answers},
        { new: true },
        (err, test) => {
          res.status(200).json({
            test,
            err,
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const newTest = await Test.create({user, keyword, answers: [correctness]})
      res.status(201).json({ newTest })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}

exports.keywordsTest = async (req, res) => {
  const keyword = req.body.keyword
  Test.find({ keyword }).then((tests) => {
    var testMap = {}
    tests.forEach(function (test) {
      testMap[test._id] = test
    })
    res.send(testMap)
  })
}
