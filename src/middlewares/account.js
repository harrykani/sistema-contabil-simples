const { verify } = require('jsonwebtoken');
const validateInputFields = require('../utils/validateInputField');

const dotenv = require("dotenv");
dotenv.config();
const authSecret = process.env.AUTH_SECRET;

const inputRequirements = async (req, res, next) => {
    const {nome, email, senha} = req.body;

    try {
        validateInputFields([nome, email, senha]);
        next();
    } catch (error) {
        return res.status(error.statusCode).json({message: error.message});
    }
};

const logInRequirements = (req, res, next) => {
    const {email, senha} = req.body;

    try {
        validateInputFields([email, senha]);
        next();
    } catch (error) {
        return res.status(error.statusCode).json({message: error.message});
    }
};

const validateUserToken = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({message: 'Failure to get token'});
    }

    const token = authorization.split(' ')[1];
    
    try {
        const validToken = await verify(token, authSecret);   

        req.locals = {id: validToken.id};

        next();
        
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

module.exports = {inputRequirements, logInRequirements, validateUserToken};