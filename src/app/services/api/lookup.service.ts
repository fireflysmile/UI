import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberInfoItem } from '../../models/member-info-item';
import { OfficialInfoItem } from '../../models/official-info-item';

@Injectable({
  providedIn: 'root',
})
export class LookupService extends ApiBaseService {
  constructor(private httpClient: HttpClient) {
    super('/lookup');
  }

  /**
   * get member names
   */
  getMembers(): Observable<MemberInfoItem[]> {
    const data: MemberInfoItem[] = [
      { name: 'Motilaloswal', code: '19034', type: 'TM' },
      { name: 'Rajesh Shukla', code: '19033', type: 'PCM' },
      { name: 'Edelweiss', code: '12312', type: 'TM' },
      { name: 'Abhijeet Pingale', code: '12412', type: 'PCM' },
      { name: 'A1 Finance', code: '54656', type: 'RCM' },
    ];

    return this.getFakeResponse(data);
  }

  getROEmployees(): Observable<OfficialInfoItem[]> {
    const data: OfficialInfoItem[] = [
      { id: '1', name: 'Abhishek Gusain' },
      { id: '2', name: 'Rajendra Mukherjee' },
      { id: '3', name: 'Kanganna Rannaut' },
    ];

    return this.getFakeResponse(data, false);
  }

  /**
   * get member types
   */
  getMemberTypes(): Observable<string[]> {
    const data: string[] = ['TM', 'PCM', 'RCM'];

    return this.getFakeResponse(data);
  }

  /**
   * get request types
   */
  getRequestTypes(): Observable<string[]> {
    const data: string[] = [
      'Change in SHP',
      'Change in Director',
      'Annual Return',
    ];

    return this.getFakeResponse(data);
  }

  /**
   * get request types
   */
  getApplicationRequestTypes(): Observable<string[]> {
    const data: string[] = [
      'Kcar Activation',
      'Kcar Surrender',
      'PI Activation',
      'PI Surrender',
      'CON for P2P connectivety',
    ];

    return this.getFakeResponse(data);
  }

  /**
   * get available application ids
   */
  getAvailableApplicationIds(): Observable<string[]> {
    const data: string[] = [
      '123456',
      '123457',
      '123458',
      '123459',
      '123460',
      '123461',
      '123462',
      '123463',
      '123464',
      '123465',
      '123466',
      '123467',
      '123468',
      '123469',
      '123470',
      '123471',
      '123472',
      '123473',
      '123474',
      '123475',
      '123476',
      '123477',
      '123478',
      '123479',
      '123480',
      '123481',
      '123482',
      '123483',
      '123484',
      '123485',
      '123486',
      '123487',
      '123488',
      '123489',
      '123490',
      '123491',
      '123492',
      '123493',
      '123494',
      '123495',
      '123496',
      '123497',
      '123498',
      '123499',
      '123500',
      '123501',
      '123502',
      '123503',
      '123504',
      '123505',
      '123506',
      '123507',
      '123508',
      '123509',
      '123510',
      '123511',
      '123512',
      '123513',
      '123514',
      '123515',
      '123516',
      '123517',
      '123518',
      '123519',
      '123520',
      '123521',
      '123522',
      '123523',
      '123524',
      '123525',
      '123526',
      '123527',
      '123528',
      '123529',
      '123530',
      '123531',
      '123532',
      '123533',
      '123534',
      '123535',
      '123536',
      '123537',
      '123538',
      '123539',
      '123540',
      '123541',
      '123542',
      '123543',
      '123544',
      '123545',
      '123546',
      '123547',
      '123548',
      '123549',
      '123550',
      '123551',
      '123552',
      '123553',
      '123554',
      '123555',
    ];

    return this.getFakeResponse(data);
  }

  /**
   * get available assignees
   */
  getAvailableAssignees(): Observable<string[]> {
    return this.getFakeResponse(['Rahul Jain', 'Akash Mehra', 'Rajesh Kumar']);
  }

  /**
   * get available officials
   */
  getAvailableOfficials(): Observable<string[]> {
    return this.getFakeResponse(['DRO', 'DRO(HO)', 'HO', 'CRO', 'WRO']);
  }

  /**
   * get available pc codes
   */
  getAvailablePCCodes(): Observable<string[]> {
    const codes = [];

    for (let i = 0; i < 10; i++) {
      codes.push(`CITI0${2029091 + i}`);
    }

    return this.getFakeResponse(codes);
  }
}
