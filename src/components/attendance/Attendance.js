import React, {useState} from 'react';
import axios from 'axios';
import './Attendance.css';
import {ENDPOINTS} from '../config/Config';

function Attendance({attendance, onUpdate}) {
    const [present, setPresent] = useState(attendance.present);

    const handleTogglePresent = async (e) => {
        const updatedPresent = e.target.checked;
        try {
            await axios.put(ENDPOINTS.UPDATE_ATTENDANCE, {
                id: attendance.id,
                present: updatedPresent
            });
            setPresent(updatedPresent);
            onUpdate(attendance.id, updatedPresent);
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Hubo un error al intentar actualizar el presente. ' + error.response.data.message);
        }
    };

    return (
        <div className="attendance">
            <p>Nombre: {attendance.fullname}</p>
            <p>DNI:{attendance.dni}</p>
            <p>Especialidad:{attendance.specialty.name}</p>
            <label>
                Presente:
                <input
                    type="checkbox"
                    checked={present}
                    onChange={handleTogglePresent}
                />
            </label>
        </div>
    );
}

export default Attendance;