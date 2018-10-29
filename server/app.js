const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
var console = require('tracer').colorConsole();
const cors = require('cors');

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');
const publicRoutes = require('./routes/public')

const User = require('./models/User');
const EvaluateStand = require('./models/EvaluateStand');


mongoose.connect("mongodb://127.0.0.1:27017/grade", function (err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
});

app.use(cors());

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/public', publicRoutes)

module.exports = app;


    // var User_doc = new User({
    //   _id: new mongoose.Types.ObjectId(),
    //   userName: "admin",
    //   password: "123456",
    //   role: "admin",
    // })
    // User_doc.save(() => { })
    // var EvaluateStand_doc = new EvaluateStand({
    //   data_instructional_design: [
    //     {
    //       "key": "0",
    //       "eval_content": "目标设计",
    //       "eval_stand": "教学目标清楚、具体，易于理解，便于实施，行为动词使用正确，阐述规范；符合课标要求、学科特点和学生实际；体现对知识、能力与创新思维等方面的要求",
    //       "value_total": 3,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "1",
    //       "eval_content": "内容分析",
    //       "eval_stand": "教学内容前后知识点关系、地位、作用描述准确，重点、难点分析清楚",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "2",
    //       "eval_content": "学情分析",
    //       "eval_stand": "学生认知特点和水平表述恰当，学习习惯和能力分析合理",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "3",
    //       "eval_content": "教学过程设计(1)",
    //       "eval_stand": "教学主线描述清晰，教学内容处理符合课程标准要求，具有较强的系统性和逻辑性",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "4",
    //       "eval_content": "教学过程设计(2)",
    //       "eval_stand": "教学重点突出，点面结合，深浅适度；难点清楚，把握准确；化难为易，处理恰当",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "5",
    //       "eval_content": "教学过程设计(3)",
    //       "eval_stand": "教学方法清晰适当，符合教学对象要求，有利教学内容完成、难点解决和重点突出",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "6",
    //       "eval_content": "教学过程设计(4)",
    //       "eval_stand": "教学辅助手段准备与使用清晰无误，教具及现代化教学手段运用恰当",
    //       "value_total": 1,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "7",
    //       "eval_content": "教学过程设计(5)",
    //       "eval_stand": "内容充实精要，适合学生水平；结构合理，过渡自然，便于操作；理论联系实际，注重教学互动，启发学生思考及问题解决",
    //       "value_total": 3,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "8",
    //       "eval_content": "教学过程设计(6)",
    //       "eval_stand": "注重形成性评价及生成性问题解决和利用",
    //       "value_total": 1,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "9",
    //       "eval_content": "延伸设计",
    //       "eval_stand": "课时分配科学、合理；辅导与答疑设置合理，练习、作业、讨论安排符合教学目标，有助强化学生反思、理解和问题解决",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "10",
    //       "eval_content": "文档规范",
    //       "eval_stand": "文字、符号、单位和公式符合标准规范；语言简洁、明了，字体、图表运用适当；文档结构完整，布局合理，格式美观",
    //       "value_total": 2,
    //       "value": "instructional"
    //     },
    //     {
    //       "key": "11",
    //       "eval_content": "设计创新",
    //       "eval_stand": "教学方案的整体设计富有创新性，较好体现课程改革的理念和要求；教学方法选择适当，教学过程设计有突出的特色",
    //       "value_total": 3,
    //       "value": "instructional"
    //     }
    //   ],
    //   data_multimedia: [
    //     {
    //       "key": "0",
    //       "eval_content": "科学性",
    //       "eval_stand": "课件取材适宜，内容科学、正确、规范课件演示符合现代教育理念",
    //       "value_total": 4,
    //       "value": "multimedia"
    //     },
    //     {
    //       "key": "1",
    //       "eval_content": "教育性",
    //       "eval_stand": "课件设计新颖，能体现教学设计思想；知识点结构清晰，能调动学生的学习热情",
    //       "value_total": 6,
    //       "value": "multimedia"
    //     },
    //     {
    //       "key": "2",
    //       "eval_content": "技术性(1)",
    //       "eval_stand": "课件制作和使用上恰当运用多媒体效果",
    //       "value_total": 1.5,
    //       "value": "multimedia"
    //     },
    //     {
    //       "key": "3",
    //       "eval_content": "技术性(2)",
    //       "eval_stand": "操作简便、快捷，交流方便，适于教学",
    //       "value_total": 1.5,
    //       "value": "multimedia"
    //     },
    //     {
    //       "key": "4",
    //       "eval_content": "艺术性",
    //       "eval_stand": "画面设计具有较高艺术性，整体风格相对统一",
    //       "value_total": 2,
    //       "value": "multimedia"
    //     }
    //   ],
    //   data_speech: [
    //     {
    //       "key": "0",
    //       "eval_content": "讲演内容",
    //       "eval_stand": "主题鲜明切题，内容充实、针对性强;问题分析到位，解决策略得当、新颖，说服力强;论据贴切，符合实际，阐释充分;内容构架结构严谨、层次分明、条理清晰",
    //       "value_total": 5,
    //       "value": "speech"
    //     },
    //     {
    //       "key": "1",
    //       "eval_content": "语言艺术",
    //       "eval_stand": "普通话(英语发音)标准，用语规范，节奏处理得当，说服力强",
    //       "value_total": 3,
    //       "value": "speech"
    //     },
    //     {
    //       "key": "2",
    //       "eval_content": "思维艺术",
    //       "eval_stand": "思维敏捷，逻辑清晰；灵活而有效地调整、组织讲演内容",
    //       "value_total": 3,
    //       "value": "speech"
    //     },
    //     {
    //       "key": "3",
    //       "eval_content": "仪表形象",
    //       "eval_stand": "神态自然，动作适度，与讲演内容吻合",
    //       "value_total": 3,
    //       "value": "speech"
    //     },
    //     {
    //       "key": "4",
    //       "eval_content": "讲演时间",
    //       "eval_stand": "时间在2-3分钟之间，不超时",
    //       "value_total": 1,
    //       "value": "speech"
    //     }
    //   ],
    //   data_class: [
    //     {
    //       "key": "0",
    //       "eval_content": "教学目标",
    //       "eval_stand": "目标设置明确，符合课标要求和学生实际",
    //       "value_total": 3,
    //       "value": "class"
    //     },
    //     {
    //       "key": "1",
    //       "eval_content": "教学内容",
    //       "eval_stand": "重点内容讲解明白，教学难点处理恰当，关注学生已有知识和经验，注重学生能力培养，强调课堂交流互动，知识阐释正确",
    //       "value_total": 5,
    //       "value": "class"
    //     },
    //     {
    //       "key": "2",
    //       "eval_content": "教学方法",
    //       "eval_stand": "按新课标的教学理念处理教学内容以及教与学、知识与能力的关系，较好落实教学目标；突出自主、探究、合作学习方式，体现多元化学习方法；实现有效师生互动",
    //       "value_total": 7,
    //       "value": "class"
    //     },
    //     {
    //       "key": "3",
    //       "eval_content": "教学过程",
    //       "eval_stand": "教学整体安排合理，环节紧凑，层次清晰；创造性使用教材；教学特色突出；恰当使用多媒体课件辅助教学，教学演示规范",
    //       "value_total": 7,
    //       "value": "class"
    //     },
    //     {
    //       "key": "4",
    //       "eval_content": "教学素质",
    //       "eval_stand": "教态自然亲切、仪表举止得体，注重目光交流，教学语言规范准确、生动简洁",
    //       "value_total": 4,
    //       "value": "class"
    //     },
    //     {
    //       "key": "5",
    //       "eval_content": "教学效果",
    //       "eval_stand": "按时完成教学任务，教学目标达成度高",
    //       "value_total": 4,
    //       "value": "class"
    //     },
    //     {
    //       "key": "6",
    //       "eval_content": "教学创新",
    //       "eval_stand": "教学过程富有创意；能创造性的使用教材；教学方法灵活多样，有突出的特色",
    //       "value_total": 5,
    //       "value": "class"
    //     },
    //     {
    //       "key": "7",
    //       "eval_content": "板书内容匹配",
    //       "eval_stand": "反映教学设计意图，突显重点、难点，能调动学生主动性和积极性",
    //       "value_total": 4,
    //       "value": "class"
    //     },
    //     {
    //       "key": "8",
    //       "eval_content": "板书构图",
    //       "eval_stand": "构思巧妙，富有创意，构图自然，形象直观，教学辅助作用显著",
    //       "value_total": 4,
    //       "value": "class"
    //     },
    //     {
    //       "key": "9",
    //       "eval_content": "板书书写",
    //       "eval_stand": "书写快速流畅，字形大小适度，清楚整洁，美观大方，规范正确",
    //       "value_total": 2,
    //       "value": "class"
    //     }
    //   ],
    //   initial_values: {
    //     "instructional": [
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0
    //     ],
    //     "multimedia": [
    //       0,
    //       0,
    //       0,
    //       0,
    //       0
    //     ],
    //     "speech": [
    //       0,
    //       0,
    //       0,
    //       0,
    //       0
    //     ],
    //     "class": [
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0
    //     ]
    //   }
    // })
    // EvaluateStand_doc.save(()=>{})