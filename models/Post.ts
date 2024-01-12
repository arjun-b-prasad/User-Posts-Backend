import { Sequelize, DataTypes,Model } from "sequelize";
import sequelize from "./index";
interface postInterface
{
    id: number,
    title: string,
    desc: string,
   
}

export class Post extends Model<postInterface> implements postInterface
{
    public id!: number
    public title!: string
    public desc!: string
  
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   title: {
        type: DataTypes.STRING,
       allowNull: false,
        unique: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    timestamps: true,
    sequelize: sequelize
});

