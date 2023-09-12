const { execute } = require("../src/services/categoryService");
const categoryRepo = require("../src/repositories/categoryRepository");

describe("Category Service", () => {

    it("categories should be listed", async () => {

        jest.spyOn(categoryRepo, 'findAll').mockImplementation(() => {
            return {
                rows: [
                    {id: 1, descricao: "Alimentação"},
                    {id: 2, descricao: "Assinaturas e Serviços"},
                    {id: 3, descricao: "Casa"},
                    {id: 4, descricao: "Mercado"},
                    {id: 5, descricao: "Cuidados Pessoais"},
                    {id: 6, descricao: "Educação"},
                    {id: 7, descricao: "Família"},
                    {id: 8, descricao: "Lazer"},
                    {id: 9, descricao: "Pets"},
                    {id: 10, descricao: "Presentes"},
                    {id: 11, descricao: "Roupas"},
                    {id: 12, descricao: "Saúde"},
                    {id: 13, descricao: "Transporte"},
                    {id: 14, descricao: "Salário"},
                    {id: 15, descricao: "Vendas"},
                    {id: 16, descricao: "Outras receitas"},
                    {id: 17, descricao: "Outras despesas"}
                ]
            }
        });

        const list = await execute();

        expect(list).toHaveLength(17);
        expect(list[0]).toHaveProperty('descricao');
        expect(list[16]).toHaveProperty('id');
        expect(list).toContainEqual({id: 3, descricao: "Casa"});
        expect(list).toContainEqual({id: 14, descricao: "Salário"});
        expect(categoryRepo.findAll).toHaveBeenCalledTimes(1);
        
    })
})