import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './EditForm.css';
import {ENDPOINTS} from '../config/Config';

function EditForm({graduate, onUpdateGraduate, onCancel}) {
    const [formData, setFormData] = useState({
        specialty: graduate.specialty || { name: "" },
        contactType: graduate.contactType || { name: "" },
        fullname: graduate.fullname,
        dni: graduate.dni,
        genre: graduate.genre,
        phone: graduate.phone || null,
        email: graduate.email
    });
    const [specialtyOptions, setSpecialtyOptions] = useState([]);
    const [contactTypeOptions, setContactTypeOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [specialtyResponse, contactTypeResponse] = await Promise.all([
                    axios.get(ENDPOINTS.SPECIALTIES),
                    axios.get(ENDPOINTS.CONTACT_TYPES)
                ]);
                setSpecialtyOptions(specialtyResponse.data);
                setContactTypeOptions(contactTypeResponse.data);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };
        fetchOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value === "" ? null : value // Cambia aquí para que se envíe null
        }));
    };
    const handleUpdateClick = async () => {
        try {
            const response = await axios.put(ENDPOINTS.GRADUATE_BY_ID(graduate.id), formData);
            onUpdateGraduate(response.data);
            onCancel();
        } catch (error) {
            console.error('Error updating graduate:', error);
            alert('Hubo un problema al actualizar el registro. Por favor, intenta nuevamente. ' + error.response.data.message);
        }
    };

    return (
        <div className="edit-form">
            <h3>{graduate.fullname}</h3>
            <p>DNI: {graduate.dni}</p>
            <label>Teléfono:
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </label>
            <label>Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <label>Especialidad:
                <select
                    name="specialty"
                    value={formData.specialty.name}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione una especialidad</option>
                    {specialtyOptions.map((specialty, index) => (
                        <option key={index} value={specialty}>{specialty}</option>
                    ))}
                </select>
            </label>
            <label>Tipo de Contacto:
                <select
                    name="contactType"
                    value={formData.contactType.name}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un tipo de contacto</option>
                    {contactTypeOptions.map((contactType, index) => (
                        <option key={index} value={contactType}>{contactType}</option>
                    ))}
                </select>
            </label>
            <div className="edit-form-buttons">
                <button onClick={handleUpdateClick}>Actualizar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>

        </div>
    );
}

export default EditForm;