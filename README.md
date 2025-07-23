
# 📦 Calculadora de Materiais para Crafting

Calculadora interativa para estimar e organizar os materiais necessários na produção de itens, com foco em sistemas de crafting. Desenvolvido em HTML, JavaScript puro e TailwindCSS.

---

## 🚀 Funcionalidades

### 🔍 1. Simulação de Materiais
- Escolha um produto (ex: "Munição de Pistola", "Explosivo", "C4", etc.)
- Insira a quantidade desejada
- Visualize os materiais necessários com valores no padrão brasileiro (ex: 1.000,00)

### 🧠 2. Lógica Inteligente para Munição
- Cada 1 unidade equivale a 30 munições
- Materiais só são somados ao **ultrapassar** múltiplos de 30
- Exemplos:
  - `30` munições → ❌ não soma
  - `31` munições → ✅ soma 1 pack
  - `61` munições → ✅ soma 2 packs

### ➕ 3. Lista de Materiais
- Acumula os materiais adicionados
- Permite remover itens individualmente
- Exibe total formatado com separadores ou `R$`

### 📄 4. Exportação para PDF
- Geração automática de PDF com:
  - Materiais totais
  - Produtos selecionados

### 🔁 5. Persistência Local
- Salva os dados com `localStorage` entre sessões

---

## 📥 Baixar esta versão

[⬇️ Clique aqui para baixar o ZIP da versão v1.0.0](https://github.com/Jessica-Silvaj/CalculadoraFarm/archive/refs/tags/v1.0.0.zip)

---

## 🛠 Como usar

1. Baixe e **descompacte o arquivo ZIP**
2. Abra o `index.html` em um navegador
3. Use a interface:
   - Selecione o produto
   - Digite a quantidade e clique em 🔍 "Pesquisar"
   - Clique em ➕ "Adicionar Materiais" para montar sua lista
   - Exporte em 📄 PDF se desejar

---

## 📌 Observações

- Valores seguem o padrão brasileiro
- "Dinheiro Sujo" usa formatação monetária (`R$`)
- Materiais de munição só são somados ao **ultrapassar múltiplos de 30**