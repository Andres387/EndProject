import UserOwnerModel from "../models/userOwner.model.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import bcrypt from "bcryptjs";


class AuthLoginService {
    userOwnerModel = null;

    constructor() {
        this.userOwnerModel = new UserOwnerModel();
    }
    async register (req) {
        try {
            const {
                    name,  
                    lastName,
                    pet,
                    neighborhood, 
                    email, 
                    password,
                }
            = req.body
            
            if(!(email && password && name && lastName && pet && neighborhood)){
                return { statusCode: 400, message: "All inputs are required"};
            }
            const user = await this.userOwnerModel.createUser({
                name, 
                lastName,
                pet,
                neighborhood,
                email, 
                password
            });

            if(user.error) return { 
                statusCode: 400, 
                message: user.error
            };
            
            const token = jwt.sign(
                {user_id: user.id, email: user.email}, 
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            );
            
            user.token = token

            return {
                statusCode: 200,
                message: "User registered succesfully",
                user,
            };
        } catch (error) {
            console.log("Error:", error);
            throw new Error(error);
        }
    }

    async login(req) {
        try {
            const {email, password} = req.body
            if(!(email && password)){
                return { statusCode: 400, message: " All inputs are required"};
            }

            const user = await this.userOwnerModel.findUser(email);
            const isPassword = await bcrypt.compare(password, user.password);

            if (user && isPassword) {
                const token = jwt.sign(
                    {user_id: user.id, email: user.email}, 
                    process.env.TOKEN_KEY,
                    {expiresIn: "1h"}
                );
                
                user.token = token
    
                return {
                    statusCode: 200,
                    message: "User registered succesfully",
                    user,
                };
            } else {
                return {
                statusCode: 400,
                    message: "Verify email or password",
                };
            }
        } catch (error) {
            console.log("Error:", error);
            throw new Error(error);
        }
    }

}

export default AuthLoginService;