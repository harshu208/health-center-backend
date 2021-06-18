const Sequelize = new require('sequelize')
require ('dotenv').config();

const sequelize = new Sequelize('health_centre', 'root', process.env.PASSWORD||'', {
  host: 'localhost',
  dialect:'mysql'
});


try {
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize
