import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Validate } from './validation';
import { UserService } from 'src/app/service/userService/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.reactiveForm()
  }

  registerForm: FormGroup;



  ngOnInit(): void {

  }

  reactiveForm() {
    this.registerForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8,8}[A-Za-z]$'), Validators.required]),
      nickname: new FormControl('', [Validators.pattern('^[a-zA-Z0-9]+$'), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      passwordConfirm: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.pattern("^[0-9]{9}$"), Validators.required]),
    }, {
      validator: Validate.MatchPassword,
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.registerForm.controls[control].hasError(error);
  }

  signUp() {

    let user = {
      nombre: this.registerForm.get("nombre").value,
      apellidos: this.registerForm.get("apellidos").value,
      dni: this.registerForm.get("dni").value,
      nickname: this.registerForm.get("nickname").value,
      email: this.registerForm.get("email").value,
      contrasena: this.registerForm.get("password").value,
      telefono: this.registerForm.get("telefono").value,
    }
    console.log(user)

    this.authService.signUp(user).subscribe(
      res => {
        let userAux = {
          email:this.registerForm.get("email").value,
          contrasena: this.registerForm.get("password").value
      }
      this.authService.signIn(userAux).subscribe(
        res => {
          localStorage.setItem('token', res.token)
          const getID = this.authService.getInfoToken(this.authService.getToken());
          
          
          if(getID){
          
          this.userService.setUser(res.data) 
          this.toastr.success("Registro realizado con exito")   
          this.router.navigate(['/'])
          }
        },
        err => {
          console.log(err.error.error);
        },
  
      )
      },
      err => console.log(err),
    )
  }


}