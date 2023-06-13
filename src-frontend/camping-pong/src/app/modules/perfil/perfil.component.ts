import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { Validate } from '../registro/validation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  user!:User
  disabled=true;
  updateDataForm: FormGroup;   
  updatePasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,private toastr: ToastrService,private router:Router){
    this.passwordForm()
    this.reactiveForm()
  }
  passwordForm(){
    this.updatePasswordForm = this.fb.group({
      contrasenaActual: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      passwordConfirm: new FormControl('', Validators.required),
    },{
      validator: Validate.MatchPassword,
    });
  }
  reactiveForm() {
    this.updateDataForm = this.fb.group({
    nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
    apellidos: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
    dni: new FormControl('', [Validators.pattern('^[0-9]{8,8}[A-Za-z]$'), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern("^[0-9]{9}$"), Validators.required]),
  });
}


  ngOnInit(): void {
    this.userService.dataUser.subscribe((data) =>{
      this.user = data;
      console.log(this.user);
    })
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.updateDataForm.controls[control].hasError(error);
  }
  public errorHandlingPassword = (control: string, error: string) => {
    return this.updatePasswordForm.controls[control].hasError(error);
  }


  actualizardatos(){
    
    let userAux = {  
      nombre : this.updateDataForm.get("nombre").value,
      apellidos : this.updateDataForm.get("apellidos").value,
      dni : this.updateDataForm.get("dni").value,
      email : this.updateDataForm.get("email").value,
      telefono: this.updateDataForm.get("telefono").value,
    }


    this.userService.updateUser(userAux, this.user._id).subscribe(
      res => {
        this.toastr.success(res) 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/perfil']);
      });
        
      },
      err => this.toastr.error(err) ,
    )
  }

  updatePassword(){
    let passwordAux = {  
      contrasenaActual : this.updatePasswordForm.get("contrasenaActual").value,
      contrasenaNueva : this.updatePasswordForm.get("password").value,

      
    }
    this.userService.updatePassword(passwordAux,this.user._id).subscribe(
      res => {
        this.toastr.success(res)
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/perfil']);
      });
        
      },
      err => this.toastr.error(err),
    )
  }
}
