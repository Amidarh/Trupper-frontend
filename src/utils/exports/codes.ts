import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { codeType } from '@/modules/codes/types';

// interface Category {
//     _id: string;
//     name: string;
// }

// interface SubCategory {
//     _id: string;
//     name: string;
// }

// interface codeType {
//     code: string;
//     expiresIn: string | Date;
//     category: Category;
//     subCategory: SubCategory;
//     status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
//     createdAt: string | Date;
// }

interface TableColumn {
    header: string;
    dataKey: keyof codeType | string;
    width?: number;
}

const columns: TableColumn[] = [
    { header: 'Code', dataKey: 'code' },
    { header: 'Expires In', dataKey: 'expiresIn' },
    { header: 'Category', dataKey: 'category.name' },
    { header: 'SubCategory', dataKey: 'subCategory.name' },
    { header: 'Status', dataKey: 'status' },
    // { header: 'Created At', dataKey: 'createdAt' }
];

const columnMappings: Record<string, string> = {
    code: 'Code',
    expiresIn: 'Expires In',
    'category.name': 'Category',
    'subCategory.name': 'SubCategory',
    status: 'Status',
    // createdAt: 'Created At',
};

const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getValue = (item: codeType, key: string): string => {
    if (key.includes('.')) {
        const [obj, prop] = key.split('.');
        return (item as any)[obj][prop];
    }
    const value = (item as any)[key];
    if (key.toLowerCase().includes('date') || key === 'expiresIn') {
        return formatDate(value);
    }
    return value;
};

export const handleExport = (format: 'csv' | 'pdf', data: codeType[]): void => {
    try {
        if (format === 'csv') {
            exportToCSV(data);
        } else {
            exportToPDF(data);
        }
        toast.success(`Data exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error exporting data');
    }
};

const exportToCSV = (data: codeType[]): void => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `codes_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    URL.revokeObjectURL(url);
};

const exportToPDF = (data: codeType[]): void => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    console.log("Export Data",data)
    try {
        // Add logo or text fallback
        const logoUrl = '/assets/images/logo.png';
        const logoWidth = 60;
        const logoHeight = 15;
        
        const img = new Image();
        img.src = logoUrl;
        
        img.onerror = () => {
            // If image fails to load, use text instead
            doc.setFontSize(20);
            doc.setTextColor(3, 175, 105); // Use brand color
            doc.text('eglobalsphere', 14, 20);
            continueWithPDFGeneration();
        };
        
        img.onload = () => {
            // If image loads successfully, add it
            doc.addImage(logoUrl, 'PNG', 10, 10, logoWidth, logoHeight);
            continueWithPDFGeneration();
        };

        // Separate function to continue PDF generation
        const continueWithPDFGeneration = () => {
            // Document title
            doc.setFontSize(16);
            doc.setTextColor(0); // Reset to black
            doc.text('Codes Export', 14, 40);

            // Generate table
            autoTable(doc, {
                head: [Object.values(columnMappings)],
                body: data.map(item => 
                    Object.keys(columnMappings).map(key => getValue(item, key))
                ),
                startY: 50,
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                    overflow: 'linebreak',
                    minCellHeight: 10
                },
                columnStyles: {
                    0: { cellWidth: 30 }, // ID
                    1: { cellWidth: 40 }, // Code
                    2: { cellWidth: 40 }, // Type
                    3: { cellWidth: 40 }, // Expires In
                    4: { cellWidth: 40 }, // Category

                },
                headStyles: {
                    fillColor: [3, 175, 105],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                }
            });

            // Add footer with page numbers
            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(
                    `Page ${i} of ${pageCount}`,
                    doc.internal.pageSize.width - 20,
                    doc.internal.pageSize.height - 10
                );
            }

            // Save the PDF
            const fileName = `codes_export_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
        };

    } catch (error) {
        // Fallback if any error occurs during image handling
        doc.setFontSize(20);
        doc.setTextColor(3, 175, 105);
        doc.text('eglobalsphere', 14, 20);
        // continueWithPDFGeneration();
    }
};