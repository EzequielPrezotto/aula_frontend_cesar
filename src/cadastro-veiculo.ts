import Veiculo from "./veiculo";
import Carro from "./carro";


export default class CadastroVeiculo {

    // call let c = new CadastroVeiculo;
    // c.cadastrar();


    public cadastrar(carro: Carro<any>) {

        localStorage.setItem('usuario', 'ezequiel')
        localStorage.setItem(String(carro.id), JSON.stringify(carro));
    }

    imprimeTodos<T extends Veiculo>(): void {
        let veiculos =  {...localStorage};
        Object.entries(veiculos).forEach(value => console.log(value[1]))
    }
}