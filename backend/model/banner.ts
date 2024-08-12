import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

interface BannerAttributes {
  id?: number;
  description: string;
  link: string;
    status: string;
    timer:number
}

interface BannerInstance extends Model<BannerAttributes>, BannerAttributes {}

const Banner = sequelize.define<BannerInstance>("Banner", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Banner;
