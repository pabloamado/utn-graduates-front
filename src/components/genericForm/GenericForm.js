import React, {useState} from 'react';
import axios from 'axios';
import './GenericForm.css';

function GenericForm({url, onSubmit, showDateField}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevenir doble envío
        setIsSubmitting(true); // Indicamos que estamos enviando
        try {
            const response = await axios.post(url, formData);
            onSubmit(response.data);
            setFormData({
                name: '',
                date: '',
                startTime: '',
                endTime: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Hubo un problema al intentar enviar el formulario. ' + error.response.data.message);
        } finally {
            setIsSubmitting(false); // Restablecer el estado
        }

    };

    return (
        <div className="generic-form">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nombre:</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    <span>Hora de comienzo:</span>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    <span>Hora de finalización:</span>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                    />
                </label>
                {showDateField && (
                    <label>
                        <span>Fecha:</span>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </label>
                )}
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default GenericForm;