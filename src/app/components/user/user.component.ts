import { Component, OnInit, Input } from '@angular/core';
import { UserLightDto } from 'src/app/shared-data/user-light-dto';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/shared-data/user-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: UserLightDto = { id: '', login: '', active: false };

  userForm: FormGroup;
  globals: Globals;

  loginInForm: string;
  message: string;

  @Input() userVerif: UserDto;


  constructor(private fb: FormBuilder,
              globals: Globals,
              private router: Router,
              private userService: UserService) {
    this.globals = globals;
   }

  ngOnInit() {
    this.userForm = new FormGroup({
      login : new FormControl()
    });

    this.globals.getCurrentUser().subscribe(
      data => { this.userForm = this.fb.group({ login: [data, [Validators.required, Validators.maxLength(25)]] });
                console.log(this.userForm.value);
      }
    );
  }

   logUser() {

    this.loginInForm = this.userForm.get('login').value;
    this.message = ``;

    const userValidityTest = new RegExp(/([^A-Za-z0-9])/);
    if (userValidityTest.test (this.loginInForm) || this.loginInForm === '' || this.loginInForm == null)
        {alert ('Vous devez saisir un nom d\'utilisateur alphanumérique');
         this.globals.setCurrentUser(null);
      } else {

    this.userService.getOneUserByLogin(this.loginInForm).subscribe( loginInDB => { if (loginInDB !== null) {
        this.globals.setCurrentUser(this.loginInForm);
        this.message = `Vous êtes désormais connecté en tant que ${this.loginInForm}`; } },
        error => {alert (`Le login ${this.loginInForm} n\'existe pas`);
                  this.globals.setCurrentUser(null); });
  }
    this.router.navigate(['/']);
}

}
