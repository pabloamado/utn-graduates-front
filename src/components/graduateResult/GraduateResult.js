import React, { useState } from 'react';
import './GraduateResult.css'
import EditForm from "../editForm/EditForm";

function GraduateResult({ results, onUpdateGraduate }) {
    const [editId, setEditId] = useState(null);

    const handleEditClick = (id) => {
        setEditId(id);
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

    const translateContactType = (contactType) => {
        switch (contactType) {
            case 'OTHER':
                return 'Otro';
            case 'EXTENSION':
                return 'Extensión';
            case 'RESEARCH':
                return 'Investigador';
            case 'ADVISER':
                return 'Consejero';
            case 'REFERRED':
                return 'Referido';
            case 'CLUB':
                return 'Club';
            case 'NON_TEACHING':
                return 'No docente';
            default:
                return contactType;
        }
    };

    return (
        <div className="graduate-results">
            {results.map(graduate => (
                <div key={graduate.id} className="graduate-result">
                    <h3>{graduate.fullname}</h3>
                    <p>DNI: {graduate.dni}</p>
                    <p>Especialidad: {graduate.specialty}</p>
                    <p>Tipo de Contacto: {translateContactType(graduate.contactType)}</p>
                    {editId === graduate.id ? (
                        <EditForm
                            graduate={graduate}
                            onUpdateGraduate={handleUpdateGraduate}
                            onCancelEdit={handleFinishEditClick}
                        />
                    ) : (
                        <button onClick={() => handleEditClick(graduate.id)}>Editar</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default GraduateResult;