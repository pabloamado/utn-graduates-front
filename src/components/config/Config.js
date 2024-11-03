const API_BASE_URL = "http://localhost:8080/graduate-service";

export const ENDPOINTS = {
    GET_GRADUATES: `${API_BASE_URL}/graduate/search`,
    CREATE_GRADUATE: `${API_BASE_URL}/graduate`,
    GRADUATE_BY_ID: (id) => `${API_BASE_URL}/graduate/${id}`,
    UPDATE_ATTENDANCE: `${API_BASE_URL}/attendance`,
    POST_TIMESLOT_BY_EVENT_ID: (id) => `${API_BASE_URL}/events/${id}`,
    UPDATE_TIMESLOT: `${API_BASE_URL}/timeslots`,
    DELETE_TIMESLOT: (id) => `${API_BASE_URL}/timeslots/${id}`,
    POST_EVENT: `${API_BASE_URL}/events`,
    DELETE_EVENT : (deletedEventId) => `${API_BASE_URL}/events/${deletedEventId}`,
    GET_PAGINATED_EVENTS: (page) => `${API_BASE_URL}/events?page=${page}&size=10`,
    CONTACT_TYPES: `${API_BASE_URL}/graduate/contact_type`,
    SPECIALTIES: `${API_BASE_URL}/graduate/specialty`,
    DELETE_CONTACT_TYPE : (name) => `${API_BASE_URL}/graduate/contact_type/${name}`,
    DELETE_SPECIALTY : (name) => `${API_BASE_URL}/graduate/specialty/${name}`,
    UPLOAD_GRADUATES_CSV : `${API_BASE_URL}/files`
};
