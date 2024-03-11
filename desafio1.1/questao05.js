const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function validarNome(nome) {
  return nome.length >= 5;
}

function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

function validarDataNascimento(dataNascimento) {
  const componentesDatas = dataNascimento.split('/');
  if (componentesDatas.length !== 3) return false;

  const dia = parseInt(componentesDatas[0]);
  const mes = parseInt(componentesDatas[1]) - 1;
  const ano = parseInt(componentesDatas[2]);
  const data = new Date(ano, mes, dia);

  const idadeMinima = 18;
  const hoje = new Date();
  const idade = hoje.getFullYear() - data.getFullYear();

  return idade >= idadeMinima;
}
  
function validarRendaMensal(rendaMensal) {
    const formatoRenda = /^\d+,\d{2}$/; 
    return typeof rendaMensal === 'string' && formatoRenda.test(rendaMensal);
}

function validarEstadoCivil(estadoCivil) {
  const estado = ['C', 'S', 'V', 'D'];
  return estado.includes(estadoCivil.toUpperCase());
}

function validarDependentes(dependentes) {
  return dependentes >= 0 && dependentes <= 10;
}

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarData(data) {
    const componentesDatas = data.split('/');
    return `${componentesDatas[0].padStart(2, '0')}/${componentesDatas[1].padStart(2, '0')}/${componentesDatas[2]}`;
}

rl.question('Digite o nome do cliente: ', (nome) => {
  if (!validarNome(nome)) {
    console.log('O nome deve ter pelo menos 5 caracteres!!!');
    rl.close();
    return;
  }

  rl.question('Digite o CPF do cliente: ', (cpf) => {
    if (!validarCPF(cpf)) {
      console.log('O CPF deve conter exatamente 11 dígitos numéricos!!!');
      rl.close();
      return;
    }

    rl.question('Digite a data de nascimento (DD/MM/AAAA): ', (dataNascimento) => {
        
        if (dataNascimento.indexOf('/') === -1) {
            console.log('A data de nascimento deve estar no formato DD/MM/AAAA!!!');
            rl.close();
            return;
        }
        if (!validarDataNascimento(dataNascimento)) {
        console.log('O cliente deve ter pelo menos 18 anos na data atual!!!');
        rl.close();
        return;
      }

      rl.question('Digite a renda mensal: ', (rendaMensal) => {
        if (!validarRendaMensal(rendaMensal)) {
          console.log('Digite um valor numérico válido.');
          rl.close();
          return;
        }

        rl.question('Digite o estado civil (C, S, V ou D): ', (estadoCivil) => {
          if (!validarEstadoCivil(estadoCivil)) {
            console.log('Estado civil inválido. Digite C, S, V ou D.');
            rl.close();
            return;
          }

          rl.question('Digite o número de dependentes: ', (dependentes) => {
            if (!validarDependentes(dependentes)) {
              console.log('Número de dependentes inválido. Digite um valor entre 0 e 10.');
              rl.close();
              return;
            }

            console.log('Dados do cliente:');
            console.log('Nome:', nome);
            console.log('CPF:', formatarCPF(cpf));
            console.log('Data de Nascimento:', formatarData(dataNascimento));
            console.log('Renda Mensal:', parseFloat(rendaMensal).toFixed(2));
            console.log('Estado Civil:', estadoCivil.toUpperCase());
            console.log('Dependentes:', parseInt(dependentes));

            rl.close();
          });
        });
      });
    });
  });
});
