import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEvenement, TypeEvenementService } from 'src/app/core/services/type-evenement.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  typeEvenement: TypeEvenement = { name: '', libele: '' };
  isEditMode: boolean = false;

  constructor(
    private typeEvenementService: TypeEvenementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.typeEvenementService.getTypeEvenementById(id).subscribe(data => {
        this.typeEvenement = data;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.typeEvenementService.updateTypeEvenement(this.typeEvenement._id!, this.typeEvenement).subscribe(() => {
        this.router.navigate(['/type-event']);
      });
    } else {
      this.typeEvenementService.createTypeEvenement(this.typeEvenement).subscribe(() => {
        this.router.navigate(['/type-event']);
      });
    }
  }

}
