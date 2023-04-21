import Sequelize from 'sequelize';
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:'localhost',
        port:5432,
        dialect:'postgres'
        
    }
);

// const models = {
//   User: require('./user',),
//   Profile: require('./profile'),
// }
const models = {
	User: sequelize.import('./user',),
	Profile: sequelize.import('./profile'),
	Transaction: sequelize.import('./transaction'),
	Genu: sequelize.import('./genu'),
	Hayek: sequelize.import('./hayek'),
	MagentoCagetory: sequelize.import('./magentoCategory'),
	MarketplaceSginup: sequelize.import('./marketplaceSignup'),
}
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });


try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export {sequelize};

export default models;