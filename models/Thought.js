const { Schema, model, Types} = require('mangoose');
const moment = require('moment');

const ThoughtSchema = new Schema (
    {
   thoughtText: {
        type: String,
        required: true,
        minleghth: 1,
        maxlenght: 280
    },
createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
username: {
    type: String,
    required: true,
    ref: 'User'
},
reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)


const ReactionSchema = new Schema(
{
 reactionId: {
     type: Schema.Types.ObjectId,
     default: () => Types.ObjectId()
 },
reactionBody: {
    type: String,
    required: true,
    trim: true,
    minlenght: 1,
    maxlenght: 280
},
username: {
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal  => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
 const Thought = model('Thought', ThoughtSchema);
    

 ThoughtSchema.virtuals('reactionCount').get(function()
 {
  return this.reactions.lenght;   
 });
 module.exports = Thought










