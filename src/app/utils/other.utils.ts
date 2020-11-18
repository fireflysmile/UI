/**
 * run something only for IE
 * @param callback callback function
 */
import {Renderer2} from '@angular/core';
import { CommonHash } from '../models/common-hash';
import { jsPDF } from 'jspdf';

export function onlyForIE(callback: any): void {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}

/**
 * run something only for none IE
 * @param callback callback function
 */
export function onlyForNoneIE(callback: any): void {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
  } else {
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}

/**
 * download csv
 * the renderer and injected document should be passed as parameters
 * @param document injected document
 * @param renderer renderer
 * @param filename filename
 * @param content content
 */
export function downloadCSV(document: Document, renderer: Renderer2, filename: string, content: string): void {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // for IE
    window.navigator.msSaveOrOpenBlob(new Blob([decodeURIComponent(content)], {
      type: 'text/csv;charset=utf8'
    }), filename);
  } else if (window.Blob && window.URL) {
    // HTML5 Blob
    const url = URL.createObjectURL(new Blob([content], {type: 'text/csv;charset=utf8'}));
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    renderer.appendChild(document.body, a);

    a.click();

    renderer.removeChild(document.body, a);
  }
}

/**
 * sum array data with reduce method
 * @param previous previous value
 * @param current current value
 */
export function sum(previous: number, current: number): number {
  return (previous || 0) + current;
}

export type DownloadType = 'csv' | 'doc' | 'pdf' | 'txt' | 'xls';

export function exportTypeFrom2DArray(filename: string, content: string, type: string) {

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // for IE
    window.navigator.msSaveOrOpenBlob(new Blob([decodeURIComponent(content)], {
      type: `text/${type};charset=utf8`
    }), filename);
  } else if (window.Blob && window.URL) {
    const url = URL.createObjectURL(new Blob([content], {type: `text/${type};charset=utf8`}));
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', url);
    a.setAttribute('download', filename || `document.${type}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

// export pdf file from 2d array
export function exportPdfFrom2DArray(array2d: [[]], filename: string) {

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  function createHeaders(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width': 65,
      'align': 'center',
      'padding': 0
    }));
  }

  const data = array2d.slice(1).map( x => {
    const obj: any = {};
    for (let i = 0; i < x.length; i++) {
      obj[array2d[0][i]] = x[i] + '';
    }
    return obj;
  });

  const header = createHeaders(array2d[0]);

  doc.text('Pie data!', 10, 10);
  doc.table(1, 1, data, header, null);
  doc.save(`${filename}.pdf`);
}

// export text file from 2d array
export function exportTextFrom2DArray(array2d: [[]], filename: string) {
  let csv = '';
  for (const item of array2d) {
    let cc = '';
    for (const sub of item) {
      cc += sub + ',';
    }
    csv += cc + '\r\n';
  }
  exportTypeFrom2DArray(filename, csv, 'txt');
}

// export csv file from 2d array
export function exportCSVFrom2DArray(array2d: [[]], filename: string) {
  let csv = '';
  for (const item of array2d) {
    let cc = '';
    for (const sub of item) {
      cc += sub + ',';
    }
    csv += cc + '\r\n';
  }
  exportTypeFrom2DArray(filename, csv, 'csv');
}

// export ms doc file from 2d array
export function exportDocFrom2DArray(array2d: [[]], filename: string) {
    const header = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' ' +
         'xmlns:w=\'urn:schemas-microsoft-com:office:word\' ' +
         'xmlns=\'http://www.w3.org/TR/REC-html40\'>' +
         '<head><meta charset=\'utf-8\'><title>Export HTML to Word Document with JavaScript</title></head><body>';
    const footer = '</body></html>';

    let sh = '';
    let sd = '';
    for (const item of array2d[0]) {
      sh += `<th> ${item} </th>\n`;
    }
    for (const item of array2d.slice(1) ) {
      let sdd = '';
      for (const sub of item) {
        sdd += `<td> ${sub} </td>`;
      }
      sd += `
        <tr>
        ${sdd}
        </tr>
      `;
    }
    const html = `
    <table>
      <tr>
        ${sh}
      </tr>
        ${sd}
    </table>
    `;

    const sourceHTML = header + html + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename || 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);

}


interface ExportFileFrom2DArrayOptions {
  type: DownloadType;
  filename?: string;
}
/**
 * export table data from shape of [[]]
 * @param type : file type
 * @param data : 2d array data
 * @param filename :
 */
export function exportFileFrom2DArray( data: [[]], options: ExportFileFrom2DArrayOptions) {
  const { type, filename } = options;
  if ( type === 'doc') {
    exportDocFrom2DArray(data, filename);
  } else if (type === 'csv') {
    exportCSVFrom2DArray(data, filename);
  } else if (type === 'txt') {
    exportTextFrom2DArray(data, filename);
  } else if (type === 'pdf') {
    exportPdfFrom2DArray(data, filename);
  }
}
