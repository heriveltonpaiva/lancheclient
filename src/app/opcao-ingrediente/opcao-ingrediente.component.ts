import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-opcao-ingrediente',
  templateUrl: './opcao-ingrediente.component.html',
  styleUrls: ['./opcao-ingrediente.component.css']
})
export class OpcaoIngredienteComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.exibirID;
  }

  exibirID(): void {
    const id = +this.route.snapshot.paramMap.get('id');
  }
}
