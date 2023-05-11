
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
    this.selectedValue="";
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
           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
             scaleX: canvas.width / img.width,
             scaleY: canvas.height / img.height
           });
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
       this.points.push(this.newPt);
       this.canvas.add(this.polygon);
     }
   }
 
   makePolygon() {
     this.isImageDrawn = false;
     console.log(this.points);
   }
 
  
 
   //POLYGON EDIT CODE
   
public Edit() {
  function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    let x =
        fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x,
      y = fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;
    return fabric.util.transformPoint(
      new fabric.Point(x, y),
      fabric.util.multiplyTransformMatrices(
        fabricObject.canvas.viewportTransform,
        fabricObject.calcTransformMatrix()
      ),
      
    );
  }
  function anchorWrapper(anchorIndex, fn) {
    return function(eventData, transform, x, y) {
      var fabricObject = transform.target,
        absolutePoint = fabric.util.transformPoint(
          new fabric.Point(
            fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
            fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
          ),
          fabricObject.calcTransformMatrix()
        ),
        actionPerformed = fn(eventData, transform, x, y),
        newDim = fabricObject._setPositionDimensions({}),
        polygonBaseSize = fabricObject._getNonTransformedDimensions(),
        newX =
          (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
          polygonBaseSize.x,
        newY =
          (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
          polygonBaseSize.y;
      fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
      return actionPerformed;
    };
  }
  
  function actionHandler(eventData, transform, x, y) {
    var polygon = transform.target,
      currentControl = polygon.controls[polygon.__corner],
      mouseLocalPosition = polygon.toLocalPoint(
        new fabric.Point(x, y),
        'center',
        'center'
      ),
      polygonBaseSize = polygon._getNonTransformedDimensions(),
      size = polygon._getTransformedDimensions(0, 0),
      finalPointPosition = {
        x:
          (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
          polygon.pathOffset.x,
        y:
          (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
          polygon.pathOffset.y
      };
    polygon.points[currentControl.pointIndex] = finalPointPosition;
    return true;
  }
  let poly = this.polygon
  this.canvas.setActiveObject(poly);
  
  poly.edit = !poly.edit;
  if (poly.edit) {
    let lastControl = poly.points.length - 1;
    poly.cornerStyle = 'circle';
    poly.cornerColor = 'rgba(0,0,255,0.5)';
    poly.controls = poly.points.reduce(function(acc, point, index) {
      acc['p' + index] = new fabric['Control']({
        pointIndex: index,
        positionHandler: polygonPositionHandler,
        actionHandler: anchorWrapper(
          index > 0 ? index - 1 : lastControl,
          actionHandler
        ),
        actionName: 'modifyPolygon'
      });
      return acc;
    }, {});
  }
  poly.hasBorders = !poly.edit;
  this.canvas.requestRenderAll();
}
}