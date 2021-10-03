import { Caracteristica } from './caracteristica.interface';
import { Galeria } from './galeria.iterface';
import { Empresa } from './empresa.interface';

export interface Paquete {
    id: number;
    caracteristicas: Caracteristica[];
    galerias: Galeria[];
    empresa: Empresa;
    nombre: string;
    descripcion: string;
    precio_adulto: number;
    precio_nino?: any;
    informacion: [];
    portada: string;
    activo: boolean;
}

