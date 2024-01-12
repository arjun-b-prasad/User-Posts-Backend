import { Request,Response,NextFunction } from "express";
import { LoginDTO, SignupDTO } from "../dtos/auth.dto";
import AuthService from "../services/auth.service";

class AuthController
{
    public newAuthService = new AuthService();
    public signup = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const userData: SignupDTO = req.body;
            const data = await this.newAuthService.signup(userData);
            res.status(200).json({message:"User has been created sucessfuly!", data});
        } catch (error:any) {
            res.status(error.status ?? 500).json({ message: error.message ?? 'Something went wrong...' });
        }

    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const userData: LoginDTO = req.body;
            const data = await this.newAuthService.login(userData);
            res.status(200).json({message:"Successfully Logged in", data});
        } catch (error:any) {
            res.status(error.status ?? 500).json({ message: error.message ?? 'Something went wrong...' });
        }

    }
}
export default AuthController;