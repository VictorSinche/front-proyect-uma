import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
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
import { SolicitudService } from '@/pages/service/solicitud.service';
import { MessageModule } from 'primeng/message';

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
        MessageModule,
    ],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.scss',
  providers: [ConfirmationService, MessageService, CustomerService, ProductService]

})
export class Solicitud implements OnInit{
  
  messageService = inject(MessageService);
  errores: any = {};
  errorDisponibilidad = false;
  mostrarErrores = false;

  // Formulario Solicitud
  dropdownFacultad = [];
  dropdownEspecialidad = [];
  dropdownCiclo = [];
  dropdownModalidad = [];
  dropdownCurso = [];
  dropdownPrioridad = [
    { name: 'Alta', value: 1 },
    { name: 'Media', value: 2 },
    { name: 'Baja', value: 3 },
  ];

  selectedFacultad: any;
  selectedEspecialidad: any;
  selectedCiclo: any;
  selectedModalidad: any;
  selectedCursos: any[] = [];
  radioValue: string = '';
  selectedPrioridad: any;
  horasDictar: number = 0;
  pagoHoras: number = 0;
  observaciones: string = '';

  dias = [
    { nombre: 'Lunes', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Martes', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Miércoles', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Jueves', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Viernes', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Sábado', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null },
    { nombre: 'Domingo', manianaInicio: null, manianaFin: null, nocheInicio: null, nocheFin: null }
  ];


  //--------------------

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

    // radioValue: any = null;

    loadingEnviar = [false, false, false, false];

    date3: Date | undefined;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private solicitudService: SolicitudService
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

        this.solicitudService.getFacultades().subscribe(res => {
        this.dropdownFacultad = res.map((f:any) => ({ name: f.c_codfac, value: f.c_codfac }));
      });
    }

    onChangeFacultad() {
      this.solicitudService.getEspecialidades(this.selectedFacultad.value).subscribe(res => {
        this.dropdownEspecialidad = res.map((e:any)=> ({ name: e.c_codesp, value: e.c_codesp }));
      });
    }

    onChangeEspecialidad() {
      this.solicitudService.getCiclos(this.selectedFacultad.value, this.selectedEspecialidad.value).subscribe(res => {
        this.dropdownCiclo = res.map((c:any) => ({ name: `Ciclo ${c.n_ciclo}`, value: c.n_ciclo }));
      });
    }

    onChangeCiclo() {
      this.solicitudService.getModalidades(this.selectedFacultad.value, this.selectedEspecialidad.value, this.selectedCiclo.value).subscribe(res => {
        this.dropdownModalidad = res.map((m:any) => ({ name: m.c_codmod, value: m.c_codmod }));
      });
    }

    onChangeModalidad() {
      this.solicitudService.getCursos(
        this.selectedFacultad.value,
        this.selectedEspecialidad.value,
        this.selectedCiclo.value,
        this.selectedModalidad.value
      ).subscribe(res => {
        this.dropdownCurso = res.map((c:any) => ({ 
          name: c.c_nomcur, 
          // name: `[${c.c_codcur}] - ${c.c_nomcur}`,
          value: c.c_codcur }));
      });
    }

    trackByCurso(index: number, item: any): string {
      return item.value;
    }

//#region create, update, delete
  formatHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  enviarSolicitud(index: number) {
    this.loadingEnviar[index] = true;

    this.errores = {}; // reinicia errores
    
    this.mostrarErrores = true;

    if (!this.selectedFacultad) this.errores.facultad = true;
    if (!this.selectedEspecialidad) this.errores.especialidad = true;
    if (!this.selectedCiclo) this.errores.ciclo = true;
    if (!this.selectedModalidad) this.errores.modalidad = true;
    if (!this.selectedCursos.length) this.errores.curso = true;
    if (!this.radioValue) this.errores.tipo = true;
    if (!this.horasDictar) this.errores.horasDictar = true;
    if (!this.pagoHoras) this.errores.pagoHoras = true;
    if (!this.selectedPrioridad) this.errores.prioridad = true;
    if (!this.selectedCursos) this.errores.cursos = true;

    const tieneErrores = Object.keys(this.errores).length > 0;

    if (tieneErrores) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, completa todos los campos obligatorios.',
        life: 4000,
      });
      this.loadingEnviar[index] = false;
      return;
    }

    if (
      !this.selectedFacultad ||
      !this.selectedEspecialidad ||
      !this.selectedCiclo ||
      !this.selectedModalidad ||
      !this.selectedCursos.length ||
      !this.radioValue ||
      !this.horasDictar ||
      !this.pagoHoras ||
      !this.selectedPrioridad
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, completa todos los campos obligatorios.',
        life: 4000,
      });
      this.loadingEnviar[index] = false;
      return;
    }

    this.mostrarErrores = false;

    const tieneDisponibilidad = this.dias.some(dia =>
      (dia.manianaInicio && dia.manianaFin) ||
      (dia.nocheInicio && dia.nocheFin)
    );

    this.errorDisponibilidad = !tieneDisponibilidad;

    if (this.errorDisponibilidad) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Disponibilidad requerida',
        detail: 'Debes registrar al menos un turno disponible.',
        life: 4000,
      });
      this.loadingEnviar[index] = false;
      return;
    }

    const payload = {
      tipo: this.radioValue,
      horasDictar: this.horasDictar,
      pagoHoras: Math.floor(this.pagoHoras),
      prioridad: this.selectedPrioridad?.value,
      observaciones: this.observaciones,
      facultad: this.selectedFacultad?.value,
      especialidad: this.selectedEspecialidad?.value,
      ciclo: this.selectedCiclo?.value,
      modalidad: this.selectedModalidad?.value,
      curso: this.selectedCursos.map((c: any) => c.value), // array de c_codcur

      disponibilidades: this.dias
        .map((dia) => {
          const turnos = [];

          if (dia.manianaInicio && dia.manianaFin) {
            turnos.push({
              turno: 'Mañana',
              horaInicio: this.formatHora(dia.manianaInicio),
              horaFin: this.formatHora(dia.manianaFin),
            });
          }
          if (dia.nocheInicio && dia.nocheFin) {
            turnos.push({
              turno: 'Noche',
              horaInicio: this.formatHora(dia.nocheInicio),
              horaFin: this.formatHora(dia.nocheFin),
            });
          }

          if (turnos.length === 0) return null;

          return {
            dia: dia.nombre,
            turnos,
          };
        })
        .filter(Boolean),
    };

    this.solicitudService.createSolicitud(payload).subscribe({
      next: (res) => {
        console.log('Solicitud enviada:', res);
        this.loadingEnviar[index] = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Solicitud registrada',
          detail: 'Se ha enviado correctamente',
          life: 4000,
        });

        this.limpiarFormulario(); // ⬅️ nueva función para reiniciar
      },
      error: (err) => {
        console.error('Error al enviar solicitud:', err);
        this.loadingEnviar[index] = false;
      },
    });
  }

//#endregion

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

    // load(index: number) {
    //     this.loadingEnviar[index] = true;
    //     setTimeout(() => (this.loadingEnviar[index] = false), 1000);
    // }

    limpiarFormulario() {
      this.selectedFacultad = null;
      this.selectedEspecialidad = null;
      this.selectedCiclo = null;
      this.selectedModalidad = null;
      this.selectedCursos = [];
      this.radioValue = '';
      this.selectedPrioridad = null;
      this.horasDictar = 0;
      this.pagoHoras = 0;
      this.observaciones = '';

      // Reset días y horarios
      this.dias.forEach(dia => {
        dia.manianaInicio = null;
        dia.manianaFin = null;
        dia.nocheInicio = null;
        dia.nocheFin = null;
      });

      // Si quieres limpiar también los dropdowns dependientes:
      this.dropdownEspecialidad = [];
      this.dropdownCiclo = [];
      this.dropdownModalidad = [];
      this.dropdownCurso = [];
    }
}
