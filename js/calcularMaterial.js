function calcularMateriais() {
    const produto = document.getElementById("produto").value;
    const qtd = parseInt(document.getElementById("quantidade").value);
    let materiais = {};

    const produtoMuni = produto.startsWith("Muni");
    let unidades = produtoMuni ? Math.ceil(qtd / 30) : qtd;

    // Penhores
    if (produto === "adesiva") {
        materiais = {
            "Dinheiro Sujo": (115 * qtd).toLocaleString('pt-BR' ,{ style: 'currency', currency: 'BRL' })
        };
    }

    if (produto === "eletronico") {
        materiais = {
            "Dinheiro Sujo": (550 * qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        };
    }

    if (produto === "polvora") {
        materiais = {
            "Dinheiro Sujo": (125 * qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        };
    }

    // Leste
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

    // Mesa Craft

    if (produto === "MuniPistola") {
        materiais = {
            "Cobre": 15 * unidades,
            "Frasco de Pólvora": 3 * unidades ,
        };
    }

    if (produto === "MuniRifle") {
        materiais = {
            "Alumínio": 30 * unidades,
            "Cobre": 30 * unidades,
            "Frasco de Pólvora": 8 * unidades
        };
    }

    if (produto === "MuniSub") {
        materiais = {
            "Alumínio": 15 * unidades,
            "Cobre": 15 * unidades,
            "Frasco de Pólvora": 5 * unidades,
        };
    }

    let html = `
<div class="flex justify-between items-center mb-4">
    <h3 class="text-xl font-semibold">Materiais Necessários</h3>
    <button 
        class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        onclick="adicionarTodosMateriais('${produto}')"
    >
       ➕ Adicionar Materiais
    </button>
</div>
<div class="overflow-x-auto">
<table class="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden"">
    <thead>
        <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2 text-left">Item</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Quantidade</th>
        </tr>
    </thead>
    <tbody>
`;

    for (let item in materiais) {
        html += `
        <tr>
            <td class="border border-gray-300 px-4 py-2">${item}</td>
            <td class="border border-gray-300 px-4 py-2">${materiais[item].toLocaleString('pt-BR')}</td>
        </tr>
    `;
    }

    if (produto.startsWith("Muni")) {
        html += `
        </tbody>
        <tfoot>
            <tr class="bg-gray-100 font-semibold">
                <td class="border px-4 py-2">Unidade</td>
                <td class="border px-4 py-2">${(unidades * 30).toLocaleString('pt-BR')} munições</td>
            </tr>
        </tfoot>
        `;
    } else {
        html += `</tbody>`;
    }

    html += `
    </tbody>
</table>
</div>
`;

    document.getElementById("resultado").innerHTML = html;
    mostrarTotalResultado(materiais);

}

function limparFiltros() {
    document.getElementById("produto").selectedIndex = 0;
    document.getElementById("quantidade").value = 1;
    document.getElementById("resultado").innerHTML = "";
}