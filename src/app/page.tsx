/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ContactoForm from "@/components/contactoForm";
import { useEffect, useState, useMemo } from "react";
import { useContactos } from "@/context/contactoContext";

function HomePage() {
    const { contactos, loadContactos, deleteContacto } = useContactos();
    const [editingContacto, setEditingContacto] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('todos');

    useEffect(() => {
        loadContactos();
    }, [])

    // Filtrar contactos basado en búsqueda y estado
    const contactosFiltrados = useMemo(() => {
        return contactos.filter((contacto: any) => {
            // Filtro por búsqueda (nombre o correo)
            const matchesSearch = searchTerm === '' || 
                contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contacto.correo.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtro por estado
            const matchesEstado = estadoFiltro === 'todos' || 
                contacto.estado === estadoFiltro;

            return matchesSearch && matchesEstado;
        });
    }, [contactos, searchTerm, estadoFiltro]);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este contacto?')) {
            await deleteContacto(id);
        }
    };

    const handleEdit = (contacto: any) => {
        setEditingContacto(contacto);
    };

    const handleCloseEdit = () => {
        setEditingContacto(null);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setEstadoFiltro('todos');
    };

    return (
        <div className="flex items-center justify-center min-h-screen my-2 p-4">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Gestión de Contactos
                </h1>
                
                {/* Formulario de creación o edición */}
                <div className="bg-slate-200 p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-black">
                        {editingContacto ? 'Editar Contacto' : 'Nuevo Contacto'}
                    </h2>
                    <ContactoForm 
                        key={editingContacto?.id || 'new'}
                        contacto={editingContacto} 
                        onClose={handleCloseEdit}
                    />
                </div>

                {/* Filtros y búsqueda */}
                <div className="bg-slate-200 p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-black">
                        Filtros
                    </h2>
                    <div className="space-y-4">
                        {/* Barra de búsqueda */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buscar por nombre o correo
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe para buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Filtro por estado */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrar por estado
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setEstadoFiltro('todos')}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        estadoFiltro === 'todos'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Todos ({contactos.length})
                                </button>
                                <button
                                    onClick={() => setEstadoFiltro('prospecto')}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        estadoFiltro === 'prospecto'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Prospecto ({contactos.filter((c: any) => c.estado === 'prospecto').length})
                                </button>
                                <button
                                    onClick={() => setEstadoFiltro('activo')}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        estadoFiltro === 'activo'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Activo ({contactos.filter((c: any) => c.estado === 'activo').length})
                                </button>
                                <button
                                    onClick={() => setEstadoFiltro('inactivo')}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        estadoFiltro === 'inactivo'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Inactivo ({contactos.filter((c: any) => c.estado === 'inactivo').length})
                                </button>
                            </div>
                        </div>

                        {/* Botón limpiar filtros */}
                        {(searchTerm || estadoFiltro !== 'todos') && (
                            <button
                                onClick={handleClearFilters}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Lista de contactos */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">
                            Contactos 
                            <span className="text-sm text-gray-500 ml-2">
                                ({contactosFiltrados.length} {contactosFiltrados.length === 1 ? 'resultado' : 'resultados'})
                            </span>
                        </h2>
                    </div>

                    {contactosFiltrados.length === 0 ? (
                        <div className="text-center py-8 bg-slate-200 rounded-lg">
                            <p className="text-gray-600">
                                {contactos.length === 0 
                                    ? 'No hay contactos registrados' 
                                    : 'No se encontraron contactos con los filtros aplicados'}
                            </p>
                        </div>
                    ) : (
                        contactosFiltrados.map((contacto: any) => (
                            <div 
                                key={contacto.id} 
                                className="bg-slate-400 p-4 rounded-lg flex justify-between items-start"
                            >
                                <div className="flex-1">
                                    <h1 className="font-bold text-lg">{contacto.nombre}</h1>
                                    <h2 className="text-sm">{contacto.correo}</h2>
                                    <h2 className="text-sm">{contacto.telefono}</h2>
                                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-slate-600 text-white capitalize">
                                        {contacto.estado}
                                    </span>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(contacto)}
                                        className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contacto.id)}
                                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage