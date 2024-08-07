import { Sequelize } from 'sequelize';


// const env = process.env.NODE_ENV || 'development';
// const sequelize = new Sequelize("config[env].database", config[env].username, config[env].password, {
//   host: config[env].host,
//   dialect: config[env].dialect
// });

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize("quran_app", "root", "admin", {
  host: "localhost",
  dialect: "mysql"
});


sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
  }); 


export default sequelize;
   