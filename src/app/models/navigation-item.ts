import {CmSidebarNavIcon} from '../components/sidebar-nav-item/sidebar-nav-item.component';

export interface NavigationItem {
  // icon
  icon: CmSidebarNavIcon;
  // label
  label: string;
  // route link
  route?: string | string[];
  // notifications
  notifications?: () => number;
  // action on click
  onClick?: () => void;
}
