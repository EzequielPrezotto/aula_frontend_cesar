import {Combustivel_old} from "./combustivel_old";
import Motor from "./motor";

export type Volume = string | number;

interface CarroInterface {
    id: number
    atualiza: Function;
}

class TipoDeVeiculo {
    descricao: string
}

class Carro_old<T extends TipoDeVeiculo> {
    id: number;
    acessorios: string[];
    combustivel: Combustivel_old | string | boolean;
    marca: string;
    motor: Motor;

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

    atualizaVeiculo(id: number, operacao: number) : void {
        this.deletaVeiculo(id);
    }

    atualiza(id: number, operacao: number) : void {
        this.deletaVeiculo(id);
    }


    protected inativaVeiculo(id: number): void {

    }

    private deletaVeiculo(id: number) : void {

    }

}

class Camionete extends Carro_old<any> {
    volumeCacamba: Volume;

    inativar() {
        super.atualizaVeiculo(this.id, 1)
        super.inativaVeiculo(this.id)
    }
}

let tipo = new TipoDeVeiculo()

let carro = new Camionete();

carro.criaVeiculo('ford')
carro.atualizaVeiculo(1, 1)
carro.volumeCacamba = '200L'