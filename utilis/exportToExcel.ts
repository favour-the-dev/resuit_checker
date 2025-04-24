// utils/exportToExcel.ts
import * as XLSX from "xlsx";

type SheetData = {
  [key: string]: any;
};

export function exportToExcel(data: SheetData[], filename: string = "data.xlsx") {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // 1. Create a worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 2. Create a new workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 3. Generate Excel file in array buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // 4. Create a Blob from buffer
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  // 5. Create a download link and trigger it
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
