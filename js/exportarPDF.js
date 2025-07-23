function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Lista de Materiais", 105, 15, { align: "center" });

    // Materiais - tabela formatada
    const materiaisData = Object.entries(listaMateriais).map(([item, total]) => [item, total]);

    doc.autoTable({
        head: [["Item", "Total"]],
        body: materiaisData,
        startY: 25,
        theme: 'striped',
        headStyles: {
            fillColor: [59, 130, 246], // azul Tailwind
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left'
        },
        styles: {
            halign: 'left',
            fontSize: 11,
            cellPadding: 4,
        },
    });

    // Produtos selecionados
    const produtosY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text("Produtos Selecionados", 10, produtosY);

    const produtosData = Object.entries(produtosSelecionados).map(
        ([produto, qtd]) => [`${produto}`, `${qtd}x`]
    );

    doc.autoTable({
        head: [["Produto", "Quantidade"]],
        body: produtosData,
        startY: produtosY + 5,
        theme: 'grid',
        styles: {
            fontSize: 11,
            halign: 'left'
        },
        headStyles: {
            fillColor: [16, 185, 129], // verde Tailwind
            textColor: [255, 255, 255],
            fontStyle: 'bold',
        },
    });

    // Salva
    doc.save("lista_de_materiais.pdf");
}
