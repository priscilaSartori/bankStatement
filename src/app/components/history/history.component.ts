import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  myForm!: FormGroup;

  date: string = '';
  description: string = '';
  value: number = 0;
  single!: Date;
  status: string = '';

  dataInicial!: Date; 
  dataFinal!: Date; 

  totalValue: number = 0;

  displayedColumns: string[] = ['date', 'description', 'value', 'single', 'status'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      selectedOption: ["2"]
    });

    this.myForm.get('selectedOption')?.valueChanges.subscribe(() => {
      this.atualizarDataInicial();
      this.aplicarFiltro();
    });

    this.dataFinal = new Date();
    this.atualizarDataInicial();

    const data = [
      { id: 1, date: '9/20/2023', description: 'Recebimento de dividendos', value: 3000.00, single: 'Não avulso', status: 'Válido '},
      { id: 2, date: '10/30/2023', description: 'Salário', value: 5000.00, single: 'Não avulso', status: 'Válido '},
      { id: 3, date: '11/9/2023', description: 'Pagamento da conta de luz', value: -300.00, single: 'Avulso', status: 'Cancelado' },
      { id: 4, date: '11/11/2023', description: 'Pagamento do condomínio', value: -500.00, single: 'Avulso', status: 'Válido '},
    ];

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.aplicarFiltro(); 
  }

  atualizarDataInicial() {
    const selectedOption = this.myForm.get('selectedOption')?.value;
    if (selectedOption) {
      const diasAdicionais = parseInt(selectedOption, 10);
      this.dataInicial = new Date(this.dataFinal);
      this.dataInicial.setDate(this.dataInicial.getDate() - diasAdicionais);
    }
  }
  
  aplicarFiltro() {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data: any) => {
        const itemDate = new Date(data.date);
        return itemDate >= this.dataInicial && itemDate <= this.dataFinal;
      };
  
      this.dataSource.filter = `${this.dataInicial.toISOString()}:${this.dataFinal.toISOString()}`;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalValue = this.dataSource.filteredData.reduce((acc: number, row: any) => acc + row.value, 0);
  }
}
