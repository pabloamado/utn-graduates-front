import React, {useEffect, useState} from 'react';
import axios from "axios";
import InputRow from '../InputRow/InputRow';
import ListContainer from '../ListContainer/ListContainer';
import './RegisterLoader.css';
import {ENDPOINTS} from "../config/Config";
import GraduateForm from '../GraduateForm/GraduateForm';

function RegisterLoader() {
    const [specialty, setSpecialty] = useState('');
    const [contactType, setContactType] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [contactTypes, setContactTypes] = useState([]);
    const [isGraduateFormVisible, setGraduateFormVisible] = useState(false);

    useEffect(() => {
        fetchSpecialties();
        fetchContactTypes();
    }, []);

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get(ENDPOINTS.SPECIALTIES);
            setSpecialties(response.data);
        } catch (error) {
            console.error("Error fetching specialties:", error);
            alert("Hubo un error al buscar las especialidades: " + error.response.data.message);
        }
    };

    const fetchContactTypes = async () => {
        try {
            const response = await axios.get(ENDPOINTS.CONTACT_TYPES);
            setContactTypes(response.data);
        } catch (error) {
            console.error("Error fetching contact types:", error);
            alert("Hubo un error al buscar los tipos de contacto: " + error.response.data.message);
        }
    };

    const handleCreateSpecialty = async () => {
        if (!specialty) return;
        try {
            await axios.post(ENDPOINTS.SPECIALTIES, {name: specialty});
            await fetchSpecialties();
            setSpecialty('');
        } catch (error) {
            console.error("Error creating specialty:", error);
            alert("Hubo un error al crear la especialidad: " + error.response.data.message);
        }
    };

    const handleCreateContactType = async () => {
        if (!contactType) return;
        try {
            await axios.post(ENDPOINTS.CONTACT_TYPES, {name: contactType});
            await fetchContactTypes();
            setContactType('');
        } catch (error) {
            console.error("Error creating contact type:", error);
            alert("Hubo un error al crear el tipo de contacto: " + error.response.data.message);
        }
    };

    const handleDeleteSpecialty = async (name) => {
        try {
            await axios.delete(ENDPOINTS.DELETE_SPECIALTY(name));
            await fetchSpecialties();
        } catch (error) {
            console.error("Error deleting specialty:", error);
            alert("Hubo un error al intentar borrar una especialidad: " + error.response.data.message);
        }
    };

    const handleDeleteContactType = async (name) => {
        try {
            await axios.delete(ENDPOINTS.DELETE_CONTACT_TYPE(name));
            await fetchContactTypes();
        } catch (error) {
            console.error("Error deleting contact type:", error);
            alert("Hubo un error al intentar borrar un tipo de contacto: " + error.response.data.message);
        }
    };

    const toggleGraduateForm = () => {
        setGraduateFormVisible(!isGraduateFormVisible);
    };

    return (
        <div className="register-loader">
            {/* Specialty input */}
            <InputRow
                title="Especialidad"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                onSubmit={handleCreateSpecialty}
                placeholder="Nueva Especialidad"
                buttonText="Agregar Especialidad"
            />

            {/* Specialty list */}
            <ListContainer items={specialties} onDelete={handleDeleteSpecialty}/>

            {/* Contact type input */}
            <InputRow
                title="Tipo de contacto"
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                onSubmit={handleCreateContactType}
                placeholder="Nuevo tipo de contacto"
                buttonText="Agregar Tipo"
            />

            {/* Contact type list */}
            <ListContainer items={contactTypes} onDelete={handleDeleteContactType}/>

            <div>
                <div>
                    <h2>Graduados</h2>
                </div>
                <div>
                    <button className="div-add-register-button" onClick={toggleGraduateForm}>
                        {!isGraduateFormVisible ? "Agregar" : "Cancelar"}
                    </button>
                </div>
                <div className="graduate-form-container">
                    {isGraduateFormVisible && (
                        <GraduateForm
                            graduate={null}
                            mode="create"
                            onUpdateGraduate={null}
                            onCancel={toggleGraduateForm}/>
                    )}
                </div>
            </div>

        </div>
    );
}

export default RegisterLoader;