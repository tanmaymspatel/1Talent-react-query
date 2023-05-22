import { Routes, Route, Navigate } from 'react-router-dom'
import Employees from '../../pages/Employees';
import { NoPageFound } from './NoPageFound';

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route path="/employees" element={<Employees />} />
            <Route path='*' element={<NoPageFound />} />
        </Routes>
    )
};

export default Routing;
