import {isDefined} from '../../utils/validation.util';
import {delay} from 'rxjs/operators';
import {MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

const {
  apiHost,
} = environment;

export interface UnrefinedParams {
  [key: string]: any;
}

export class ApiBaseService {
  // endpoint base url
  protected readonly endpointBase: string;
  // api host
  protected readonly host: string = apiHost;
  // api delay
  protected readonly delay: number;

  constructor(
    path: string,
  ) {
    this.endpointBase = this.host + path;
  }

  /**
   * get api endpoint
   * @param path path
   */
  protected endpoint(path = ''): string {
    return this.endpointBase + path;
  }

  /**
   * create http params from object type params
   * @param params params
   */
  protected getHttpParams(params: UnrefinedParams): { [k: string]: string } {
    const refined: { [k: string]: string } = {};

    Object.keys(params || {}).forEach(key => {
      if (isDefined(params[key])) {
        refined[key] = params[key] + '';
      }
    });

    return refined;
  }

  /**
   * return parameter as fake response
   * @param data data
   * @param useDelay
   * set false to don't use delay
   * default is `true`
   */
  protected getFakeResponse<T>(data: T, useDelay = true): Observable<T> {
    const observable = of(data);

    return useDelay ? observable.pipe(delay(this.delay || 0)) : observable;
  }

  /**
   * call this method form the pipe parameter to attach delay
   * @param milliseconds milliseconds to set delay
   */
  protected attachDelay<T>(milliseconds?: number): MonoTypeOperatorFunction<T> {
    return delay<T>(milliseconds || this.delay);
  }
}
