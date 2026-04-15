import fs from "fs";
import { parse } from "csv-parse/sync";

export function csvReader(filePath: string) {
  const fileContent = fs.readFileSync(filePath);

  const record = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return record;
}
