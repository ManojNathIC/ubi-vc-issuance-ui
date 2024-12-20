import { Injectable } from '@angular/core';
import { GeneralService } from '../general/general.service';
import * as Papa from "papaparse";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  fileName: string;

  constructor(private generalService: GeneralService) { }

  /**
   * Fetch Schema for CSV template
   */
  getTemplateSchema(id: string) {
    if (id.length < 1) {
      throwError(() => new Error('Id is missing'));
    }

   // return this.generalService.getData(`https://ulp.uniteframework.io/ulp-bff/v1/sso/student/credentials/schema/json/${id}`, true);
    // return this.generalService.getData(`https://ulp.uniteframework.io/cred-schema/schema/jsonld?id=${id}`, true);
  }

  downloadCSVTemplate(csvContent: string, name : string) {
    console.log(name);
    if(name =='bcece'){
      this.fileName = 'upper_basic_template_to_upload.csv'
    }else if (name == 'middle basic'){
       this.fileName = 'middle_basic_template_to_upload.csv'
    }else {
      this.fileName = name;
    }
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = this.fileName;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  generateCSV(columns: string[], data = [], fileName: string = 'template.csv') {
    if (columns.length < 1) {
      return;
    }

    return Papa.unparse({ data, fields: columns });
  }
}
