import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PcCodeRule} from '../../models/pc-code-rule';
import {FileUploadResponse} from '../../models/file-upload-response';
import {randomPick} from '../../utils/random.util';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/rule');
  }

  /**
   * get pc code rules
   */
  getPcCodeRules(): Observable<PcCodeRule[]> {
    return this.getFakeResponse([
      {
        pcCode: 'PC 001',
        pcCodeLevelMargin: 4564566778226560,
        marginAmount: 2233942189220.78,
        rules: [
          {
            membersTradingPermitted: [
              {value: 'YESBK'},
              {value: 'ICICI'},
              {value: '78564'},
              {value: 'EFCL'},
            ],
            prohibitedSecurities: [
              {value: 'INE545U01014 BANDHANBNK'},
              {value: 'INE028A01039 BANKBARODA'},
              {value: 'INE463A01038 BERGEPAINT'},
              {value: 'INE376G01013 BIOCON'},
            ],
          }
        ]
      },
      {
        pcCode: 'PC 002',
        pcCodeLevelMargin: 4564566778226560,
        marginAmount: 2233942189220.78,
        rules: [
          {
            membersTradingPermitted: [
              {value: 'YESBK'},
              {value: 'ICICI'},
              {value: '78564'},
              {value: 'EFCL'},
            ],
            prohibitedSecurities: [
              {value: 'INE545U01014 BANDHANBNK'},
              {value: 'INE028A01039 BANKBARODA'},
              {value: 'INE463A01038 BERGEPAINT'},
              {value: 'INE376G01013 BIOCON'},
            ],
          }
        ]
      },
    ]);
  }

  /**
   * upload rule
   * @param file file to upload
   */
  uploadRule(file: File): Observable<FileUploadResponse> {
    return this.getFakeResponse({
      total: 100,
      errors: randomPick([0, 10]),
      reasons: [
        'PC code/MT code /ISIN is invalid',
        'PC code is inactive',
        'Margin limit exceeds the Member margin',
      ]
    }).pipe(this.attachDelay(2500));
  }
}
