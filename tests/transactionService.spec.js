const transactionService = require("../src/services/transactionService");
const transactionRepo = require("../src/repositories/transactionRepository");
const categoryRepo = require("../src/repositories/categoryRepository");
const AppError = require("../src/utils/AppError");

describe("Transaction Service - Create", () => {

    const data = {
        usuario_id: 5,
        tipo: "saída",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        categoria_id: 4
    }

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("transaction should be created", async() => {

        jest.spyOn(categoryRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1
            }
        });
        jest.spyOn(transactionRepo, 'insertTransaction').mockImplementation(() => {
            return {
                rows: [
                    {
                        id: 1,
                        tipo: "saida",
                        descricao: "Sapato amarelo",
                        valor: 15800,
                        data: "2022-03-23T15:35:00.000Z",
                        usuario_id: 5,
                        categoria_id: 4,
                        categoria_nome: "Roupas"
                    }
                ]
            }
        });

        const response = await transactionService.executeCreate(data.usuario_id, data.tipo, data.descricao, data.valor, data.data, data.categoria_id);

        expect(categoryRepo.findById).toHaveBeenCalledTimes(1);
        expect(categoryRepo.findById).toHaveBeenCalledWith(data.categoria_id);
        expect(transactionRepo.insertTransaction).toHaveBeenCalledTimes(1);
        expect(transactionRepo.insertTransaction).toHaveBeenCalledWith(data.usuario_id, data.tipo, data.descricao, data.valor, data.data, data.categoria_id);
        expect(response).toHaveProperty('id', 1);
        expect(response).toHaveProperty('data', data.data);
        expect(response).toHaveProperty('categoria_nome', "Roupas");
    })

    it("App Error should be throwed because category not exists", async () => {

        jest.spyOn(categoryRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });

        try {
            await transactionService.executeCreate(data.usuario_id, data.tipo, data.descricao, data.valor, data.data, data.categoria_id);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Category not found");
            expect(error).toHaveProperty("statusCode", 404);
        }
    })
});

describe("Transaction Service - Get All", () => {

    let filtro = undefined
    const usuario_id = 5

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("an empty array should be returned", async() => {

        jest.spyOn(transactionRepo, 'findAllByCategory').mockImplementation(() => {
            return
        });
        jest.spyOn(transactionRepo, 'findAll').mockImplementation(() => {
            return {
                rows: []
            }
        });

        const response = await transactionService.executeGetAll(usuario_id, filtro);

        expect(transactionRepo.findAllByCategory).toHaveBeenCalledTimes(0);
        expect(transactionRepo.findAll).toHaveBeenCalledTimes(1);
        expect(transactionRepo.findAll).toHaveBeenCalledWith(usuario_id);
        expect(response).toStrictEqual([]);
    })

    it("query findAllByCategory should be called 3 times", async() => {

        jest.spyOn(transactionRepo, 'findAllByCategory').mockImplementation(() => {
            return {
                rows: [
                    {
                        id: 1,
                        tipo: "saida",
                        descricao: "Sapato amarelo",
                        valor: 15800,
                        data: "2022-03-23T15:35:00.000Z",
                        usuario_id: 5,
                        categoria_id: 4,
                        categoria_nome: "Roupas",
                    }
                ]
            }
        });
        jest.spyOn(transactionRepo, 'findAll').mockImplementation(() => {
            return
        });

        filtro = ['Roupas', 'salário', 'LAZER'];
        
        const response = await transactionService.executeGetAll(usuario_id, filtro);

        expect(transactionRepo.findAllByCategory).toHaveBeenCalledTimes(3);
        expect(transactionRepo.findAllByCategory).toHaveBeenNthCalledWith(1, usuario_id, 'Roupas');
        expect(transactionRepo.findAllByCategory).toHaveBeenNthCalledWith(2, usuario_id, 'salário');
        expect(transactionRepo.findAllByCategory).toHaveBeenNthCalledWith(3, usuario_id, 'LAZER');
        expect(transactionRepo.findAll).toHaveBeenCalledTimes(0);
        expect(response).toHaveLength(3);
        expect(response[0]).toHaveProperty('usuario_id', usuario_id);
        expect(response[1]).toHaveProperty('usuario_id', usuario_id);
        expect(response[2]).toHaveProperty('usuario_id', usuario_id);
    })
});

describe("Transaction Service - Get One", () => {

    const id = 1
    const usuario_id = 5

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("a transaction should be returned", async() => {

        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1,
                rows: [
                    {
                        id: 1,
                        tipo: "saida",
                        descricao: "Sapato amarelo",
                        valor: 15800,
                        data: "2022-03-23T15:35:00.000Z",
                        usuario_id: 5,
                        categoria_id: 4,
                        categoria_nome: "Roupas"
                    }
                ]
            }
        });
        
        const response = await transactionService.executeGetOne(id, usuario_id);

        expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
        expect(transactionRepo.findById).toHaveBeenCalledWith(id, usuario_id);
        expect(response).toHaveProperty('id', id);
        expect(response).toHaveProperty('usuario_id', usuario_id);
        expect(response).toHaveProperty('categoria_nome', "Roupas");
    })

    it("an error should be throwed because transaction not found", async() => {

        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });
        
        try {
            const response = await transactionService.executeGetOne(id, usuario_id);
        } catch (error) {
            expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
            expect(transactionRepo.findById).toHaveBeenCalledWith(id, usuario_id);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Transaction not found");
            expect(error).toHaveProperty("statusCode", 404);
        }
    })
});

describe("Transaction Service - Remove", () => {

    const id = 1
    const usuario_id = 5

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("a transaction should be removed", async() => {

        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1,
            }
        });
        jest.spyOn(transactionRepo, 'deleteTransaction').mockImplementation(() => {
            return
        });

        await transactionService.executeRemove(usuario_id, id);

        expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
        expect(transactionRepo.findById).toHaveBeenCalledWith(id, usuario_id);
        expect(transactionRepo.deleteTransaction).toHaveBeenCalledTimes(1);
        expect(transactionRepo.deleteTransaction).toHaveBeenCalledWith(id);
    })

    it("an error should be throwed because transaction not found", async() => {

        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });
        
        try {
            await transactionService.executeRemove(usuario_id, id);
        } catch (error) {
            expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
            expect(transactionRepo.findById).toHaveBeenCalledWith(id, usuario_id);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Transaction not found for the requested user");
            expect(error).toHaveProperty("statusCode", 404);
        }
    })
});

describe("Transaction Service - Edit", () => {

    const id = 1;
    const data = {
        usuario_id: 5,
        tipo: "entrada",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        categoria_id: 4
    }

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("a transaction should be edited", async() => {

        jest.spyOn(categoryRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1,
            }
        });
        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1,
            }
        });
        jest.spyOn(transactionRepo, 'updateTransaction').mockImplementation(() => {
            return
        });

        await transactionService.executeEdit(data.usuario_id, id, data.descricao, data.valor, data.data, data.categoria_id, data.tipo);

        expect(categoryRepo.findById).toHaveBeenCalledTimes(1);
        expect(categoryRepo.findById).toHaveBeenCalledWith(data.categoria_id);
        expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
        expect(transactionRepo.findById).toHaveBeenCalledWith(id, data.usuario_id);
        expect(transactionRepo.updateTransaction).toHaveBeenCalledTimes(1);
        expect(transactionRepo.updateTransaction).toHaveBeenCalledWith(id, data.descricao, data.valor, data.data, data.categoria_id, data.tipo);
    })

    it("an error should be throwed because category not found", async() => {

        jest.spyOn(categoryRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });
        
        try {
            await transactionService.executeEdit(data.usuario_id, id, data.descricao, data.valor, data.data, data.categoria_id, data.tipo);
        } catch (error) {
            expect(categoryRepo.findById).toHaveBeenCalledTimes(1);
            expect(categoryRepo.findById).toHaveBeenCalledWith(data.categoria_id);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Category not found");
            expect(error).toHaveProperty("statusCode", 404);
        }
    })

    it("an error should be throwed because transaction not found", async() => {
        
        jest.spyOn(categoryRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 1,
            }
        });
        jest.spyOn(transactionRepo, 'findById').mockImplementation(() => {
            return {
                rowCount: 0
            }
        });
        
        try {
            await transactionService.executeEdit(data.usuario_id, id, data.descricao, data.valor, data.data, data.categoria_id, data.tipo);
        } catch (error) {
            expect(categoryRepo.findById).toHaveBeenCalledTimes(1);
            expect(categoryRepo.findById).toHaveBeenCalledWith(data.categoria_id);
            expect(transactionRepo.findById).toHaveBeenCalledTimes(1);
            expect(transactionRepo.findById).toHaveBeenCalledWith(id, data.usuario_id);
            expect(error).toBeInstanceOf(AppError);
            expect(error).toHaveProperty("message", "Transaction not found for the requested user");
            expect(error).toHaveProperty("statusCode", 404);
        }
    })
});

describe("Transaction Service - Get Statement", () => {

    const usuario_id = 1;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("a statement should be returned", async() => {

        jest.spyOn(transactionRepo, 'getStatement').mockImplementation(() => {
            return {
                rows: [
                    {
                        "entrada": 300000,
                        "saida": 15800
                    }
                ]
            }
        });

        const response = await transactionService.executeGetStatement(usuario_id);

        expect(transactionRepo.getStatement).toHaveBeenCalledTimes(1);
        expect(transactionRepo.getStatement).toHaveBeenCalledWith(usuario_id);
        expect(response).toHaveProperty('entrada', 300000);
        expect(response).toHaveProperty("saida", 15800);
    })
});