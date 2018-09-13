var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/grade", function (err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
});
var Schema = mongoose.Schema;

exports.admin = new Schema({
  userName: String,
  password: String
});



exports.mongoose = mongoose;