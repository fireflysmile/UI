import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/components/app.service';
import { UserInfoRole } from '../../models/user-info-item';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {}

  /**
   * set user with specific role
   * @param role role
   * @param enabled enabled state
   * @param checker checker state
   */
  setUser(role: UserInfoRole, enabled = true, checker = false): void {
    this.appService.userInfo = {
      role,
      enabled,
      checker,
    };
  }
}
