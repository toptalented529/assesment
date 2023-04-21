
const sequelize = require("sequelize");

const magentoCategory = (sequelize,DataTypes)=>{
    const MagentoCategory = sequelize.define('magentoCategory',{
        category:DataTypes.STRING, //no used
        subcategory:DataTypes.STRING, ///the user that bought genus?
        
            
    
        
    });

    return MagentoCategory;
}


export default magentoCategory;



