import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { NewRequest } from '../../models/admin-request-item';
import { MemberInfoItem } from '../../models/member-info-item';
import { LookupService } from '../../services/api/lookup.service';
import { SubscriptionService } from '../../services/subscription/subscription.service';


@Component({
  selector: 'app-start-new-request',
  templateUrl: './start-new-request.component.html',
  styleUrls: ['./start-new-request.component.scss']
})
export class StartNewRequestComponent implements OnInit {

  // start request
  @Output() startRequest: EventEmitter<NewRequest> = new EventEmitter();
  // form group
  group: FormGroup = new FormGroup({
    memberName: new FormControl('', Validators.required),
    memberCode: new FormControl('', Validators.required),
    memberType: new FormControl({ value: '', disabled: true }, Validators.required)
  });
  members: MemberInfoItem[];
  // member names
  memberNames: string[] = [];
  // member codes
  memberCodes: string[] = [];
  // member types
  memberTypes: string[] = [];

  constructor(
    private lookupService: LookupService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getLookups();

    // listen to member name value change
    this.memberName.valueChanges.subscribe(value => {
      this.onMemberNameChange(value);
    });

    // listen to member code value change
    this.memberCode.valueChanges.subscribe(value => {
      this.onMemberCodeChange(value);
    });

  }

  get memberName(): FormControl | AbstractControl {
    return this.group.get('memberName');
  }

  get memberCode(): FormControl | AbstractControl {
    return this.group.get('memberCode');
  }

  get memberType(): FormControl | AbstractControl {
    return this.group.get('memberType');
  }

  /**
   * get lookups for application filter
   */
  private _getLookups(): void {
    const sub = combineLatest([
      this.lookupService.getMembers(),
      this.lookupService.getMemberTypes(),
    ]).subscribe(res => {
      this.members = [ ...(res[0] || []) ];
      this.memberNames = (res[0] || []).map(item => item.name);
      this.memberCodes = (res[0] || []).map(item => item.code);
      this.memberTypes = res[1] || [];
    });

    this.subscriptionService.store('_getMemberLookups', sub);
  }

  // when member name is changed then update member code and type accordingly
  onMemberNameChange(name: string) {
    const selectedMember = this.members.find(member => member.name === name);

    if (selectedMember) {
      this.memberCode.setValue(selectedMember.code, { emitEvent: false });
      this.memberType.setValue(selectedMember.type, { emitEvent: false });
    } else {
      this.memberCode.setValue('', { emitEvent: false });
      this.memberType.setValue('', { emitEvent: false });
    }
  }

  // when member code is changed then update member name and type accordingly
  onMemberCodeChange(code: string) {
    const selectedMember = this.members.find(member => member.code === code);

    if (selectedMember) {
      this.memberName.setValue(selectedMember.name, { emitEvent: false });
      this.memberType.setValue(selectedMember.type, { emitEvent: false });
    } else {
      this.memberName.setValue('', { emitEvent: false });
      this.memberType.setValue('', { emitEvent: false });
    }
  }

}
