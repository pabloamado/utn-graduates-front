import React, {useState} from 'react';
import TimeSlot from '../timeSlot/TimeSlot';
import './Event.css';
import GenericForm from "../genericForm/GenericForm";
import {ENDPOINTS} from '../config/Config';

function Event({event, onDelete}) {
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [showAddTimeSlot, setShowAddTimeSlot] = useState(false);
    const [newTimeSlot, setNewTimeSlot] = useState({name: '', startTime: '', endTime: ''});
    const [timeSlots, setTimeSlots] = useState(event.timeSlots || []);
    const toggleTimeSlots = () => {
        setShowTimeSlots(!showTimeSlots);
    };

    const toggleAddTimeSlot = () => {
        setShowAddTimeSlot(!showAddTimeSlot);
    };

    const handleAddTimeSlot = async (newTimeSlotData) => {
        setTimeSlots([...timeSlots, newTimeSlotData]);
        setNewTimeSlot({name: '', startTime: '', endTime: ''});
        setShowAddTimeSlot(false);
    };

    const handleDeleteTimeSlot = (timeSlotId) => {
        console.log("Deleting from state, timeslot ID:", timeSlotId);
        setTimeSlots(timeSlots.filter(slot => slot.id !== timeSlotId));
    };

    const handleDeleteEvent = async () => {
        if (window.confirm("¿Estás seguro de que deseas borrar este evento?")) {
            onDelete(event.id);
        }
    }
    return (
        <div className="event">
            <div className="event-header" onClick={toggleTimeSlots}>
                <h3>{event.name}</h3>
                <p>Fecha: {event.date}</p>
                <p>Hora de comienzo: {event.startTime}</p>
                <p>Hora de finalizacion: {event.endTime}</p>
            </div>
            {showTimeSlots && (
                <div className="timeslots-section">
                    <div className="div-add-timeslot-buttons">
                        <button onClick={toggleAddTimeSlot}>{showAddTimeSlot ? "Cancelar" : "Añadir sección"}</button>
                        <button onClick={handleDeleteEvent}>Eliminar Evento</button>
                    </div>
                    {showAddTimeSlot && (
                        <GenericForm
                            url={ENDPOINTS.POST_TIMESLOT_BY_EVENT_ID(event.id)}
                            onSubmit={handleAddTimeSlot}
                            showDateField={false} // No mostrar campo de fecha para timeslots
                        />
                    )}
                    <div className="timeslots-list">
                        {timeSlots.map((timeSlot) => (
                            <TimeSlot key={timeSlot.id} timeSlot={timeSlot} onDelete={handleDeleteTimeSlot}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Event;
