import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Event from '../event/Event';
import GenericForm from "../genericForm/GenericForm";
import './EventManager.css';
import Pagination from "../pagination/Pagination";
import {ENDPOINTS} from '../config/Config';

function EventManager() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showAddEventForm, setShowAddEventForm] = useState(false);

    useEffect(() => {
        loadEvents(currentPage);
    }, [currentPage]);

    const loadEvents = async (page) => {
        try {
            const response = await axios.get(ENDPOINTS.GET_PAGINATED_EVENTS(page));
            setEvents(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error loading events:', error);
            alert('Hubo un problema al intentar cargar los eventos. ' + error.response.data.message);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const toggleAddEventForm = () => {
        setShowAddEventForm(!showAddEventForm);
    };

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        toggleAddEventForm();
    };

    const handleDeleteEvent = async (deletedEventId) => {
        try {
            await axios.delete(ENDPOINTS.DELETE_EVENT(deletedEventId));
            setEvents(events.filter(event => event.id !== deletedEventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Hubo un problema al intentar eliminar el evento. ' + error.response.data.message);
        }
    }

    return (
        <div className="event-manager">
            <h2>Panel de Eventos</h2>
            <div className="div-add-event-button">
                <button className="add-event-button" onClick={toggleAddEventForm}>
                    {showAddEventForm ? 'Cancelar' : 'Añadir Evento'}
                </button>
            </div>
            {showAddEventForm && (
                <GenericForm
                    url={ENDPOINTS.POST_EVENT}
                    onSubmit={handleAddEvent}
                    showDateField={true}
                />
            )}
            <div className="events-list">
                {events.map(event => (
                    <Event key={event.id} event={event} onDelete={handleDeleteEvent}/>
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageClick}
            />
        </div>
    );
}

export default EventManager;