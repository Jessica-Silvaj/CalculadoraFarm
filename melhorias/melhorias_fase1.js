
/* 🔧 FASE 1 - MELHORIAS DE UX E VALIDAÇÃO */

// ✅ 1. VALIDAÇÃO DO CAMPO DE QUANTIDADE
document.getElementById("quantidade").addEventListener("input", (e) => {
    const input = e.target;
    if (parseInt(input.value) < 1) {
        input.value = 1;
    }
});

// ✅ 2. FEEDBACK VISUAL AO ADICIONAR MATERIAIS
function mostrarAviso(texto = "✅ Adicionado à lista!") {
    const div = document.createElement("div");
    div.className = "fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50 animate-bounce";
    div.innerText = texto;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
}
