const bcrypt = {hash, compare} = require('bcrypt'); 
const jsonwebtoken = {sign} = require('jsonwebtoken');
const userRepo = require("../repositories/userRepository");
const AppError = require("../utils/AppError");

const dotenv = require("dotenv");

dotenv.config();
const authSecret = process.env.AUTH_SECRET;


const executeSignUp = async (nome, email, senha) => {

    const duplicateEmail = await userRepo.findByEmail(email);

    if (duplicateEmail.rowCount > 0) {
        throw new AppError("There is already a registered user with the entered email.", 400);
    }

    const encriptedPassword = await bcrypt.hash(senha, 10);
    
    const {rows} = await userRepo.insertUser(nome, email, encriptedPassword);

    return rows[0];
}

const executeLogIn = async (email, senha) => {

    const getUser = await userRepo.findByEmail(email);

    if (getUser.rowCount < 1) {
        throw new AppError("Incorrect email or password.", 401);
    }
    
    const validPassword = await bcrypt.compare(senha, getUser.rows[0].senha);

    if (!validPassword) {
        throw new AppError("Incorrect email or password.", 401);
    }

    const token = await jsonwebtoken.sign({id: getUser.rows[0].id}, authSecret, {expiresIn: '3d'});

    const {senha:_, ...authenticatedUser} = getUser.rows[0];

    return {usuario: authenticatedUser, token};
};

const executeGetUser = async (id) => {

    const {rows} = await userRepo.findByID(id);

    const {senha:_, ...authenticatedUser} = rows[0];

    return authenticatedUser;
};

const executeEditUser = async (id, nome, email, senha) => {

    const duplicateEmail = await userRepo.findByEmailAndFilterId(email, id);

    if (duplicateEmail.rowCount > 0) {
        throw new AppError("There is already a registered user with the entered email.", 400);
    }

    const encriptedPassword = await bcrypt.hash(senha, 10);

    await userRepo.updateUser(nome, email, encriptedPassword, id);
};

module.exports = {executeSignUp, executeLogIn, executeGetUser, executeEditUser};