import React, {useState} from 'react';
import axios from 'axios';
import './EditForm.css';
import {ENDPOINTS} from '../config/Config';

function EditForm({graduate, onUpdateGraduate, onCancelEdit}) {
    const [formData, setFormData] = useState({
        specialty: graduate.specialty,
        contactType: graduate.contactType,
        fullname: graduate.fullname,
        dni: graduate.dni
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateClick = async () => {
        if (formData.specialty.trim() === '' || formData.contactType.trim() === '') {
            alert('Todos los campos son obligatorios.');
            return;
        }
        //`http://localhost:8080/graduate-service/graduate/${graduate.id}`
        try {
            const response = await axios.put(ENDPOINTS.UPDATE_GRADUATE_BY_ID(graduate.id), formData);
            onUpdateGraduate(response.data);
            onCancelEdit();
        } catch (error) {
            console.error('Error updating graduate:', error);
            alert('Hubo un problema al actualizar el registro. Por favor, intenta nuevamente. ' + error.response.data.message);
        }
    };

    const contactTypes = {
        OTHER: "Otro",
        EXTENSION: "Extension",
        RESEARCH: "Investigador",
        ADVISER: "Consejero",
        REFERRED: "Referido",
        CLUB: "Club",
        NON_TEACHING: "No docente"
    };

    return (
        <div className="edit-form">
            <label>Especialidad:
                <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    placeholder="Especialidad"
                />
            </label>
            <label>
                Tipo de Contacto:
                <select
                    name="contactType"
                    value={formData.contactType}
                    onChange={handleInputChange}
                >
                    {Object.entries(contactTypes).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
            </label>
            <button onClick={handleUpdateClick}>Actualizar</button>
            <button onClick={onCancelEdit}>Cancelar</button>
        </div>
    );
}

export default EditForm;