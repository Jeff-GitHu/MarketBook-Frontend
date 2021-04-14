import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  stateUser: boolean;
  userSubscription: Subscription;

  constructor(private SecurityService: SecurityService) {}

  ngOnInit(): void {
    this.userSubscription = this.SecurityService.securityChange.subscribe(
      (status) => {
        this.stateUser = status;
      }
    );
  }

  onCloseMenu() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logOut() {
    this.onCloseMenu();
    this.SecurityService.logout();
  }
}
