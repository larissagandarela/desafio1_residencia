const fs = require('fs');

fs.readFile('./clientes.json', 'utf8', (error, data) => {
  if (error) {
    if (error.code === 'ENOENT') {
      console.error('Arquivo não encontrado!');
    } else {
      console.error('Erro de leitura do arquivo!!');
    }
    return;
  }
  console.log(data);
});

