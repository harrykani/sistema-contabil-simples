const userService = require("../src/services/userService");
const userRepo = require("../src/repositories/userRepository");
const bcrypt = {hash, compare} = require('bcrypt'); 
const jsonwebtoken = {sign} = require('jsonwebtoken');
const AppError = require("../src/utils/AppError");

describe("User Service - Create", () => {

    afterEach(() => {
        jest.restoreAllMocks();
      });

      const data = {
          nome: "Guido",
          email: "guido@email.com",
          senha: "123456"
      }

    it("User should be created", async() => {

        jest.spyOn(userRepo, 'findByEmail').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });
        
        jest.spyOn(userRepo, 'insertUser').mockImplementation(() => {
            return {
                rows: [
                    {
                        id: 2,
                        nome: "Guido",
                        email: "guido@email.com"
                    }
                ]
            }
        });
        
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
            return 
        });

        const response = await userService.executeSignUp(data.nome, data.email, data.senha);
        
        expect(userRepo.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepo.findByEmail).toHaveBeenCalledWith(data.email);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledWith(data.senha, 10);
        expect(userRepo.insertUser).toHaveBeenCalledTimes(1);
        expect(userRepo.insertUser).toHaveBeenCalledWith(data.nome, data.email, undefined);
        expect(response).toHaveProperty('id', 2);
        expect(response).toHaveProperty('email', data.email);
        expect(response).not.toHaveProperty('senha');
    });

    it("App Error should be throwed because email exists", async () => {
        const data = {
            nome: "Guido",
            email: "guido@email.com",
            senha: "123456"
        }
        
        jest.spyOn(userRepo, 'findByEmail').mockImplementation(() => {
            return {
                rowCount: 1
            }
        });

        try {
           await userService.executeSignUp(data.nome, data.email, data.senha);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "There is already a registered user with the entered email.");
            expect(error).toHaveProperty("statusCode", 400);
        }
    });
});

describe("User Service - Login", () => {
    
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const data = {
        email: "guido@email.com",
        senha: "123"
    }
    
    it("User should be logged", async() => {

        jest.spyOn(userRepo, 'findByEmail').mockImplementation(() => {
            return {
                rowCount: 1,
                rows: [
                    {
                        id: 2,
                        nome: "Guido",
                        email: "guido@email.com",
                        senha: "sa2d5436nONo46709jnO7SD8J2PI"
                    }
                ]
            }
        });

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });

        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => {
            return 
        });

        const response = await userService.executeLogIn(data.email, data.senha);

        expect(userRepo.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepo.findByEmail).toHaveBeenCalledWith(data.email);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledWith(data.senha, "sa2d5436nONo46709jnO7SD8J2PI");
        expect(jsonwebtoken.sign).toHaveBeenCalledTimes(1);
        expect(response).toHaveProperty('usuario', {id: 2, email: data.email, nome: "Guido"});
        expect(response).toHaveProperty('token');
    });
    
    it("User shouldn't be logged because of invalid email", async() => {

        jest.spyOn(userRepo, 'findByEmail').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
        });

        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => {
            return 
        });

        try {
            await userService.executeLogIn(data.email, data.senha);
         } catch (error) {
            expect(userRepo.findByEmail).toHaveBeenCalledTimes(1);
            expect(userRepo.findByEmail).toHaveBeenCalledWith(data.email);
            expect(bcrypt.compare).toHaveBeenCalledTimes(0);
            expect(jsonwebtoken.sign).toHaveBeenCalledTimes(0);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Incorrect email or password.");
            expect(error).toHaveProperty("statusCode", 401);
         }
    });
    
    it("User shouldn't be logged because of invalid password", async() => {

        jest.spyOn(userRepo, 'findByEmail').mockImplementation(() => {
            return {
                rowCount: 1,
                rows: [
                    {
                        id: 2,
                        nome: "Guido",
                        senha: "sa2d5436nONo46709jnO7SD8J2PI",
                        email: "guido@email.com"
                    }
                ]
            }
        });
        
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return false;
        });
        
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => {
            return 
        });

        try {
            await userService.executeLogIn(data.email, data.senha);
         } catch (error) {
            expect(userRepo.findByEmail).toHaveBeenCalledTimes(1);
            expect(userRepo.findByEmail).toHaveBeenCalledWith(data.email);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
            expect(bcrypt.compare).toHaveBeenCalledWith(data.senha, "sa2d5436nONo46709jnO7SD8J2PI");
            expect(jsonwebtoken.sign).toHaveBeenCalledTimes(0);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Incorrect email or password.");
            expect(error).toHaveProperty("statusCode", 401);
         }
    });

    
});

describe("User Service - Get User", () => {
    
    afterEach(() => {
        jest.restoreAllMocks();
      });
    
    it("user should be obtained", async() => {
    
        const id = 1;

        jest.spyOn(userRepo, 'findByID').mockImplementation(() => {
            return {
                rows: [
                    {
                        id: 1,
                        nome: "Daniel",
                        senha: "123",
                        email: "daniel@email.com"
                    }
                ]
            }
        });

        const response = await userService.executeGetUser(id);

        expect(userRepo.findByID).toHaveBeenCalledTimes(1);
        expect(userRepo.findByID).toHaveBeenCalledWith(id);
        expect(response).toStrictEqual({id: 1, email: "daniel@email.com", nome: "Daniel"});
    });
});

describe("User Service - Edit User", () => {
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
      
    const data = {
        id: 2,
        nome: "Guido",
        email: "guido@email.com",
        senha: "123"
    }

    it("user should be edited", async() => {
        
        jest.spyOn(userRepo, 'findByEmailAndFilterId').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });

        jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
            return "123"
        });

        jest.spyOn(userRepo, 'updateUser').mockImplementation(() => {
            return 
        });

        await userService.executeEditUser(data.id, data.nome,data.email, data.senha);

        expect(userRepo.findByEmailAndFilterId).toHaveBeenCalledTimes(1);
        expect(userRepo.findByEmailAndFilterId).toHaveBeenCalledWith(data.email, data.id);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledWith(data.senha, 10);
        expect(userRepo.updateUser).toHaveBeenCalledTimes(1);
        expect(userRepo.updateUser).toHaveBeenCalledWith(data.nome,data.email, "123" ,data.id);
    });

    it("App Error should be throwed because email exists", async () => {
        
        jest.spyOn(userRepo, 'findByEmailAndFilterId').mockImplementation(() => {
            return {
                rowCount: 1
            }
        });

        try {
           await userService.executeEditUser(data.id, data.nome,data.email, data.senha);
        } catch (error) {
            expect(error).toHaveProperty("message", "There is already a registered user with the entered email.");
            expect(error).toHaveProperty("statusCode", 400);
            expect(error).toBeInstanceOf(AppError);
        }
    })
});