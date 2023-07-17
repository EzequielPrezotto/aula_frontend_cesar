import {Volume} from "./carro_old";

export interface Motor {
    marca: string;
    potencia: string;
}

export default interface MotorCombustao extends Motor{
    qtdValvulas: number;
    volume: Volume;
}

export interface MotorEletrico extends Motor{
    voltagem: number
}