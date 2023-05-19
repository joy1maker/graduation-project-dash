import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryProvider } from './react-query/RQ';
import { BrowserRouter } from 'react-router-dom';
import { DepartmentProvider } from './context/department.context';
import { ModalsProvider } from './context/modals.context';
import { DoctorsProvider } from './context/doctors.context';
import { FormsProvider } from './context/forms.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ModalsProvider>
          <DoctorsProvider>
            <DepartmentProvider>
              <FormsProvider>
                <App />
              </FormsProvider>
            </DepartmentProvider>
          </DoctorsProvider>
        </ModalsProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
