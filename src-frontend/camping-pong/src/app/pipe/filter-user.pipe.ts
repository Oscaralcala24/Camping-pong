import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(users : User[], filterText: string): any {
    const resultUser = []

    for (const user of users) {
      if(user.nombre.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultUser.push(user)
      }
      else if(user.apellidos.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultUser.push(user)
      }
      else if(user.dni.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultUser.push(user)
      }
    }
    return resultUser;
  }

}
