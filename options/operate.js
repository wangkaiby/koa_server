const mongoose = require('../db')
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
  name: String,
  website: String,
  phone: String,
  tag: Array,
});

const MyModel = mongoose.model('data', ceshiSchema);


class Mongodb {
  constructor () {

  }
// 查询
  query () {
     return new Promise((resolve, reject) => {
       MyModel.find({}, (err, res) => {
         if(err) {
           reject(err)
         }
         resolve(res)
       })
     })
  }
// 保存
  save (obj) {
     const m = new MyModel(obj)
     return new Promise((resolve, reject)=> {
       m.save((err, res) => {
         if (err) {
           reject(err)
         }
         resolve(res)
         console.log(res)
       })
     })
     
  }
}
module.exports = new Mongodb()