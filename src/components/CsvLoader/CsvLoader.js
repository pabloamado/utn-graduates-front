import React, {useState} from 'react';
import axios from 'axios';
import './CsvLoader.css'; // Asegúrate de tener un archivo CSS para estilos si es necesario
import {ENDPOINTS} from '../config/Config';

function CsvLoader() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setErrorMessage(''); // Limpiar el mensaje de error al seleccionar un nuevo archivo
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Por favor, selecciona un archivo CSV antes de cargar.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(ENDPOINTS.UPLOAD_GRADUATES_CSV, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Graduados cargados exitosamente: ' + response.data);
            setFile(null);
            setFileName('');
        } catch (error) {
            console.error('Error uploading CSV:', error);
            // Mejorar el manejo de errores aquí
            const message = error.response?.data?.message || error.message || 'Error desconocido al cargar el archivo.';
            setErrorMessage(`Hubo un error al cargar los graduados: ${message}`);
        }
    };

    return (
        <div className="csv-loader">
            <h3>Cargar Graduados desde CSV</h3>
            <p>Las columnas obligatorias son: DNI, FULLNAME, GENRE, CONTACT_TYPE, SPECIALTY, EMAIL. Cada columna debe estar separada por ";" y no es necesario que las columnas tengan un orden especificado.</p>
            <p>Valores posibles para GENRE: "MALE", "FEMALE". </p>
            <p>Para CONTACT_TYPE, SPECIALTY: No se pueden ingresar valores que no estén dados de alta. </p>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />
            {fileName && <p>Archivo seleccionado: {fileName}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleUpload} disabled={!file}>
                Cargar
            </button>
        </div>
    );
}

export default CsvLoader;