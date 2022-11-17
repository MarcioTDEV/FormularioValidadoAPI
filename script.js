/*  VALIDAÇÃO

1 capturar o evento do submit e prevent default
2 localizar campo e verificar dados passados
3 realizar formatações e exibir mensagem de erro

*/
let nome = document.querySelector("[data-form='nome']")
let email = document.querySelector("[data-form='email']")
let cpf = document.querySelector("[data-form='cpf']")
let senha = document.querySelector("[data-form='senha']")
let passwordTwo = document.querySelector("[data-form='passwordTwo']")

let cep = document.querySelector("[data-form='cep']")
let logradouro = document.querySelector("[data-form='logradouro']")
let cidade = document.querySelector("[data-form='cidade']")
let estado = document.querySelector("[data-form='estado']")

cep.addEventListener("blur", () => {
    /*validar o tamanho da string antes do fetch */
    let divCep = cep.parentNode
    let spanCep = divCep.querySelector("span")


    if (cep.value.length !== 8) {
        cep.className = "errorInput"

        spanCep.className = "errorSpan"
        spanCep.innerHTML = "O CEP deve conter oito números"

    } else {
        fetch(`https://viacep.com.br/ws/${cep.value}/json`)
            .then(data => data.json())
            .then(data => {
                if (data.erro == true) {
                    cep.className = "errorInput"

                    spanCep.className = "errorSpan"
                    spanCep.innerHTML = "Digite um CEP válido"
                } else {

                    logradouro.value = data.logradouro
                    cidade.value = data.localidade
                    estado.value = data.uf

                    // mensagem de acerto CEP
                    cep.className = "successInput"
                    spanCep.className = "sucessSpan"
                    spanCep.innerHTML = "Tudo certo!"

                    //mensagem acerto logradouro
                    let divLog = logradouro.parentNode
                    let spanLog = divLog.querySelector("span")
                    logradouro.className = "successInput"
                    spanLog.className = "sucessSpan"
                    spanLog.innerHTML = "Tudo certo!"

                    //mensagem acerto cidade
                    let divCidade = cidade.parentNode
                    let spanCidade = divCidade.querySelector("span")
                    cidade.className = "successInput"
                    spanCidade.className = "sucessSpan"
                    spanCidade.innerHTML = "Tudo certo!"

                    //mensagem acerto estado
                    let divEstado = estado.parentNode
                    let spanEstado = divEstado.querySelector("span")
                    estado.className = "successInput"
                    spanEstado.className = "sucessSpan"
                    spanEstado.innerHTML = "Tudo certo!"



                }
            })
    }
})

let form = document.querySelector('form')

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validarNome(nome)
    validaEmail(email)
    checagemCPF(cpf)
    validarSenha(senha, passwordTwo)
    validarCEP(cep)
    validarLogradouro(logradouro)
    validarCidade(cidade)
    validarEstado(estado)
})

function validarEstado(estado) {
    let divEstado = estado.parentNode
    let spanEstado = divEstado.querySelector("span")
    if (estado.value === "") {
        estado.className = "errorInput"

        spanEstado.className = "errorSpan"
        spanEstado.innerHTML = "O estado não pode ficar em branco"
    }
}

function validarCidade(cidade) {
    let divCidade = cidade.parentNode
    let spanCidade = divCidade.querySelector("span")
    if (cidade.value === "") {
        cidade.className = "errorInput"

        spanCidade.className = "errorSpan"
        spanCidade.innerHTML = "A cidade não pode ficar em branco"
    }
}

function validarCEP(cep) {
    let divCep = cep.parentNode
    let spanCep = divCep.querySelector("span")
    if (cep.value === "") {
        cep.className = "errorInput"

        spanCep.className = "errorSpan"
        spanCep.innerHTML = "O CEP não pode ficar em branco"
    }
}

function validarLogradouro(logradouro) {
    let divLog = logradouro.parentNode
    let spanLog = divLog.querySelector("span")
    if (logradouro.value === "") {
        logradouro.className = "errorInput"

        spanLog.className = "errorSpan"
        spanLog.innerHTML = "O logradouro não pode ficar em branco"
    }
}

function checagemCPF(cpf) {
    let divCPF = cpf.parentNode
    let spanCPF = divCPF.querySelector("span")
    if (cpf.value === "") {
        cpf.className = "errorInput"

        spanCPF.className = "errorSpan"
        spanCPF.innerHTML = "O CPF não pode ficar em branco"
    }
    else if (validarCPF(cpf.value) === false) {
        cpf.className = "errorInput"

        spanCPF.className = "errorSpan"
        spanCPF.innerHTML = "O CPF digitado é inválido"
    }
    else {
        cpf.className = "successInput"

        spanCPF.className = "sucessSpan"
        spanCPF.innerHTML = "Tudo certo!"
    }
}
function validarSenha(senha, passwordTwo) {
    // verificar se as senhas estão vazias, uma a uma
    // verificar se conincidem
    let divSenha = senha.parentNode
    let spanSenha = divSenha.querySelector("span")

    let divPasswordTwo = passwordTwo.parentNode
    let spanPasswordTwo = divPasswordTwo.querySelector("span")

    if (senha.value === "" || passwordTwo.value === "") {
        senha.className = "errorInput"

        spanSenha.className = "errorSpan"
        spanSenha.innerHTML = "As senhas devem ser preenchidas"

        passwordTwo.className = "errorInput"

        spanPasswordTwo.className = "errorSpan"
        spanPasswordTwo.innerHTML = "As senhas devem ser preenchidas"


    } else if (senha.value !== passwordTwo.value) {
        senha.className = "errorInput"

        spanSenha.className = "errorSpan"
        spanSenha.innerHTML = "As senhas estão diferentes"

        passwordTwo.className = "errorInput"

        spanPasswordTwo.className = "errorSpan"
        spanPasswordTwo.innerHTML = "As senhas estão diferentes"
    }

    else {
        senha.className = "successInput"

        spanSenha.className = "sucessSpan"
        spanSenha.innerHTML = "Tudo Certo!"

        passwordTwo.className = "successInput"

        spanPasswordTwo.className = "sucessSpan"
        spanPasswordTwo.innerHTML = "Tudo Certo!"
    }
}

function validaEmail(email) {
    let inputEmail = email.value.trim()
    let div = email.parentNode
    let span = div.querySelector("span")

    let qtdeArrobas = 0
    for (let i = 0; i < inputEmail.length; i++) {
        if (inputEmail[i] === "@")
            qtdeArrobas++
    }

    // email vazio
    if (inputEmail === "") {
        email.className = "errorInput"

        span.className = "errorSpan"
        span.innerHTML = "O email não pode ficar vazio"
    }
    // qtde arrobas
    else if (qtdeArrobas !== 1) {
        email.className = "errorInput"

        span.className = "errorSpan"
        span.innerHTML = "Digite um email válido"
    }
    else {
        email.className = "successInput"

        span.className = "sucessSpan"
        span.innerHTML = "Tudo certo!"
    }

}



function validarNome(nome) {
    let inputNome = nome.value.trim()
    let div = nome.parentNode
    let span = div.querySelector("span")

    if (inputNome === "") {
        nome.className = "errorInput"

        span.className = "errorSpan"
        span.innerHTML = "O campo não pode ficar vazio"
    } else {
        nome.className = "successInput"

        span.className = "sucessSpan"
        span.innerHTML = "Tudo certo!"
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}