import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (expenses, incomes, exportType) => {
  const wb = XLSX.utils.book_new();

  if (exportType === 'Expenses' || exportType === 'Both') {
    const wsExpenses = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(wb, wsExpenses, 'Expenses');
  }

  if (exportType === 'Incomes' || exportType === 'Both') {
    const wsIncomes = XLSX.utils.json_to_sheet(incomes);
    XLSX.utils.book_append_sheet(wb, wsIncomes, 'Incomes');
  }

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const buf = new ArrayBuffer(wbout.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < wbout.length; ++i) view[i] = wbout.charCodeAt(i) & 0xff;
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'budget_data.xlsx');
};
