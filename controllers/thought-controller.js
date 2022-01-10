const { Thought, User } = require('../models')

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'user',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true },
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this username!' })
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => res.json(err))
  },
}
module.exports = thoughtController
