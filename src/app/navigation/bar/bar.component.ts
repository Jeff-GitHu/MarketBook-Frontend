import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit, OnDestroy {
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

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logOut() {
    this.SecurityService.logout();
  }
}
