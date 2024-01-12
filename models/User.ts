import { Sequelize, DataTypes,Model,Optional } from "sequelize";
import sequelize from "./index";
import { Post } from "./Post";
export interface userInterface
{
    id: number,
    name: string,
    email: string,
    pass: string,  
    isVerified: boolean
}
export interface UserInput extends Optional<userInterface, | 'id' | 'isVerified'> { }
export class User extends Model<userInterface,UserInput> implements userInterface
{
    public id!: number
    public name!: string
    public email!: string
    public pass!: string 
    public isVerified!: boolean
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true,
    sequelize: sequelize
});

User.hasMany(Post);
Post.belongsTo(User,{foreignKey:'userId'});