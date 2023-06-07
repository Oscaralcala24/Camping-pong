import { Pipe, PipeTransform } from '@angular/core';
import { Camping } from '../models/camping';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(campings : any[], filterText: string): any {
    const resultCamping = []

    for (const camping of campings) {
      if(camping.id_camping.nombre.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
      else if(camping.id_camping.region.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
      else if(camping.id_camping.ciudad.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
    }
    return resultCamping;
  }

}
