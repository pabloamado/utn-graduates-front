import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './GraduateForm.css';
import {ENDPOINTS} from '../config/Config';

function GraduateForm({onCancel}) {
    const [formData, setFormData] = useState({
        specialty: {name: null},
        contactType: {name: null},
        fullname: null,
        dni: null,
        genre: null,
        phone: null,
        email: null
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
                alert("Se produjo el siguiente error: " + error.response.data.message);
            }
        };
        fetchOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value === "" ? null : value
        }));
    };

    const handleSubmit = async () => {

        try {
            await axios.post(ENDPOINTS.CREATE_GRADUATE, formData);
            setFormData({
                specialty: {name: ""},
                contactType: {name: ""},
                fullname: "",
                dni: "",
                genre: "",
                phone: "",
                email: ""
            });
            onCancel();
        } catch (error) {
            console.error("Error creando el graduado:", error);
            const errorMessage = error.response?.data?.message || "Ocurrió un error inesperado.";
            alert("Hubo un problema al crear el graduado. " + errorMessage);
        }
    };

    return (
        <div className="graduate-form">
            <h3>Nombre:
                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                />
            </h3>
            <h3>DNI:
                <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                />
            </h3>
            <h3>Género:
                <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione género</option>
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Femenino</option>
                </select>
            </h3>
            <h3>Teléfono:
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </h3>
            <h3>Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </h3>
            <h3>Especialidad:
                <select
                    name="specialty"
                    value={formData.specialty.name}
                    onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        specialty: {name: e.target.value}
                    }))}
                >
                    <option value="">Seleccione una especialidad</option>
                    {specialtyOptions.map((specialty, index) => (
                        <option key={index} value={specialty}>{specialty}</option>
                    ))}
                </select>
            </h3>
            <h3>Tipo de Contacto:
                <select
                    name="contactType"
                    value={formData.contactType.name}
                    onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        contactType: {name: e.target.value}
                    }))}
                >
                    <option value="">Seleccione un tipo de contacto</option>
                    {contactTypeOptions.map((contactType, index) => (
                        <option key={index} value={contactType}>{contactType}</option>
                    ))}
                </select>
            </h3>
            <div className="graduate-form-buttons">
                <button onClick={handleSubmit}>Registrar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
}

export default GraduateForm;