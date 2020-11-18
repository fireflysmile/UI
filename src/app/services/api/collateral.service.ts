import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ApiBaseService} from './api-base.service';
import { SegmentWiseUtiliztion } from 'src/app/models/segment-wise-utilization';
import { HttpClient } from '@angular/common/http';
import { Collateral } from 'src/app/models/collateral';
import { map } from 'rxjs/operators';
import { CollateralValueAnalysis } from 'src/app/models/collateral-value-analysis';
import { ValueBasedExcess } from 'src/app/models/value-based-excess';
import { ByInstrumentType } from 'src/app/models/by-instrument-type';
import { MaturityTimeline } from 'src/app/models/maturity-timeline';
import * as _ from 'lodash';
import { CollateralDetailsItem } from 'src/app/models/collateral-details-item';
import { CollateralExcessDetailsItem } from 'src/app/models/collateral-excess-details-item';
import { DetailedValueBasedExcess } from 'src/app/models/detailed-value-based-excess';
import { instrumentTypeConstants } from 'src/app/utils/constants';
import { InstrumentLevelDetail } from 'src/app/models/Instrument-level-detail';

@Injectable({
  providedIn: 'root'
})
export class CollateralService extends ApiBaseService {

  nonSecuritiesTableData: CollateralDetailsItem[];
  maturityTimelineData: MaturityTimeline[];

  constructor(
    private http: HttpClient,
  ) {
    super('/collateral');
  }

  postProcess(inp: any, options: any) {
    let dataInp = _.cloneDeep(inp);
    function randomNumber(data) {
      if (_.isNumber(data)) {
        if (options && options.numberIsPercent) {
          return Math.max(0, Math.floor(Math.random() * 100));
        }
        return Math.max(10, Math.floor(Math.random() * 500));
      } else if (_.isObject(data)) {
        // @ts-ignore
        for (const k of Object.keys(data)) {
          data[k] = randomNumber(data[k]);
        }
        return data;
      } else if (_.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          data[i] = randomNumber(data[i]);
        }
        return data;
      } else {
        return data;
      }
    }

    if (options && options.random) {
      dataInp = randomNumber(dataInp);
    }
    return dataInp;
  }

  /**
   * Get segment wise utilization
   */
  getSegmentWiseUtilization(): Observable<SegmentWiseUtiliztion> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
      .pipe(
        map( x => this.postProcess(x.segmentWiseUtilization, {random: true, numberIsPercent: true}) )
      );
  }

  /**
   * Get collateral value anaylsis
   */
  getCollateralValueAnalysis(segment: string): Observable<CollateralValueAnalysis> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
    .pipe(
      map( x => this.postProcess(x.collateralValueAnalysis, {random: true}))
    );
  }

  /**
   * Get detail according to instrument type
   */
  getInstrumentLevelDetail(instrumentType: string): Observable<InstrumentLevelDetail> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
    .pipe(
      map( x => {
        let r = _.cloneDeep(x.instrumentLevelDetail);
        r.name = instrumentType;
        r.type = instrumentTypeConstants[r.name].category;
        r = this.postProcess(r, {random: true});
        return r;
      })
    );
  }

  /**
   * Value-based excess across segment
   */
  getValueBasedExcess(): Observable<ValueBasedExcess[]> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
    .pipe(
      map( x => this.postProcess(x.valueBasedExcess,  {random: true}))
    );
  }

  /**
   * Get pie chart data for by-instrument-type area
   */
  getByInstrumentType(segment: string): Observable<ByInstrumentType> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
    .pipe(
      map( x => this.postProcess(x.byInstrumentType, {random: true}) )
    );
  }

  /**
   * Get maturity timeline data
   */
  getMaturityTimeline(): Observable<MaturityTimeline[]> {
    let data: MaturityTimeline[] = [];
    if (!this.maturityTimelineData) {
      const today = new Date();
      let cd;

      for (let i = -1; i < 6; i++) {
        cd = _.cloneDeep(today);
        cd.setDate(cd.getDate() + 1);
        data.push({
          expiredAt: cd.toISOString(),
          instrument: 'INR',
          value: 100
        });
      }

      cd = _.cloneDeep(today);
      cd.setDate(cd.getDate() + 15);
      data.push({
        expiredAt: cd.toISOString(),
        instrument: 'INR',
        value: 100
      });

      cd = _.cloneDeep(today);
      cd.setDate(cd.getDate() + 31);
      data.push({
        expiredAt: cd.toISOString(),
        instrument: 'INR',
        value: 100
      });
    } else {
      data = this.maturityTimelineData;
    }

    return of(data);
  }

  generateMaturityTime(x: CollateralDetailsItem, i: number): MaturityTimeline {
    const today = new Date();
    if (i < 1) {
      const cd = _.cloneDeep(today);

      if (Math.random() > 0.5) {
        cd.setDate(cd.getDate() - 1);
        x.maturityDate = cd.toISOString();
        return ({
          expiredAt: cd.toISOString(),
          phase: 'history',
          value: 100
        });
      }
      return;
    }

    if (i < 2) {
      const cd = _.cloneDeep(today);
      x.maturityDate = cd.toISOString();
      return ({
        expiredAt: cd.toISOString(),
        phase: 'today',
        value: 100
      });
    }

    if (i < 8) {
      const cd = _.cloneDeep(today);
      cd.setDate(cd.getDate() + i - 1);
      x.maturityDate = cd.toISOString();
      return ({
        expiredAt: cd.toISOString(),
        phase: 'twoWeeks',
        value: 100
      });
    }

    if (i < 9) {
      const cd = _.cloneDeep(today);
      cd.setDate(cd.getDate() + 15);
      return ({
        expiredAt: cd.toISOString(),
        phase: 'month',
        value: 100
      });
    }

    if (i < 10) {
      let cd = _.cloneDeep(today);
      cd = _.cloneDeep(today);
      cd.setDate(cd.getDate() + 31);
      return ({
        expiredAt: cd.toISOString(),
        phase: 'onwards',
        value: 100
      });
    }

  }


  /**
   *  return a random index represented by a array
   */
  randomChoiceArrayIndex(nu: number): number {
    return Math.min(Math.floor(Math.random() * nu), nu - 1);
  }
  /**
   * generate random data, focus on instrument type and segment
   */
  generateTableData(x: any): void {
    const segments = ['MC', 'OF', 'DC', 'OC', 'BLS'];
    let rindex = this.randomChoiceArrayIndex(segments.length);
    x.segment = segments[rindex];
    const itKeys = Object.keys(instrumentTypeConstants);
    rindex = this.randomChoiceArrayIndex(itKeys.length);
    x.instrumentType = itKeys[rindex];
  }

  /**
   * Get non-security detailed collateral
   */
  getCollateralDetailsNonSecurity(): Observable<CollateralDetailsItem[]> {
    return this.http.get<CollateralDetailsItem[]>(this.endpoint('/collateralDetailsNonSecurity.json'))
    .pipe(
      map( x => {
        this.maturityTimelineData = [];
        for (let i = 0; i < 20; i++) {
          const m = _.cloneDeep(x[0]);
          this.generateTableData(m);
          const md = this.generateMaturityTime(m, i);
          if (md) {
            this.maturityTimelineData.push(md);
          }
          x.push(m);
          this.nonSecuritiesTableData = x;
        }
        return x;
      } )
    );
  }

  /**
   * Get security detailed collateral
   */
  getCollateralDetailsSecurity(): Observable<CollateralDetailsItem[]> {
    return this.http.get<CollateralDetailsItem[]>(this.endpoint('/collateralDetailsSecurity.json'))
    .pipe(
      map( x => {
        for (let i = 0; i < 20; i++) {
          const m = _.cloneDeep(x[0]);
          this.generateTableData(m);
          x.push(m);
        }
        return this.postProcess(x, {random: true});
      } )
    );
  }

  /**
   * Get collateral Excess Details
   */
  getCollateralExcessDetails(): Observable<CollateralExcessDetailsItem[]> {
    return this.http.get<CollateralExcessDetailsItem[]>(this.endpoint('/collateralExcessDetails.json'))
    .pipe(
      map( x => {
        for (let i = 0; i < 50; i++) {
          const m = _.cloneDeep(x[0]);
          this.generateTableData(m);
          x.push(m);
        }
        return this.postProcess(x, {random: true});
      })
    );
  }

  /**
   * Get detailed Value Based Excess in detailed collateral screen
   */
  getDetailedValueBasedExcess(segment): Observable<DetailedValueBasedExcess> {
    return this.http.get<Collateral>(this.endpoint('/collateral.json'))
    .pipe(
      map( x => this.postProcess(x.detailedValueBasedExcess, {random: true}) )
    );
  }


}
