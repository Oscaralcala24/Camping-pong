import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl,FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-crear-usuario-admin',
  templateUrl: './crear-usuario-admin.component.html',
  styleUrls: ['./crear-usuario-admin.component.scss']
})
export class CrearUsuarioAdminComponent implements OnInit{
  constructor( private authService: AuthService, private router : Router, private fb: FormBuilder){
    this.reactiveForm() 
  }

  registerForm: FormGroup;

  

  ngOnInit():void {
    
  }

  reactiveForm() {
      this.registerForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8,8}[A-Za-z]$'), Validators.required]),
      nickname: new FormControl('', [Validators.pattern('^[a-zA-Z0-9]+$'),Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),  
      password: new FormControl(this.generaCadenaAleatoria()), 
      telefono: new FormControl(100000000),
      tipo_usuario: new FormControl('')
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.registerForm.controls[control].hasError(error);
  }

  signUp(){
    
    let user = {
      nombre : this.registerForm.get("nombre").value,
      apellidos : this.registerForm.get("apellidos").value,
      dni : this.registerForm.get("dni").value,
      nickname : this.registerForm.get("nickname").value,
      email : this.registerForm.get("email").value,
      contrasena : this.registerForm.get("password").value,
      telefono: this.registerForm.get("telefono").value,
      role: this.registerForm.get("tipo_usuario").value,
    }
    console.log(user)

    this.authService.signUp(user).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err),
    )
  }


  generaCadenaAleatoria(): string {
    let n = 10;
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
}
