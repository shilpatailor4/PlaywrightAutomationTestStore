import path from "path";
import { csvReader } from "../utils/csvReader";
import { readExcel } from "../utils/excelReader";
import fs from "fs";

export function readData(filePath: string, sheetName?: string) {
  const ext = path.extname(filePath).toLocaleLowerCase();

  switch (ext) {
    case ".csv":
      console.log(".. I am reading a CSV file..");
      return csvReader(filePath);

    case ".xlsx":
      console.log(".. I am reading an Excel file..");
      return readExcel(filePath, sheetName || "Sheet1");

    case ".json":
      console.log(".. I am reading a JSON file..");
      const jsonData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(jsonData);

    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}
