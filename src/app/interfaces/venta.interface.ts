import { User } from './user.interface';
export interface Venta {
    id: number;
    cantidad_adultos: number;
    cantidad_ninos: number;
    subtotal?: any;
    total: number;
    fecha: string;
    created_at: Date;
    user: User;
    paquete: number;
}