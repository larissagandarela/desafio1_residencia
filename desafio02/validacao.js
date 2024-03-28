const moment = require('moment');

class Cliente {
    constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.rendaMensal = rendaMensal;
        this.estadoCivil = estadoCivil;
    }

    validarNome() {
        if (typeof this.nome !== 'string') {
            return false;
        }
        if (this.nome.length < 5 || this.nome.length > 60) {
            return false;
        }
        return true;
    }

    validarCPF() {
        let cpf = this.cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(9))) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    }

    validarDataNascimento() {
        const data = moment(this.dataNascimento, 'DDMMYYYY');
        const hoje = moment();
        if (!data.isValid() || hoje.diff(data, 'years') < 18) {
            throw new Error('O cliente deve ter pelo menos 18 anos na data atual');
        }
    }

    validarRendaMensal() {
        if (typeof this.rendaMensal !== 'number') {
            return false;
        }
        if (!/^(\d+(\.\d{1,2})?)?$/.test(this.rendaMensal)) {
            return false;
        }
        return true;
    }

    validarEstadoCivil() {
        if (typeof this.estadoCivil !== 'string') {
            return false;
        }
        let estadoCivil = this.estadoCivil.toUpperCase();
        if (!['C', 'S', 'V', 'D'].includes(estadoCivil)) {
            return false;
        }
        return true;
    }

    validarCliente() {
        this.validarNome();
        this.validarCPF();
        this.validarDataNascimento();
        this.validarRendaMensal();
        this.validarEstadoCivil();
    }
}

module.exports = Cliente;
