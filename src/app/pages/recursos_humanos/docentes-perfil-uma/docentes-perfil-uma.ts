import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Country, Customer, CustomerService, Representative } from '../../service/customer.service';
import { Product, ProductService } from '../../service/product.service';
import { ObjectUtils } from 'primeng/utils';
import { ConfirmationService, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';
import { Dialog } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-docentes-perfil-uma',
  imports: [
        InputTextModule, 
        FluidModule, 
        ButtonModule, 
        SelectModule, 
        FormsModule, 
        TextareaModule,
        TableModule,
        MultiSelectModule,
        InputIconModule,
        TagModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        RadioButtonModule,
        DatePickerModule,
        ToolbarModule,
        SplitButtonModule,
        AccordionModule,
        FieldsetModule,
        MenuModule,
        DividerModule,
        SplitterModule,
        PanelModule,
        TabsModule,
        Dialog,
        ChipModule,
        BreadcrumbModule,
        AvatarModule,
  ],
  templateUrl: './docentes-perfil-uma.html',
  styleUrl: './docentes-perfil-uma.scss',
  providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class DocentesPerfilUma implements OnInit{
      @ViewChild('filter') filter!: ElementRef;
      @ViewChild('dt') dt!: Table;

      customers1: Customer[] = [];
  
      customers2: Customer[] = [];
  
      customers3: Customer[] = [];
  
      selectedCustomers1: Customer[] = [];
  
      selectedCustomer: Customer = {};
  
      representatives: Representative[] = [];
  
      statuses: any[] = [];
  
      products: Product[] = [];
  
      rowGroupMetadata: any;
  
      expandedRows: expandedRows = {};
  
      activityValues: number[] = [0, 100];
  
      isExpanded: boolean = false;
  
      balanceFrozen: boolean = false;
  
      loading: boolean = true;

      visible: boolean = false;

      position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

	    productsModal: Product[] = [];

      initialValue: Product[] = [];

      isSorted: boolean | null = null;

      breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
      breadcrumbItems: MenuItem[] = [
        { label: 'Bandeja de solicitudes', routerLink: '/uikit/bandeja' },
        { label: 'Perfil docente' }
      ];


      solicitud = {
        id: 12,
        estado: 'Pendiente',
        director: 'Ing. Pérez',
        fecha: '28/10/2025',
        curso: 'Programación Web',
        especialidad: 'Sistemas',
        tipo: 'TP',
        cantidad: 1,
        facultad: 'INGENIERIA Y NEGOClOS',
        prioridad: 'Alta',
        observacion: 'Requiere disponibilidad en turno noche.'
      };
    
    constructor(
      private customerService: CustomerService,
      private productService: ProductService
    ) {}
      
    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach((customer) => (customer.date = new Date(customer.date)));
        });
        this.customerService.getCustomersMedium().then((customers) => (this.customers2 = customers));
        this.customerService.getCustomersLarge().then((customers) => (this.customers3 = customers));
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    } else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if(ObjectUtils.isEmpty(this.expandedRows)) {
            this.expandedRows = this.products.reduce(
                (acc, p) => {
                    if (p.id) {
                        acc[p.id] = true;
                    }
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            this.isExpanded = true;
        } else {
            this.collapseAll()
        }

    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string) {
        switch (status) {
            case 'qualified':
            case 'instock':
            case 'INSTOCK':
            case 'DELIVERED':
            case 'delivered':
                return 'success';

            case 'negotiation':
            case 'lowstock':
            case 'LOWSTOCK':
            case 'PENDING':
            case 'pending':
                return 'warn';

            case 'unqualified':
            case 'outofstock':
            case 'OUTOFSTOCK':
            case 'CANCELLED':
            case 'cancelled':
                return 'danger';

            default:
                return 'info';
        }
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers2) {
            for (let customer of this.customers2) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

	showDialog(position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
        this.position = position;
        this.visible = true;
    }

	customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.products = [...this.initialValue];
            this.dt.reset();
        }
    }

    sortTableData(event: any) {
        event.data.sort((data1: any, data2: any) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

    //#region MODAL_PERFIL
    profile = {
      nombre: 'Victor Sinche Panduro',
      especialidad: 'Ingeniería de Sistemas',
      disponible: true,
      modalidad: 'Tiempo Completo',   // TP / TC / PT, etc.
      match: 15,
      grados: [
        'Mg. en Ingeniería de Sistemas – UNI',
        'Bach. en Informática – UNMSM'
      ],
      experiencia: [
        'Docente 3 años – UMA',
        'Desarrolladora FullStack 4 años – Fintech'
      ],
      cursos: [
        'Programación Web Bases de Datos',
        'Algoritmos'
      ],
      certificaciones: [
        'AWS Cloud Practitioner',
        'Scrum Master'
      ],
      email: 'mrios@uma.edu.pe',
      telefono: '+51 999 111 222',
      notas: 'Excelente evaluación en semestres previos.'
    };

    enviarSugerido(p: any) {
      // TODO: integra con tu flujo de RR.HH.
      console.log('Enviar como sugerido', p);
    }

    generarContrato(p: any) {
      // TODO: acción para generar contrato
      console.log('Generar contrato', p);
    }

}
