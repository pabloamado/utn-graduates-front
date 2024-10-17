import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TimeSlot from '../timeSlot/TimeSlot';
import './Event.css';
import GenericForm from "../genericForm/GenericForm";
import {ENDPOINTS} from '../config/Config';

function Event({event}) {
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

    const handleDeleteTimeSlot = (deletedTimeSlotId) => {
        console.log("Deleting from state, timeslot ID:", deletedTimeSlotId);
        setTimeSlots(timeSlots.filter(slot => slot.id !== deletedTimeSlotId));
    };

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
                    <div className="div-add-timeslot-button">
                        <button className="add-timeslot-button"
                                onClick={toggleAddTimeSlot}>{showAddTimeSlot ? "Cancelar" : "Añadir sección"}</button>
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
