import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario-admin',
  templateUrl: './modificar-usuario-admin.component.html',
  styleUrls: ['./modificar-usuario-admin.component.scss']
})
export class ModificarUsuarioAdminComponent {
  user!:User
  disabled=true;
  updateDataForm: FormGroup;   
  idUsuario:string;

  constructor(private fb: FormBuilder, private userService: UserService , private route : ActivatedRoute){

    this.reactiveForm()
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

    this.route.params
      .subscribe(params => {
        this.idUsuario = params['id']
        console.log(params['id']); // { orderby: "price" }
      }
    );
    this.userService.getUsuario(this.idUsuario).subscribe((data) =>{
      this.user = data.consulta;
      console.log(this.user);
    })
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.updateDataForm.controls[control].hasError(error);
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
        console.log(res)
      },
      err => console.log(err),
    )
  }

  
}
