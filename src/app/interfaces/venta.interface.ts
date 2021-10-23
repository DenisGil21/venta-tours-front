import { Paquete } from './paquete.interface';
import { Usuario } from '../models/usuario.model';
export interface Venta {
    id: number;
    cantidad_adultos: number;
    cantidad_ninos: number;
    subtotal?: any;
    total: number;
    fecha: string;
    created_at: Date;
    user: Usuario;
    paquete: Paquete;
}