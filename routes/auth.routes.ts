import { Router } from 'express';
import Route from '../interface/route.interface';
import AuthController from '../controllers/auth.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { SignupDTO,LoginDTO } from '../dtos/auth.dto';
class AuthRoutes implements Route
{
    public router = Router();
    public path = '/auth';
    public authController = new AuthController();
    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        // this.router.get(`${this.path}`, (req:any, res:any) => {
        //     res.json({ message: "AuthRoute Sucessful!" });
        // })
        this.router.post(`${this.path}/sign-up`, validationMiddleware(SignupDTO,'body'), this.authController.signup)
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDTO,'body'), this.authController.login)
    }
}

export default AuthRoutes;