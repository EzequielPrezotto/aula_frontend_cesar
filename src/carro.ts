import Veiculo from "./veiculo";

// @ts-ignore
type Volume = number | string;

// @ts-ignore
type Volume = {
    cm3: number;
    litros: number;
};

// @ts-ignore
export interface Motor {
    qtdValvulas: number;
    volume: Volume;
    // ....
}

// @ts-ignore
interface Motor {
    voltagem: string;
}

export default class Carro<T extends TipoDeVeiculo> extends Veiculo {
    combustivel: Combustivel;
    motor: Motor;
    acessorios: string[];
    private tipo: T;

    excluir = (idVeiculo: number): Veiculo => new Veiculo();

    constructor(motor: Motor) {
        super();
        this.motor = motor;
    }

    criaVeiculo(idVeiculo: number) :Veiculo {
        const veiculo = new Veiculo();
        return veiculo;
    }
}