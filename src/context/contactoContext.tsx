/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext, useState, useContext } from "react";

interface Contacto {
    nombre: string
    correo: string
    telefono: string
    estado: string
}

export const ContactoContext = createContext<{
    contactos: any[];
    loadContactos: () => Promise<void>;
    createContacto: (contacto: Contacto) => Promise<void>;
    deleteContacto: (id: string) => Promise<void>;
    updateContacto: (id: string, contacto: Contacto) => Promise<void>;
}>({
    contactos: [],
    loadContactos: async () => {},
    createContacto: async (contacto: Contacto) => {},
    deleteContacto: async (id: string) => {},
    updateContacto: async (id: string, contacto: Contacto) => {},
});

export const useContactos = () => {
    const context = useContext(ContactoContext);
    if (!context) {
        throw new Error('useContactos must be within a ContactoProvider');
    }
    return context;
};

export const ContactoProvider = ({children}: {children:React.ReactNode}) => {
    const [contactos, setContactos] = useState<any>([]);

    async function loadContactos() {
        const response = await fetch("/api/contactos");
        const data = await response.json(); 
        setContactos(data)
    }

    async function createContacto(contacto: Contacto) {
        const response = await fetch('/api/contactos', {
            method: 'POST',
            body: JSON.stringify(contacto),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const newContacto = await response.json();
        setContactos([...contactos, newContacto]);
    }

    async function deleteContacto(id: string) {
        const response = await fetch(`/api/contactos/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            setContactos(contactos.filter((contacto: any) => contacto.id !== id));
        }
    }

    async function updateContacto(id: string, contacto: Contacto) {
        const response = await fetch(`/api/contactos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contacto),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const updatedContacto = await response.json();
        setContactos(contactos.map((c: any) => 
            c.id === id ? updatedContacto : c
        ));
    }

    return (
        <ContactoContext.Provider value={{
            contactos, 
            loadContactos, 
            createContacto,
            deleteContacto,
            updateContacto
        }}>
            {children}
        </ContactoContext.Provider>
    )
};