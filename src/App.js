import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navgation from './components/sidebar-container/sidebar-container.component';
import DepartmentsPage from './pages/departmnts/departments.component';
import DoctorsPage from './pages/doctors/doctors.component';
import HomePage from './pages/home-page/home-page.component';
import { ReactQueryDevtools } from 'react-query/devtools';


function App() {

  return (
    <div className="App">
      <Routes >

        <Route path='/' element={<Navgation />}>
          <Route index element={<HomePage />} />
          <Route path='/doctors' element={<DoctorsPage />} />
          <Route path='/departments' element={<DepartmentsPage />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

    </div>
  );
}

export default App;
