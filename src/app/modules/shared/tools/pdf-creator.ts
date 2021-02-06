import jsPDF from 'jspdf';
import 'jspdf-autotable'

export class PdfCreator {

    public static CrearPDF(columnas: string[], titulo: string, filas: any, mostrarGuardar?: boolean, abrirEnNavegador?: boolean) {

        let documentoPDF = new jsPDF();

        let posicionX = this.getCentroHorizontalPDF(18, titulo, documentoPDF);

        documentoPDF.setFontSize(18);
        documentoPDF.text(titulo, posicionX, 15);

        let logo = new Image();
        logo.src = 'assets/connombre.jpg';
        documentoPDF.addImage(logo, 'jpg', 175, 5, 20, 18);

        documentoPDF.setFontSize(11);
        documentoPDF.setTextColor(100);

        (documentoPDF as any).autoTable({
            head: [columnas],
            body: filas,
            theme: 'striped',
            startY: 28,
            showHead: 'everyPage',
            didDrawCell: data => {
                console.log(data.column.index)
            }
        });

        this.agregarFooterAlPDF(documentoPDF);

        // Open PDF document in new tab
        if (abrirEnNavegador) {
            documentoPDF.output('dataurlnewwindow');
        }

        let opcionesFormatoFecha = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let fechaActual: Date = new Date;
    
        let fechaString = fechaActual.toLocaleDateString("es-AR", opcionesFormatoFecha);
        
        // Download PDF document  
        if (mostrarGuardar) {
            documentoPDF.save(`${titulo} ${fechaString}.pdf`);
        }

    }

    static getCentroHorizontalPDF(fontSize: number, texto: string, documento): number {
        let textWidth = documento.getStringUnitWidth(texto) * fontSize / documento.internal.scaleFactor;
        return (documento.internal.pageSize.width - textWidth) / 2;
    }

    static agregarFooterAlPDF(documento) {

        const pageCount = documento.getNumberOfPages();
        documento.setFont('helvetica', 'italic');
        documento.setFontSize(12);

        let opcionesFormatoFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        let fechaActual: Date = new Date;
    
        let fechaString = fechaActual.toLocaleDateString("es-AR", opcionesFormatoFecha);

        for (var i = 1; i <= pageCount; i++) {
            documento.setPage(i)

            let texto = `${fechaString} - Página ${i} de ${pageCount}`;
            documento.text(texto, documento.internal.pageSize.width / 2, 287, { align: 'center' });
        }
    }

}


