import { Component, OnInit, ViewChild } from '@angular/core';
import { Termino } from '../../models/termino';
import { TerminosService } from '../../services/terminos.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos-list',
  templateUrl: './terminos-list.component.html',
  styleUrls: ['./terminos-list.component.css'],
})
export class TerminosListComponent implements OnInit {
  titulo = "Mis Términos";
  displayedColumns: string[] = ['termino', 'definicion', 'ejemplo', 'tipo', 'acciones'];
  listaTerminos:Termino[] = [];
  dataSource: MatTableDataSource<Termino>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _terminos_service:TerminosService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getTerminos()
  }

  private getTerminos() {
    this._terminos_service.getTerminos().subscribe(result => {
      this.listaTerminos = result.terminos;
      this.dataSource = new MatTableDataSource(this.listaTerminos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      if(error.status == 401){
        //this.alertService.error("Sesión expirada");
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        this._router.navigateByUrl('/login');
      } else {
        //this.alertService.error("Error desconocido");
        console.log(<any>error);
      }   
    });
  }

}
