import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  constructor( private authService: AuthService, private router : Router){}
  hide = true;
  hide2 = true;
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    apellidos: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    dni: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    nickname: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    contrasena2: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required,)
  });
  ngOnInit():void {
    
  }

  signUp(){
    console.log(this.registerForm.value)
    this.authService.signUp(this.registerForm.value).subscribe(
      res => {
        if (res.status === 201){
          localStorage.setItem('token', res.token)
          this.router.navigate(['/'])
        }else{
          this.router.navigate(['/register'])
          alert("error")
        }
        
      },
      err => console.log(err),
    )
  }


}
