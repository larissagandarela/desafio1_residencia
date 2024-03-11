const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Vertice {
    #x;
    #y;
    constructor(x, y) {
      this.#x = x;
      this.#y = y;
  
      this.getX = function() {
        return this.#x;
      };
  
      this.getY = function() {
        return this.#y;
      };
    }

    _getDistancia(segundoVertice) {
        const dx = this.getX() - segundoVertice.getX();
        const dy = this.getY() - segundoVertice.getY();
        const resultado = Math.sqrt(dx * dx + dy * dy);
        return resultado;
    }

    move(x, y){
        this.#x = x;
        this.#y = y;
      }

    equals(segundoVertice) {
        return this.x === segundoVertice.getX() && this.y === segundoVertice.getY();
    }
}

async function lerCoordenadasVertice() {
  return new Promise((resolve, reject) => {
      rl.question('recebendo as coordenadas (x y): ', (input) => {
          const [x, y] = input.trim().split(' ').map(Number);
          resolve([x, y]);
      });
  });
}

async function main() {
  try {
      console.log('Digite as coordenadas do primeiro vértice:');
      const [x1, y1] = await lerCoordenadasVertice();

      console.log('Digite as coordenadas do segundo vértice:');
      const [x2, y2] = await lerCoordenadasVertice();

      const vertice1 = new Vertice(x1, y1);
      const vertice2 = new Vertice(x2, y2);

      console.log(`Distância entre os vértices: ${vertice1._getDistancia(vertice2)}`);

      console.log('Digite as novas coordenadas para mover o primeiro vértice:');
      const [newX, newY] = await lerCoordenadasVertice();
      vertice1.move(newX, newY);

      console.log('Coordenadas do primeiro vértice após a movimentação:', vertice1.getX(), vertice1.getY());

      if (vertice1.equals(vertice2)) {
          console.log('Os vértices são iguais.');
      } else {
          console.log('Os vértices são diferentes.');
      }

      rl.close();
  } catch (error) {
      console.error('Ocorreu um erro:', error);
      rl.close();
  }
}

main();

module.exports = Vertice