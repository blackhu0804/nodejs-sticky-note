let path = require('path')

const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') ,
});

// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

const Note = sequelize.define('notes', {
  text: {
    type: Sequelize.STRING
  }
});

// Note.sync().then( () => {
//   return Note.create({text: 'hello black'});  
// }).then(function(){
//   Note.findAll({raw: true}).then( (notes) => {
//     console.log(notes);
//   })
// });

// Note.findAll({raw: true,where: {id: 2}}).then( (notes) =>{
//   console.log(notes);
// })


module.exports.Note = Note;