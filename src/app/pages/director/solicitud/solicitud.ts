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
import { ConfirmationService, MessageService } from 'primeng/api';
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

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-solicitud',
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
    ],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.scss',
  providers: [ConfirmationService, MessageService, CustomerService, ProductService]

})
export class Solicitud implements OnInit{

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

    radioValue: any = null;

    loadingEnviar = [false, false, false, false];

    date3: Date | undefined;

    horaMananaInicio : any = null
    
    horaMananaFin : any = null

    horaTardeInicio : any = null
    
    horaTardeFin : any = null

    horaNocheInicio : any = null
    
    horaNocheFin : any = null

    horaSabadoInicio : any = null
    
    horaSabadoFin : any = null
    
    dropdownFacultad = [
        { name: 'CIENCIAS DE LA SALUD', code: 'S' },
        { name: 'INGENIERÍA Y NEGOCIOS', code: 'E' },
    ];

    dropdownEspecialidad = [
        // Facultad de Ciencias de la Salud
        { name: 'Medicina', code: 'S' },
        { name: 'Enfermería', code: 'S' },
        { name: 'Nutrición y Dietética', code: 'S' },
        { name: 'Tecnología Médica', code: 'S' },
        { name: 'Psicología', code: 'S' },

        // Facultad de Ingeniería y Negocios
        { name: 'Ingeniería Industrial', code: 'E' },
        { name: 'Ingeniería de Sistemas', code: 'E' },
        { name: 'Ingeniería Civil', code: 'E' },
        { name: 'Administración de Empresas', code: 'E' },
        { name: 'Contabilidad y Finanzas', code: 'E' },
    ];

    dropdownCiclo = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '5', code: '6' },
        { name: '6', code: '7' },
        { name: '7', code: '8' },
        { name: '8', code: '9' },
        { name: '9', code: '10' },
        { name: '10', code: '11' },
    ];

    dropdownCurso = [
        { name: 'MATEMATICA', code: '' },
        { name: 'INGLES', code: '' },
    ];

    multiselectCountries: Country[] = [
        { name: 'DESARROLLO DE PRODUCTOS DE EXPORTACIÓN', code: '' },
        { name: 'ÉTICA PROFESIONAL', code: '' },
        { name: 'AUDITORIA ADMINISTRATIVA', code: '' },
        { name: 'PRACTICAS', code: '' },
        { name: 'CALIDAD TOTAL', code: '' },
        { name: 'GESTIÓN DE PEQUEÑAS Y MEDIANAS EMPRESAS PARA LA EXPORTACIÓN', code: '' },
        { name: 'ELECTIVO', code: '' },
        { name: 'LENGUAJE Y COMUNICACIÓN', code: '' },
        { name: 'MATEMÁTICA I', code: 'ES' },
        { name: 'REALIDAD NACIONAL Y GLOBALIZACIÓN', code: '' }
    ];
    
    multiselectSelectedCountries!: Country[];

    dropdownPrioridad = [
        { name: 'Baja', code: 'B' },
        { name: 'Media', code: 'M' },
        { name: 'Alta', code: 'A' },
    ];

    dropdownTurno = [
        { name: 'MAÑANA', code: '' },
        { name: 'TARDE', code: '' },
        { name: 'NOCHE', code: '' },
        { name: 'SABADO', code: '' },
    ];

    dropdownModalidad = [
        { name: 'PRESENCIAL', code: '' },
        { name: 'SEMIPRESENCIAL', code: '' },
        { name: 'VIRTUAL', code: '' },
    ];

    dropdownItem = null;    

    @ViewChild('filter') filter!: ElementRef;

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
            { label: 'Requiere contratación', value: 'unqualified' },
            { label: 'Asignado', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'En revisión', value: 'negotiation' },
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

    load(index: number) {
        this.loadingEnviar[index] = true;
        setTimeout(() => (this.loadingEnviar[index] = false), 1000);
    }
}
