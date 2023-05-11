import { Pipe, PipeTransform } from '@angular/core';
import { Camping } from '../models/camping';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(campings : Camping[], filterText: string): any {
    const resultCamping = []

    for (const camping of campings) {
      if(camping.nombre.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
      else if(camping.region.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
      else if(camping.ciudad.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
        resultCamping.push(camping)
      }
    }
    return resultCamping;
  }

}
