import Swal from 'sweetalert2';
import { EventService } from './../../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-reservation',
  templateUrl: './client-reservation.component.html',
  styleUrls: ['./client-reservation.component.scss']
})
export class ClientReservationComponent implements OnInit {
  events:any
  id = localStorage.getItem('id')
  constructor(
    private eventService : EventService,
    private reservationService : ReservationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.eventService.getAll().subscribe(res=>{
      this.events = res
    })
  }

  reserver(idEvent : any){
    var obj = {
      evenement_id : idEvent ,
      client_id : this.id
    }
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, reservé !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.add(obj).subscribe(res=>{
          this.router.navigateByUrl("nav2/mes-reservations")
        })
      }
    });
  }

}
