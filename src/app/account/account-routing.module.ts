import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './pages/admin-paquetes/admin-paquetes.component';
import { AdminPaqueteComponent } from './pages/admin-paquete/admin-paquete.component';
import { GaleriasComponent } from './pages/galerias/galerias.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { SuperuserGuard } from '../guards/superuser.guard';


const routes: Routes = [
  {
    path:'',
    component: AccountComponent,
    children:[
      { path: '', component: PanelComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'empresas', component: EmpresasComponent,canActivate:[SuperuserGuard] },
      { path: 'galeria/paquete/:id', component:GaleriasComponent,canActivate:[SuperuserGuard]},
      { path: 'paquetes', component: AdminPaquetesComponent,canActivate:[SuperuserGuard] },
      { path: 'paquete/:id', component: AdminPaqueteComponent,canActivate:[SuperuserGuard] },
      { path: 'perfil', component: PerfilComponent },
      { path: 'usuarios', component: UsuariosComponent,canActivate:[SuperuserGuard]},
      { path: 'ventas', component: VentasComponent,canActivate:[SuperuserGuard] },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
