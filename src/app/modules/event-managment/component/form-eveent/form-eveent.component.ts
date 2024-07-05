import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement, EventService } from 'src/app/core/services/event.service';
import { TypeEvenementService } from 'src/app/core/services/type-evenement.service';

@Component({
  selector: 'app-form-eveent',
  templateUrl: './form-eveent.component.html',
  styleUrls: ['./form-eveent.component.scss']
})
export class FormEveentComponent implements OnInit {

  evenement: Evenement = {
    name: '',
    description: '',
    DateDebut: new Date(),
    DateFin: new Date(),
    heure: '',
    lieu: '',
    PriceTicket: 0,
    nombreParticipant: 0,
    typeEvent: '',
    userEvenement: ''
  };
  isEditMode: boolean = false;
  typeEvenements: any
  constructor(
    private evenementService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private typeEvenementService: TypeEvenementService
  ) { }

  ngOnInit(): void {
    this.typeEvenementService.getTypeEvenements().subscribe(res => {
      this.typeEvenements = res
    })
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.evenementService.getById(id).subscribe(data => {
        this.evenement = data;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.evenementService.update(this.evenement._id!, this.evenement).subscribe(() => {
        this.router.navigate(['/evenements']);
      });
    } else {
      console.log(this.evenement)
      this.evenementService.add(this.evenement).subscribe(() => {
        this.router.navigate(['/evenements']);
      });
    }
  }
}
