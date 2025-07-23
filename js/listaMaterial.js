
const listaMateriais = {};
const produtosSelecionados = {};

document.addEventListener('DOMContentLoaded', () => {
    const listaSalva = localStorage.getItem('listaMateriais');
    const produtosSalvos = localStorage.getItem('produtosSelecionados');

    if (listaSalva && produtosSalvos) {
        Object.assign(listaMateriais, JSON.parse(listaSalva));
        Object.assign(produtosSelecionados, JSON.parse(produtosSalvos));
        atualizarListaCard();
    }
});

function adicionarTodosMateriais(produto) {
    const qtd = parseInt(document.getElementById("quantidade").value);
    const selectProduto = document.getElementById("produto");
    const nomeProduto = selectProduto.options[selectProduto.selectedIndex].text;

    let materiais = {};

    // Repetir toda lógica de cálculo (copiamos da calcularMateriais)
    if (produto === "adesiva") {
        materiais = { "Dinheiro Sujo": 115 * qtd };
    }
    if (produto === "eletronico") {
        materiais = { "Dinheiro Sujo": 550 * qtd };
    }
    if (produto === "polvora") {
        materiais = { "Dinheiro Sujo": 125 * qtd };
    }
    if (produto === "c4") {
        materiais = {
            "Plástico": 15 * qtd,
            "Fita Adesiva": 1 * qtd,
            "Vidro": 5 * qtd,
            "Lixo Eletrônico": 1 * qtd,
            "Explosivos": 7 * qtd
        };
    }

    if (produto === "explosivo") {
        materiais = {
            "Plástico": 3 * qtd,
            "Fita Adesiva": 1 * qtd,
            "Frasco de Pólvora": 2 * qtd,
        };
    }

    if (produto === "MuniPistola") {
        materiais = {
            "Cobre": 15 * qtd,
            "Frasco de Pólvora": 3 * qtd,
        };
    }

    if (produto === "MuniRifle") {
        materiais = {
            "Alumínio": 30 * qtd,
            "Cobre": 30 * qtd,
            "Frasco de Pólvora": 8 * qtd
        };
    }

    if(produto === "MuniSub") {
        materiais = {
            "Alumínio": 15 * qtd,
            "Cobre": 15 * qtd,
            "Frasco de Pólvora": 5 * qtd,
        };
    }

    // Adicionar materiais acumulados
    for (let item in materiais) {
        if (!listaMateriais[item]) {
            listaMateriais[item] = 0;
        }
        listaMateriais[item] += materiais[item];
    }

    // Atualizar lista de produtos
    if (!produtosSelecionados[nomeProduto]) {
        produtosSelecionados[nomeProduto] = 0;
    }
    produtosSelecionados[nomeProduto] += qtd;

    atualizarListaCard();
}


function atualizarListaCard() {
    // Atualiza materiais
    const tabela = document.getElementById("tabelaListaMateriais");
    tabela.innerHTML = `
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left">Item</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Total</th>
                </tr>
            </thead>
            <tbody>
        `;
    for (let item in listaMateriais) {
        tabela.innerHTML += `
            <tr>
                <td class="border border-gray-300 px-4 py-2">${item}</td>
                <td class="border border-gray-300 px-4 py-2">${item === "Dinheiro Sujo" 
                        ? listaMateriais[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                        : listaMateriais[item]
                }</td>
            </tr>
        `;
    }

    tabela.innerHTML += `</tbody>`;

    // Verifica se há munições selecionadas
    let totalUnidades = 0;
    for (let nomeProduto in produtosSelecionados) {
        const nomeInterno = getNomeInterno(nomeProduto);
        if (nomeInterno && nomeInterno.startsWith("Muni")) {
            totalUnidades += produtosSelecionados[nomeProduto] * 30;
        }
    }

    // Se tiver munições, adiciona <tfoot>
    if (totalUnidades > 0) {
        tabela.innerHTML += `
            <tfoot>
                <tr class="bg-gray-100 font-semibold">
                    <td class="border px-4 py-2">Unidade</td>
                    <td class="border px-4 py-2">${totalUnidades} munições</td>
                </tr>
            </tfoot>
        `;
    }
    // Atualiza produtos
    const ul = document.getElementById("produtosSelecionados");
    ul.innerHTML = "";
        for (let produto in produtosSelecionados) {
            ul.innerHTML += `
                <li class="mb-2 text-sm text-gray-800">
                    ${produto} — ${produtosSelecionados[produto]}x
                    <button onclick="removerProduto('${produto}')" class="ml-2 text-red-500">🗑️</button>
                </li>
            `;
        }

    localStorage.setItem('listaMateriais', JSON.stringify(listaMateriais));
    localStorage.setItem('produtosSelecionados', JSON.stringify(produtosSelecionados));

    // Exibe card
    document.getElementById("listaMateriaisCard").classList.remove('hidden');;
}

function limparLista() {
    for (let key in listaMateriais) delete listaMateriais[key];
    for (let key in produtosSelecionados) delete produtosSelecionados[key];

    localStorage.removeItem('listaMateriais');
    localStorage.removeItem('produtosSelecionados');

    document.getElementById("tabelaListaMateriais").innerHTML = `
        <thead>
            <tr class="bg-gray-200">
                <th class="border border-gray-300 px-4 py-2 text-left">Item</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Total</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    document.getElementById("produtosSelecionados").innerHTML = "";
    document.getElementById("listaMateriaisCard").classList.add('hidden');
}

function removerProduto(produto) {
    const qtd = produtosSelecionados[produto];
    if (!qtd) return;

    let materiais = {};

    // Mapear nomes visuais para internos
    const nomeInterno = getNomeInterno(produto);

    if (nomeInterno === "adesiva") materiais = { "Dinheiro Sujo": 115 * qtd };
    else if (nomeInterno === "eletronico") materiais = { "Dinheiro Sujo": 550 * qtd };
    else if (nomeInterno === "polvora") materiais = { "Dinheiro Sujo": 125 * qtd };
    else if (nomeInterno === "c4") materiais = {
        "Plástico": 15 * qtd, "Fita Adesiva": 1 * qtd, "Vidro": 5 * qtd,
        "Lixo Eletrônico": 1 * qtd, "Explosivos": 7 * qtd
    };
    else if (nomeInterno === "explosivo") materiais = {
        "Plástico": 3 * qtd, "Fita Adesiva": 1 * qtd, "Frasco de Pólvora": 2 * qtd
    };
    else if (nomeInterno === "sub") materiais = {
        "Sucata de Metal": 45 * qtd, "Alumínio": 24 * qtd,
        "Cobre": 24 * qtd, "Frasco de Pólvora": 7 * qtd
    };
    else if (nomeInterno === "pistola") materiais = {
        "Sucata de Metal": 25 * qtd, "Cobre": 30 * qtd,
        "Frasco de Pólvora": 6 * qtd
    };
    else if (nomeInterno === "rifle") materiais = {
        "Sucata de Metal": 75 * qtd, "Alumínio": 35 * qtd,
        "Cobre": 35 * qtd, "Frasco de Pólvora": 8 * qtd
    };
    else if (nomeInterno === "espingarda") materiais = {
        "Sucata de Metal": 150 * qtd, "Alumínio": 21 * qtd,
        "Frasco de Pólvora": 5 * qtd
    };
    else if (nomeInterno === "glock" || nomeInterno === "m1911") materiais = {
        "Sucata de Metal": 685 * qtd, "Peça de Armas": 6 * qtd, "Aluminínio": 175 * qtd,
        "Plástico": 225 * qtd, "Borracha": 225 * qtd, "Peça de Pistola": 1 * qtd,
        "Vidro": 225 * qtd, "Cobre": 175 * qtd
    };
    else if (nomeInterno === "amt380") materiais = {
        "Sucata de Metal": 505 * qtd, "Peça de Armas": 6 * qtd, "Aluminínio": 115 * qtd,
        "Plástico": 125 * qtd, "Borracha": 150 * qtd, "Peça de Pistola": 1 * qtd,
        "Vidro": 150 * qtd, "Cobre": 115 * qtd
    };
    else if (nomeInterno === "fx45") materiais = {
        "Vidro": 105 * qtd, "Cobre": 85 * qtd, "Plástico": 105 * qtd,
        "M1911": 1 * qtd, "Fio de Cobre": 3 * qtd,
        "Borracha": 105 * qtd, "Aluminínio": 85 * qtd,
        "Turbo de Plástico": 3 * qtd
    };
    else if (nomeInterno === "eagle") materiais = {
        "Vidro": 105 * qtd, "Cobre": 85 * qtd, "Glock": 1 * qtd,
        "Aluminínio": 85 * qtd, "Fio de Cobre": 5 * qtd,
        "Borracha": 105 * qtd, "Plástico": 105 * qtd,
        "Turbo de Plástico": 5 * qtd
    };
    else if (nomeInterno === "p7m10") materiais = {
        "Parafusos Pequenos": 2 * qtd, "Cobre": 50 * qtd,
        "Sucata de Metal": 2 * qtd, "Plástico": 80 * qtd,
        "Vidro": 80 * qtd, "Borracha": 80 * qtd,
        "Aluminínio": 50 * qtd, "AMT 380": 1 * qtd
    };
    else if (nomeInterno === "five") materiais = {
        "Parafusos Pequenos": 1 * qtd, "Cobre": 50 * qtd,
        "Sucata de Metal": 1 * qtd, "M1911": 1 * qtd,
        "Vidro": 80 * qtd, "Borracha": 80 * qtd,
        "Aluminínio": 50 * qtd, "Plástico": 80 * qtd
    };

    // Remover materiais da lista
    for (let item in materiais) {
        if (listaMateriais[item]) {
            listaMateriais[item] -= materiais[item];
            if (listaMateriais[item] <= 0) {
                delete listaMateriais[item];
            }
        }
    }

    // Remover produto da lista
    delete produtosSelecionados[produto];

    // Atualizar ou limpar
    if (Object.keys(produtosSelecionados).length === 0) {
        limparLista();
    } else {
        atualizarListaCard();
    }
}

// Função auxiliar para obter o nome interno baseado no nome exibido
function getNomeInterno(nomeExibido) {
    const select = document.getElementById("produto");
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === nomeExibido) {
            return select.options[i].value;
        }
    }
    return null;
}


