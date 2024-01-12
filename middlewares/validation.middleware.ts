import { ValidationError, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";


const validationMiddleware = (type:any, value:'body' | 'params'|'query' = 'body') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = await validate(plainToInstance(type, req[value]), { skipMissingProperties: false });
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
            res.status(400).json(message);
        }
        else {
            next();
        }
    }
}

export default validationMiddleware;