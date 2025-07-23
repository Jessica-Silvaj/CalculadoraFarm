
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

    const isMuni = produto.startsWith("Muni");
    const unidades = isMuni ? Math.ceil(qtd / 30) : qtd;

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
            "Cobre": 15 * unidades,
            "Frasco de Pólvora": 3 * unidades,
        };
    }

    if (produto === "MuniRifle") {
        materiais = {
            "Alumínio": 30 * unidades,
            "Cobre": 30 * unidades,
            "Frasco de Pólvora": 8 * unidades
        };
    }

    if(produto === "MuniSub") {
        materiais = {
            "Alumínio": 15 * unidades,
            "Cobre": 15 * unidades,
            "Frasco de Pólvora": 5 * unidades,
        };
    }

    // Adicionar materiais acumulados
    for (let item in materiais) {
        if (!listaMateriais[item]) {
            listaMateriais[item] = 0;
        }
        
        if (isMuni) {
            const qtdAnterior = produtosSelecionados[nomeProduto] || 0;
            const qtdTotal = qtdAnterior + qtd;
            const packsAntes = Math.floor((qtdAnterior - 1) / 30);
            const packsAgora = Math.floor((qtdTotal - 1) / 30);
            const novosPacks = packsAgora - packsAntes;

            const porPack = materiais[item] / unidades;

            if (qtdAnterior == 0) {
                // Primeira vez: garantir ao menos 1 pack completo
                listaMateriais[item] += materiais[item];
            } else if (novosPacks > 0) {
                listaMateriais[item] += novosPacks * porPack;
            }
        } else {
            listaMateriais[item] += materiais[item];
        }
    }

    // Atualizar lista de produtos
    if (!produtosSelecionados[nomeProduto]) {
        produtosSelecionados[nomeProduto] = 0;
    }
    produtosSelecionados[nomeProduto] += isMuni ? qtd : qtd;

    atualizarListaCard();
    mostrarAviso();
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
                        : listaMateriais[item].toLocaleString('pt-BR')
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
            totalUnidades += Math.ceil(produtosSelecionados[nomeProduto] /30) * 30;
        }
    }

    // Se tiver munições, adiciona <tfoot>
    if (totalUnidades > 0) {
        tabela.innerHTML += `
            <tfoot>
                <tr class="bg-gray-100 font-semibold">
                    <td class="border px-4 py-2">Unidade</td>
                    <td class="border px-4 py-2">${totalUnidades.toLocaleString('pt-BR')} munições</td>
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
    const nomeInterno = getNomeInterno(produto);

    const isMuni = nomeInterno && nomeInterno.startsWith("Muni");
    const Unidades = isMuni ? Math.ceil(qtd / 30) : qtd;

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
    else if (nomeInterno === "MuniPistola") materiais = {
        "Cobre": 15 * Unidades, "Frasco de Pólvora": 3 * Unidades
    };
    else if (nomeInterno === "MuniRifle") materiais = {
        "Alumínio": 30 * Unidades, "Cobre": 30 * Unidades,
        "Frasco de Pólvora": 8 * Unidades
    };
    else if (nomeInterno === "MuniSub") materiais = {
        "Alumínio": 15 * Unidades, "Cobre": 15 * Unidades,
        "Frasco de Pólvora": 5 * Unidades   
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


