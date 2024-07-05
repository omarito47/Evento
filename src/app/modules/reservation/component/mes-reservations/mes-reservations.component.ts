import Swal from 'sweetalert2';
import { ReservationService } from './../../../../core/services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.scss']
})
export class MesReservationsComponent implements OnInit {
  id = localStorage.getItem("id")
  reservations : any
  constructor(
    private reservationService : ReservationService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.reservationService.getAll().subscribe(res=>{
      this.reservations = res
      this.reservations = this.reservations.filter((i:any)=>{
        return i.client_id._id == this.id
      })
    })
  }


  cancel(id:any){
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annulé !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.cancel(id).subscribe(res=>{
          this.getAll()
        })
      }
    });
  }

}
