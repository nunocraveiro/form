import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FormStep from './components/FormStep';
import Header from './components/Header';
import Results from './components/Results';
import './App.css';

function App() {
  const url = new URL(window.location.toLocaleString());
  const navigate = useNavigate();
  const [step, setStep] = url.pathname === '/' || url.pathname === '/step1' ? 
    useState(0)
    : useState(url.pathname[url.pathname.length-1]-1);
  const [formValues, setFormValues] = useState({
    firstName: '', 
    lastName: '', 
    age: '',
    phone: '', 
    email: '',
    seat: '',
    food: '',
    allergies: ''
  });
  const [temp, setTemp] = useState({
    seat: '',
    food: '',
    allergies: ''
  });

  const getFormFields = () => {
    const fields = Object.keys(formValues);
    switch (step) {
      case 0:
        return fields.slice(0, 3);
      case 1:
        return fields.slice(3, 5);
      case 2: 
      return fields.slice(5);
    }
  };

  return (
    <>
      <Routes>
        {["/", "/step1", "/step2", "/step3", "/step4"].map(path => (
        <Route
          key={path}
          path={path}
          element={
            <div className='App'>
              <Header step={step} />
              {step === 3 ? 
                <Results 
                  formValues={formValues} 
                  step={step} 
                  setStep={setStep} 
                  navigate={navigate}
                />
                : <FormStep
                  step={step} 
                  setStep={setStep} 
                  fields={getFormFields()} 
                  formValues={formValues} 
                  setFormValues={setFormValues}
                  temp={temp}
                  setTemp={setTemp}
                  navigate={navigate}
                />
              }
          </div>
          }
        />
      ))}
      </Routes>
    </>
  )
}

export default App
