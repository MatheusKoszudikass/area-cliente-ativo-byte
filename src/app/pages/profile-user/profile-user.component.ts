import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserValidators } from '../../validators/user/user.validators';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {

  public userValidators = inject(UserValidators);

  submitForm() {
  }
}
