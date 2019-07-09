import { Component, OnInit, ViewChild } from '@angular/core';
import { Resultado } from '../../models/resultado';
import { ExamenesService } from '../../services/examenes.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  titulo = "Mis Resultados Globales";
  displayedColumns: string[] = ['termino', 'aciertos', 'fallos', 'total'];
  listaResultados:Resultado[] = [];
  dataSource: MatTableDataSource<Resultado>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _examenes_service:ExamenesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getResultados()
  }

  private getResultados() {
    this._examenes_service.getResultados().subscribe(result => {
      console.log(result);
      this.listaResultados = result.resultados;
      this.dataSource = new MatTableDataSource(this.listaResultados);
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
