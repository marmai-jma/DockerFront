import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  urlForm: FormGroup;
  globals: Globals;
  constructor( private fb: FormBuilder,
               globals: Globals,
               private router: Router, ) {
    this.globals = globals;
   }

  ngOnInit() {
    this.urlForm = new FormGroup({
      urlBack : new FormControl()
    });
    this.urlForm = this.fb.group({ urlBack: [this.globals.BACKEND_URL, [Validators.required]] });
  }

  setUrlBack(){
    console.log('setUrlBack')
    this.globals.BACKEND_URL = this.urlForm.get('urlBack').value;
    console.log(this.globals.BACKEND_URL);
    this.router.navigate(['/']);
  }

}
