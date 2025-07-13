/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { IOrganization, IUser } from '@/types';
import moment from 'moment';

// Define column mappings for both CSV and PDF exports
const columns: Record<string, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  'category.name': 'Category',
  'subCategory.name': 'Sub Category',
  createdAt: 'Joined Date',
  lastLogin: 'Last Login',
};

// Format date consistently for both CSV and PDF
const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  return moment(date).format('MMMM D, YYYY');
};

// Safely get nested or direct property values
const getValue = (item: IUser, key: string): string => {
  try {
    if (key.includes('.')) {
      const [obj, prop] = key.split('.');
      const value = (item as any)[obj]?.[prop];
      return value ?? '';
    }
    const value = (item as any)[key];
    if (key.toLowerCase().includes('date') || key === 'lastLogin') {
      return formatDate(value);
    }
    if (key.toLowerCase().includes('date') || key === 'createdAT') {
      return formatDate(value);
    }
    return value ?? '';
  } catch {
    return '';
  }
};

export const handleExport = (
  format: 'csv' | 'pdf',
  data: IUser[],
  organization: IOrganization
): void => {
  try {
    if (format === 'csv') {
      exportToCSV(data);
    } else {
      exportToPDF(data, organization);
    }
  } catch (error) {
    console.error('Export error:', error);
    toast.error(
      error instanceof Error ? error.message : 'Error exporting data'
    );
  }
};

const exportToCSV = (data: IUser[]): void => {
  // Map data to include user-friendly headers and formatted values
  const csvData = data.map((item) => {
    const result: Record<string, string> = {};
    Object.keys(columns).forEach((key) => {
      result[columns[key]] = getValue(item, key);
    });
    return result;
  });

  // Explicitly define fields to ensure correct header order
  const csv = Papa.unparse(csvData, {
    columns: Object.values(columns),
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link); // Ensure link is in DOM for some browsers
  link.click();
  document.body.removeChild(link); // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100); // Delay revocation
  toast.success('Data exported successfully as CSV');
};

const exportToPDF = (data: IUser[], organization: IOrganization): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const logoUrl = organization.logo ?? '';
  const logoWidth = 30;
  const logoHeight = 30;

  const continueWithPDFGeneration = () => {
    try {
      // Add organization name
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text(`${organization.name} Users`, 14, 40);

      // Generate table
      autoTable(doc, {
        head: [Object.values(columns)],
        body: data.map((item) =>
          Object.keys(columns).map((key) => getValue(item, key))
        ),
        startY: 50,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          minCellHeight: 10,
        },
        columnStyles: {
          0: { cellWidth: 20 }, // Name
          1: { cellWidth: 25 }, // Name
          2: { cellWidth: 30 }, // Category
          3: { cellWidth: 40 }, // Created At
          4: { cellWidth: 40 }, // Last Login
          5: { cellWidth: 30 }, // SubCategory
        },
        headStyles: {
          fillColor: [3, 175, 105],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Add page numbers
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

      const fileName = `${organization.name}_users.pdf`;
      doc.save(fileName);
      toast.success('Data exported successfully as PDF');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Error generating PDF'
      );
    }
  };

  if (logoUrl) {
    const img = new Image();
    img.src = logoUrl;
    img.crossOrigin = 'Anonymous'; // Handle cross-origin issues
    img.onload = () => {
      try {
        doc.addImage(logoUrl, 'PNG', 10, 10, logoWidth, logoHeight);
        continueWithPDFGeneration();
      } catch (error) {
        console.error('Image loading error:', error);
        doc.setFontSize(20);
        doc.setTextColor(3, 175, 105);
        doc.text(organization.name, 14, 20);
        continueWithPDFGeneration();
      }
    };
    img.onerror = () => {
      console.error('Failed to load logo:', logoUrl);
      doc.setFontSize(20);
      doc.setTextColor(3, 175, 105);
      doc.text(organization.name, 14, 20);
      continueWithPDFGeneration();
    };
  } else {
    doc.setFontSize(20);
    doc.setTextColor(3, 175, 105);
    doc.text(organization.name, 14, 20);
    continueWithPDFGeneration();
  }
};
