import { SubscriptionService } from './subscription.service';
import { Subscription } from 'rxjs';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(() => {
    service = new SubscriptionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append subscription', () => {
    const fakeSubscription = new Subscription();
    service.append('newKey', fakeSubscription);
    service.append('newKey', [fakeSubscription]);
    const spyOnUnsubscribe = spyOn(fakeSubscription, 'unsubscribe').and.returnValue();
    service.ngOnDestroy();
    expect(spyOnUnsubscribe).toHaveBeenCalled();
  });
});
