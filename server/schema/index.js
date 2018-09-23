var mongoose = require('mongoose');
var db = 
var Schema = mongoose.Schema;

exports.User = new Schema({
  _id: Schema.Types.ObjectId,
  userName: String,
  password: String,
  role: String
});

exports.Admin = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'User' }
})

exports.Teacher = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'User' },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  homeworks: [{ type: Schema.Types.ObjectId, ref: 'Homework_teacher' }]
})

exports.Student = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'User' },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  homeworks: [{ type: Schema.Types.ObjectId, ref: 'Homework_student' }]
})

exports.Class = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  classMates: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }]
})

exports.Homework_teacher = new Schema({
  _id: Schema.Types.ObjectId,
  publisher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  title: String,
  content: String,
  publish_time: Date,
  end_time: Date,
  Homework_done: [{ type: Schema.Types.ObjectId, ref: 'Homework_student' }],
  done: Boolean,
})

exports.Homework_student = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'Homework_teacher' },
  word: String,
  ppt: String,
  video: String,
  out_of_time: Boolean,
  committed: Boolean,
  commit_time: Date
})


exports.mongoose = mongoose;