import { useState } from 'react';
import FormStep from './components/FormStep';
import Header from './components/Header';
import Review from './components/Review';
import Completed from './components/Completed';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
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
    <div className='App'>
      <Header step={step} />
      {step < 3 &&
        <FormStep
          step={step} 
          setStep={setStep} 
          fields={getFormFields()} 
          formValues={formValues} 
          setFormValues={setFormValues}
          temp={temp}
          setTemp={setTemp}
        />
      }
      {step === 3 &&
        <Review 
          formValues={formValues} 
          step={step} 
          setStep={setStep}
        />
      }
      {step === 4 && <Completed />}
    </div>
  )
}

export default App
