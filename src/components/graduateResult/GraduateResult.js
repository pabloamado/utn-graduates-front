import React, { useState } from 'react';
import './GraduateResult.css'
import EditForm from "../editForm/EditForm";

function GraduateResult({ results, onUpdateGraduate, onDeleteGraduate }) {
    const [editId, setEditId] = useState(null);

    const handleEditClick = (id) => {
        setEditId(id);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("¿Estás seguro de que deseas borrar este registro?")) {
            onDeleteGraduate(id); // Llamar a la función de eliminación desde el padre
        }
    };

    const handleFinishEditClick = () => {
        setEditId(null);
    };

    const handleUpdateGraduate = (updatedGraduate) => {
        onUpdateGraduate(updatedGraduate);
        handleFinishEditClick();
    };

    if (results.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <div className="graduate-results">
            {results.map(graduate => (
                <div key={graduate.id} className="graduate-result">
                    {editId === graduate.id ? (
                        <EditForm
                            graduate={graduate}
                            onUpdateGraduate={handleUpdateGraduate}
                            onCancel={handleFinishEditClick}
                        />
                    ) : (
                        <>
                            <h3>{graduate.fullname}</h3>
                            <p>DNI: {graduate.dni}</p>
                            <p>Teléfono: {graduate.phone}</p>
                            <p>Email: {graduate.email}</p>
                            <p>Especialidad: {graduate.specialty.name}</p>
                            <p>Tipo de Contacto: {graduate.contactType.name}</p>
                            <div className="graduate-result-buttons">
                                <button onClick={() => handleEditClick(graduate.id)}>Editar</button>
                                <button onClick={() => handleDeleteClick(graduate.id)}>Borrar</button>
                            </div>

                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default GraduateResult;