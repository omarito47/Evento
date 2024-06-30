import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/core/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss'],
})
export class AdminReservationComponent implements OnInit {
  search: any;
  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}
  reservations: any;
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.reservationService.getAll().subscribe((res) => {
      this.reservations = res;
    });
  }

  action(item: any, status: any) {
    console.log(item);
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
        item.client_id = item.client_id._id;
        item.evenement_id = item.evenement_id._id;
        item.etat = status;
        this.reservationService.update(item._id, item).subscribe((res) => {
          this.getAll();
        });
      }
    });
  }

  onSearch() {
    this.reservationService.filterByStatus(this.search).subscribe((res) => {
      this.reservations = res.reservations;
      console.log("reservations" , res);

    });
  }
}
