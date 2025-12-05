'use client'
import { useState } from "react"
import { useContactos } from "@/context/contactoContext";

interface ContactoFormProps {
    contacto?: {
        id: string;
        nombre: string;
        correo: string;
        telefono: string;
        estado: string;
    } | null;
    onClose?: () => void;
}

function ContactoForm({ contacto = null, onClose }: ContactoFormProps) {
    const [nombre, setNombre] = useState(contacto?.nombre || '');
    const [correo, setCorreo] = useState(contacto?.correo || '');
    const [telefono, setTelefono] = useState(contacto?.telefono || '');   
    const [estado, setEstado] = useState(contacto?.estado || '');
    
    const { createContacto, updateContacto } = useContactos();
    const isEditing = !!contacto;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const contactoData = {
            nombre,
            correo,
            telefono,
            estado
        };

        if (isEditing && contacto) {
            await updateContacto(contacto.id, contactoData);
            if (onClose) onClose();
        } else {
            await createContacto(contactoData);
            // Limpiar formulario después de crear
            setNombre('');
            setCorreo('');
            setTelefono('');
            setEstado('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre"
                value={nombre}
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" 
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input 
                type="email" 
                name="correo" 
                placeholder="Correo"
                value={correo}
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" 
                onChange={(e) => setCorreo(e.target.value)}
                required
            />
            <input 
                type="tel" 
                name="telefono" 
                placeholder="Telefono"
                value={telefono}
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" 
                onChange={(e) => setTelefono(e.target.value)}
                required
            />
            <select
                name="estado"
                value={estado}
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setEstado(e.target.value)}
                required
            >
                <option value="" disabled>Selecciona estado</option>
                <option value="prospecto">Prospecto</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </select>
            <div className="flex gap-2">
                <button 
                    type="submit"
                    className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
                {isEditing && onClose && (
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}

export default ContactoForm