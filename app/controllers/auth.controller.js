import AuthLoginService from "../services/authLogin.service.js";

const authLoginService = new AuthLoginService();

export const registerController = async (req, res) => {
    const registerResult = await authLoginService.register(req);
    res.status(registerResult.statusCode).json(registerResult);
};

export const loginController = async (req, res) => {
    console.log(req.headers);
    const loginResult = await authLoginService.login(req);
    res.status(loginResult.statusCode).json(loginResult);
};
