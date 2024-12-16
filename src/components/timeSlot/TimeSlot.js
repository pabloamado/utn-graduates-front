import React, {useState} from 'react';
import './TimeSlot.css';
import Attendance from "../attendance/Attendance";
import AttendanceSearcher from "../attendanceSearcher/AttendanceSearcher";
import axios from "axios";
import {ENDPOINTS} from '../config/Config';

function TimeSlot({timeSlot, onDelete}) {
    const [showAttendances, setShowAttendances] = useState(false);
    const [showAddAttendance, setShowAddAttendance] = useState(false);
    const [attendances, setAttendances] = useState(timeSlot.attendances);
    const [newAttendances, setNewAttendances] = useState([]);

    const toggleAttendances = () => {
        setShowAttendances(!showAttendances);
    };

    const resetNewAttendances = () => {
        setNewAttendances([]);
    }

    const toggleAddAttendance = () => {
        setShowAddAttendance(!showAddAttendance);
        resetNewAttendances()
    };

    const handleUpdateAttendance = (id, present) => {
        setAttendances(attendances.map(att =>
            att.id === id ? {...att, present} : att
        ));
    };

    const handleAddAttendance = (graduate) => {
        if (!newAttendances.some(att => att.graduateId === graduate.id)) {
            const newAttendance = {
                graduateId: graduate.id,
                present: false,
                fullname: graduate.fullname,
                dni: graduate.dni,
                specialty: graduate.specialty || {name: ""},
            };
            setNewAttendances([...newAttendances, newAttendance]);
        }
    };

    const handleSubmitAttendances = async () => {
        const updatedTimeSlot = {
            ...timeSlot,
            attendances: [...attendances, ...newAttendances].map(att => ({
                id: att.id,
                graduateId: att.graduateId,
                present: att.present,
                fullname: att.fullname,
                dni: att.dni,
                specialty: att.specialty || {name: ""},
            }))
        };

        try {
            const response = await axios.put(ENDPOINTS.UPDATE_TIMESLOT, updatedTimeSlot);
            setAttendances(response.data.attendances);
            resetNewAttendances()
            setShowAddAttendance(false);
        } catch (error) {
            console.error('Error updating timeslot:', error);
            alert('Hubo un problema al intentar actualizar. ' + error.response.data.message);
        }
    };

    const handleDeleteTimeSlot = async () => {
        try {
            if (window.confirm("¿Estás seguro de que deseas borrar esta seccion?")) {
                await axios.delete(ENDPOINTS.DELETE_TIMESLOT(timeSlot.id));
                onDelete(timeSlot.id);
            }
        } catch (error) {
            console.error('Error deleting timeslot:', error);
            alert('Hubo un problema al intentar eliminar la sección. ' + error.response.data.message);
        }
    };

    return (
        <div className="timeslot">
            <div className="timeslot-header" onClick={toggleAttendances}>
                <h4>{timeSlot.name}</h4>
                <p>Hora de comienzo: {timeSlot.startTime}</p>
                <p>Hora de finalización: {timeSlot.endTime}</p>
            </div>
            {showAttendances && (
                <div className="attendances-section">
                    <div className="attendance-buttons">
                        <button onClick={toggleAddAttendance}>{showAddAttendance ? 'Cancelar' : 'Añadir Invitado'}</button>
                        <button onClick={handleDeleteTimeSlot}>Eliminar Sección</button>
                    </div>
                    {showAddAttendance && (
                        <div>
                            <AttendanceSearcher
                                existingAttendances={[...attendances, ...newAttendances]}
                                onAddAttendance={handleAddAttendance}
                            />
                            <button onClick={handleSubmitAttendances}>Confirmar Invitados</button>
                        </div>
                    )}

                    <div className="attendance-list">
                        <div>
                            {attendances.map(attendance => (
                                <Attendance
                                    key={attendance.id}
                                    attendance={attendance}
                                    onUpdate={handleUpdateAttendance}
                                />
                            ))}
                            {newAttendances.map(attendance => (
                                <Attendance
                                    key={attendance.graduateId}
                                    attendance={attendance}
                                    onUpdate={handleUpdateAttendance}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TimeSlot;