
import {
  ViewChild,
  ElementRef,
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-modal-parcelas',
  templateUrl: './modal-parcelas.component.html',
  styleUrls: ['./modal-parcelas.component.scss']
})
export class ModalParcelasComponent {
  selectedValue: string;
  tamanos: any[] = [
    {nombre: 'Pequeña'},
    {nombre: 'Mediana'},
    {nombre: 'Grande'},
  ];
  parcelas:any[] = [];
   // @ViewChild('myCanvas') myCanvas: ElementRef;
   myCanvas: any;
   image = new Image();
   url: string;
   isCanvasDrawn: boolean = true;
   canvas: any;
   polygon: any;
   isImageDrawn: boolean = false;
   isPolygonDrawn: boolean = false;
   points = [];
   newPt: any;
 
   constructor(private dialogRef: MatDialogRef<ModalParcelasComponent>) {}

   getParcelas(): any[] {
    return this.parcelas;
   }

   confirmParcelas() {
    this.dialogRef.close(this.parcelas);
  }
 
   ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', { fireRightClick: true });
    this.myCanvas = this.canvas.lowerCanvasEl;
    this.crearParcela()
   }
 
   ngAfterViewInit() {
     this.canvas.on('mouse:up', options => {
       if (options.button === 1) {
         this.getClickCoords(options.e);
       }
     });
 
     this.canvas.on('mouse:down', event => {
       if (event.button === 3) {
         this.makePolygon();
         this.isPolygonDrawn = true;
       }
     });
   }

   guardarParcela(){
    this.parcelas.push({coordenadas: JSON.stringify(this.points), tamano: this.selectedValue})
    this.canvas.add(this.polygon)
    this.crearParcela();
   }
   crearParcela(){
    this.newPt = null;
    this.points =[];
     this.polygon = new fabric.Polygon(this.points, {
       left: 0,
       top: 0,
       fill: 'rgba(255,0,0,0.1)',
       strokeWidth: 1,
       stroke: 'lightgrey',
       scaleX: 1,
       scaleY: 1,
       objectCaching: false,
       transparentCorners: false,
       cornerColor: 'blue'
     });
     this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
   }
 
   selectFile(event: any): void {
     var canvas = this.canvas;
     if (event.target.files) {
       var reader = new FileReader();
       let file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = (event: any) => {
         this.url = event.target.result;
        
         fabric.Image.fromURL(this.url, function(img) {
           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
         });
       };
       this.isImageDrawn = true;
     }
   }
 
   getClickCoords(event: any) {
     if (this.isCanvasDrawn && this.isImageDrawn) {
       this.newPt = {
         x: event.layerX,
         y: event.layerY
       };
       console.log(this.newPt);
       this.points.push(this.newPt);
       console.log(this.points);
       this.canvas.add(this.polygon);
     }
   }
 
   makePolygon() {
     this.isImageDrawn = false;
     console.log(this.points);
   }
 
  
 
}