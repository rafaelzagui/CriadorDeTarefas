function index() {
    const inputTarefa = document.querySelector('.addItem');
    const btnTarefa = document.querySelector('.btnAddTarefa');
    const tarefas = document.querySelector('.listaTarefas');

    inputTarefa.addEventListener("keypress", function (e) {

        if (e.keyCode === 13) {
            if (!inputTarefa.value) return;
            criaLinhas(inputTarefa.value)

        }

    })
    document.addEventListener("click", function (e) {
        const el = e.target;
        if (el.classList.contains('apagar')) {
            el.parentElement.remove();
            salvaTarefas();
        }

    })
    btnTarefa.addEventListener("click", function (e) {
        criaLinhas(inputTarefa.value)
    })

    const criaBotaoApagar = (li) => {
        const btn = document.createElement('button');
        btn.innerText = '-';
        btn.classList.add('btnApagar');
        btn.setAttribute('class', 'apagar');
        btn.setAttribute('title', 'apagar tarefa')
        li.appendChild(btn)

    }

    const limpaInput = () => {
        inputTarefa.value = '';
        inputTarefa.focus();

    }
    const criaLinhas = (tarefa) => {
        const li = document.createElement('li');
        let itens = document.createTextNode(tarefa)
        if (!tarefa) return;
        li.appendChild(itens)
        tarefas.appendChild(li)
        limpaInput()
        criaBotaoApagar(li)
        salvaTarefas()

    } 
    const salvaTarefas = () => {
        const liTarefas = tarefas.querySelectorAll('li');
        console.log(liTarefas)
        const listaTarefas = [];
        for (let tarefa of liTarefas) {
            let txtTarefas = tarefa.innerText;
            txtTarefas = txtTarefas.replace('-', '')
            listaTarefas.push(txtTarefas)
        }
        const tarefasJSON = JSON.stringify(listaTarefas) //converte array em JSON no caso uma string
        localStorage.setItem('tarefas', tarefasJSON);// pega esse JSON e salva no localStorage do navegador
    }
    const lerTarefasSalvas = () => {
        const tarefas = localStorage.getItem('tarefas')
        const listaTarefa = JSON.parse(tarefas)
        for( let tarefa of listaTarefa)
        {
            criaLinhas(tarefa)
        }
    }
    lerTarefasSalvas();


}

index();
