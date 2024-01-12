import { LoginDTO, SignupDTO } from "../dtos/auth.dto";
import { LoginInterface, UserData } from "../interface/auth.interface";
import { User, userInterface } from "../models/User";
import  bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken'
class AuthService {
  public async signup(data: SignupDTO): Promise<UserData> {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw {
        status: 409,
        message: "This user already exists!",
      };
      }
      const newPass = await bcrypt.hash(data.pass, 10);
      const newUser = await User.create({
          email: data.email,
          name: data.name,
          pass: newPass
      });
    const result = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isVerified: newUser.isVerified
    }
    return result;
  }

  public async login(data: LoginDTO): Promise<LoginInterface> {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw {
        status: 400,
        message: "This email is not registered!",
      };
    }
    
    const isMatch = await bcrypt.compare(data.pass, user.pass);
    if (!isMatch) {
      throw {
        status: 400,
        message: "Password doesnt match!",
      };
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    }

    const token = jwt.sign(payload, 'jwt-secret', { expiresIn: 86400 }); // process.env.JWT_SECRET = 'jwt-secret'
    return { user: payload, token: `Bearer ${token}` };
  }
}

export default AuthService;
