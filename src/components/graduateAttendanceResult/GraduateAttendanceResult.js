import React from 'react';
import './GraduateAttendanceResult.css';

function GraduateAttendanceResult({ results, onAddAttendance, existingAttendances }) {

    const isGraduateAlreadyAdded = (graduate) => {
        const isAdded = existingAttendances.some(attendance => attendance.graduateId === graduate.id);
        console.log(`Graduate ${graduate.id} is already added: `, isAdded);
        return isAdded;
    };

    if (results.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <div className="graduate-results">
            {results.map(graduate => (
                <div key={graduate.id} className="graduate-result">
                    <h3>{graduate.fullname}</h3>
                    <p>DNI: {graduate.dni}</p>
                    <p>Especialidad: {graduate.specialty}</p>
                    <button
                        onClick={() => onAddAttendance(graduate)}
                        disabled={isGraduateAlreadyAdded(graduate)}
                    >
                        {isGraduateAlreadyAdded(graduate) ? 'Añadido' : 'Añadir'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default GraduateAttendanceResult;