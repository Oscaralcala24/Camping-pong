import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-ingresos-camping',
  templateUrl: './ingresos-camping.component.html',
  styleUrls: ['./ingresos-camping.component.scss']
})
export class IngresosCampingComponent implements OnInit {
  constructor(private reservaService: ReservaService) { }
  reservas: any;
  anos: any = [];
  anoSeleccionado: any = new Date().getFullYear();
  filteredReservas: any;
  getIngresosMeses: any =[0,0,0,0,0,0,0,0,0,0,0,0];
  canvas: any;
  ctx: any;

  @ViewChild('mychart', { static: true }) mychart: any;

  ngOnInit(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.reservaService.getReservas().subscribe(res => {
      this.reservas = res.consulta;
      console.log(this.reservas);
      this.reservas.forEach(element => {

        let fecha = new Date(element.id_reserva.fecha_pago)
        this.anos.push(fecha.getFullYear());
        this.updateChart()
        
      });
    })
    setTimeout(() => {

      const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre", "Octubre","Noviembre","Diciembre"],
        datasets: [{
          label:"Ingresos",
          data: this.getIngresosMeses,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgb(255, 99, 132)',

          ],
          borderWidth: 1
        }]
      };
      new Chart(this.ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            subtitle: {
              display: true,
              text: 'Ingresos mensuales de las reservas '
            }
          }
        }
      })
    }, 300)

  }

  updateChart() {
    this.filteredReservas = this.reservas.filter(reserva => new Date(reserva.id_reserva.fecha_pago).getFullYear() == this.anoSeleccionado);
    for (let index = 0; index < this.filteredReservas.length; index++) {
      let mes = new Date(this.filteredReservas[index].id_reserva.fecha_pago).getMonth();
      this.getIngresosMeses[mes] = this.getIngresosMeses[mes]+ (2.5)
    }
  }

}
