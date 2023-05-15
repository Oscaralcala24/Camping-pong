import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { CampingService } from 'src/app/service/campingService/camping.service';

@Component({
  selector: 'app-informacion-camping',
  templateUrl: './informacion-camping.component.html',
  styleUrls: ['./informacion-camping.component.scss']
})
export class InformacionCampingComponent {
constructor(private route : ActivatedRoute , private campingService: CampingService){}
idCamping:string;
camping:any;
parcelas:any;
precios:any;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
ngOnInit(): void {

  this.route.params
    .subscribe(params => {
      this.idCamping = params['id']
      console.log(params['id']); // { orderby: "price" }
    }
  );
  this.campingService.getCamping(this.idCamping).subscribe((data) =>{
    this.camping = data.consulta;
    console.log(this.camping.imagenes);
  })
  for (let index = 0; index < this.camping.imagenes.length; index++) {
    this.galleryImages.push({
        small: this.camping.imagenes[index],
        medium: this.camping.imagenes[index],
        big: this.camping.imagenes[index]
    })
    
  }
  this.galleryOptions = [
    { "imageSize": "contain" },
    { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
    { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]
}

}
