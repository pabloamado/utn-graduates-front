import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../searchBar/SearchBar';
import Pagination from '../pagination/Pagination';
import GraduateAttendanceResult from '../graduateAttendanceResult/GraduateAttendanceResult';
import './AttendanceSearcher.css';
import {ENDPOINTS} from '../config/Config';

function AttendanceSearcher({existingAttendances, onAddAttendance}) {
    const [param, setParam] = useState('');
    const [results, setResults] = useState({content: [], totalPages: 0, totalElements: 0});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        handleSearch();
    }, [currentPage, param]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_GRADUATES, {
                params: {param, page: currentPage, size: 10}
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching graduates:', error);
            alert('Hubo un problema en la busqueda de resultados. ' + error.response.data.message);
        }
    };

    const handleInputChange = (e) => {
        setParam(e.target.value);
        setCurrentPage(0);
    };

    const handleSearchClick = () => {
        setCurrentPage(0);
        handleSearch();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="attendance-searcher">
            <SearchBar
                param={param}
                onInputChange={handleInputChange}
                onSearchClick={handleSearchClick}
            />
            <GraduateAttendanceResult
                results={results.content}
                onAddAttendance={onAddAttendance}
                existingAttendances={existingAttendances}
            />
            <Pagination
                totalPages={results.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default AttendanceSearcher;