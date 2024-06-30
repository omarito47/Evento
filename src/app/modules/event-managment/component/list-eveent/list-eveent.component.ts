import { TypeEvenementService } from './../../../../core/services/type-evenement.service';
import { Component, OnInit } from '@angular/core';
import { Evenement, EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-list-eveent',
  templateUrl: './list-eveent.component.html',
  styleUrls: ['./list-eveent.component.scss']
})
export class ListEveentComponent implements OnInit {

  evenements: Evenement[] = [];


  constructor(
    private evenementService: EventService
  ) {}

  ngOnInit(): void {

    this.evenementService.getAll().subscribe(data => {
      this.evenements = data;
    });
  }

  deleteEvenement(id: string): void {
    this.evenementService.delete(id).subscribe(() => {
      this.evenements = this.evenements.filter(e => e._id !== id);
    });
  }

}
