import { Component, OnInit } from '@angular/core';
import { TypeEvenement, TypeEvenementService } from 'src/app/core/services/type-evenement.service';

@Component({
  selector: 'app-list-type-event',
  templateUrl: './list-type-event.component.html',
  styleUrls: ['./list-type-event.component.scss']
})
export class ListTypeEventComponent implements OnInit {

  typeEvenements: TypeEvenement[] = [];

  constructor(private typeEvenementService: TypeEvenementService) {}

  ngOnInit(): void {
    this.typeEvenementService.getTypeEvenements().subscribe(data => {
      this.typeEvenements = data;
    });
  }

  deleteTypeEvenement(id: string): void {
    this.typeEvenementService.deleteTypeEvenement(id).subscribe(() => {
      this.typeEvenements = this.typeEvenements.filter(t => t._id !== id);
    });
  }

}
