class Carro {
    acessorios: string[];
    combustivel: Combustivel | string | boolean;
    marca: string

    banco: any; // acesso ao banco

    constructor() {
        this.marca = 'teste';
        this.combustivel = false
    }

    criaVeiculo(marca: string): void {
        const criaNoBanco = (marca: string) => this.banco.cria(marca)

        let pneus = ['teste1', 'teste2'] ;
        pneus.forEach(value => console.log(value))
    }



}