import CadastroVeiculo from "./cadastro-veiculo";
import Carro, {Motor} from "./carro";

const carro = new Carro({qtdValvulas: 16, volume: 2} as any);
carro.id = Math.random();

let c = new CadastroVeiculo();


c.cadastrar(carro);



c.imprimeTodos();