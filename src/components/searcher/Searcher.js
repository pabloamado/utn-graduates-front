import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../searchBar/SearchBar';
import GraduateResult from '../graduateResult/GraduateResult';
import Pagination from '../pagination/Pagination';
import './Searcher.css';
import {ENDPOINTS} from '../config/Config';

function Searcher() {
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
            alert('Hubo un problema al buscar los resultados. ' + error.response.data.message);
        }
    };

    const handleInputChange = (e) => {
        setParam(e.target.value);
    };

    const handleSearchClick = () => {
        setCurrentPage(0);
        handleSearch();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onUpdateGraduate = (updatedGraduate) => {
        setResults(prevResults => ({
            ...prevResults,
            content: prevResults.content.map(graduate =>
                graduate.id === updatedGraduate.id ? updatedGraduate : graduate
            )
        }));
    };

    const onDeleteGraduate = async (id) => {
        try {
            await axios.delete(ENDPOINTS.GRADUATE_BY_ID(id));
            setResults(prevResults => ({
                ...prevResults,
                content: prevResults.content.filter(graduate => graduate.id !== id)
            }));
        } catch (error) {
            console.error('Error deleting graduate:', error);
            alert('Hubo un problema al borrar el registro. ' + error.response.data.message);
        }
    };

    return (
        <div className="graduate-searcher">
            <SearchBar
                param={param}
                onInputChange={handleInputChange}
                onSearchClick={handleSearchClick}
            />
            <GraduateResult results={results.content} onUpdateGraduate={onUpdateGraduate} onDeleteGraduate={onDeleteGraduate}/>
            <Pagination
                totalPages={results.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Searcher;