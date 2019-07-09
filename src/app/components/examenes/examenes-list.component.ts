import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from '../../models/examen';
import { ExamenesService } from '../../services/examenes.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examenes-list',
  templateUrl: './examenes-list.component.html',
  styleUrls: ['./examenes-list.component.css'],
})
export class ExamenesListComponent implements OnInit {
  titulo = "Mis Exámenes";
  displayedColumns: string[] = ['fecha', 'aciertos', 'fallos', 'acciones'];
  listaExamenes:Examen[] = [];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _examenes_service:ExamenesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getExamenes()
  }

  private getExamenes() {
    console.log("Vamos a consultar los examenes");
    this._examenes_service.getExamenes().subscribe(result => {
      console.log("Examenes recibidos");
      console.log(result);
      this.listaExamenes = result.examenes;
      this.dataSource = new MatTableDataSource(this.listaExamenes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      if(error.status == 401){
        console.log(error);
        //this.alertService.error("Sesión expirada");
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        this._router.navigateByUrl('/login');
      } else {
        console.log(<any>error);
      }   
    });
  }

}
