
# 📦 Calculadora de Materiais para Crafting

Este sistema é uma calculadora interativa para estimar e organizar materiais necessários para produção de itens em jogos baseados em crafting. A interface é 100% em português e desenvolvida com HTML + TailwindCSS + JavaScript.

---

## 🚀 Funcionalidades

### 🔍 1. **Simulação de Materiais**
- O usuário escolhe um produto (como "Munição de Pistola", "Explosivo", "C4", etc.).
- Insere a **quantidade desejada**.
- O sistema exibe automaticamente os **materiais necessários**, em uma tabela formatada com valores separados por vírgula (formato brasileiro).

### 🧠 2. **Lógica Inteligente de Munição**
- Para produtos do tipo `Munição`, o sistema entende que **1 unidade representa 30 munições**.
- O cálculo de materiais só ocorre **ao ultrapassar o limite de 30**.
- Exemplo:
  - `30` munições → **não soma material ainda**
  - `31` munições → **soma materiais de 1 pacote**
  - `61` munições → **soma materiais de 2 pacotes**
- A primeira vez que o item é adicionado, os materiais também são contabilizados apenas quando ultrapassado o pack.

### ➕ 3. **Lista de Materiais**
- Ao clicar em "➕ Adicionar Materiais", o item é somado à lista acumulativa da lateral direita.
- Mostra:
  - Materiais totais com formatação adequada
  - Produtos adicionados com botões para remoção
  - Rodapé com **total em R$** ou total de munições (com `.toLocaleString('pt-BR')`)

### 📄 4. **Exportação para PDF**
- Um botão `📄 Exportar PDF` gera automaticamente um arquivo com:
  - Lista de materiais formatada
  - Lista de produtos selecionados

### 🔁 5. **Persistência Local**
- Utiliza `localStorage` para manter a lista entre sessões do navegador.


---

## 📁 Estrutura de Arquivos

├── index.html # Interface da calculadora
├── calcularMaterial.js # Cálculo individual de materiais por produto
├── listaMaterial.js # Gerenciamento da lista acumulada
├── exportarPDF.js # Exportação em PDF usando jsPDF + AutoTable

# 📌 Tecnologias Usadas

- **JavaScript Puro**
- **Tailwind CSS**
- **jsPDF + AutoTable**
- **SheetJS (XLSX - opcional)**

---

## 🛠 Como usar

1. Abra o arquivo `index.html` em seu navegador.
2. Selecione o produto desejado.
3. Digite a quantidade e clique em 🔍 "Pesquisar".
4. Revise os materiais listados.
5. Clique em ➕ "Adicionar Materiais" para montar sua lista.
6. Exporte em PDF, se quiser.

---

## 📦 Observações

- Todos os valores são formatados para o padrão brasileiro.
- A tabela final ajusta corretamente "Dinheiro Sujo" com `R$`, e os demais itens com separadores decimais.
- Munições só impactam nos materiais **após passarem de múltiplos de 30**.