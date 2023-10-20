import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import SeatPicker from './SeatPicker';
import './FormStep.css';

const placeholders = {
  firstName: 'Jane', 
  lastName: 'Doe', 
  age: '25',
  phone: '+1 2345678', 
  email: 'janedoe@gmail.com',
  seat: 'A5',
  food: 'vegan',
  allergies: 'peanuts, soy'
};

const MyTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className='super_container'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className='input_container'>
        <input className="text-input" data-testid={props.name} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
          ) : null}
      </div>
    </div>
  );
};

// Ideal solution with the food input as a select:
/* const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='super_container'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className='input_container select-wrapper'>
        <select className='select' data-testid={props.name} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
          ) : null}
      </div>
    </div>
  );
}; */

const buildSchema = (fields) => {
  const schemaObj = {};
  fields.forEach(field => {
    if (field === 'firstName' || field === 'lastName') {
      const fieldWord = field.split('N')[0];
      const fieldName = `${fieldWord.charAt(0).toUpperCase()}${fieldWord.slice(1)} name`;
      schemaObj[field] = Yup.string()
        .matches(/^[a-zA-Z]*$/, `${fieldName} should not contain numbers`)
        .required(`${fieldName} is a required field`)
    }
    if (field === 'age') {
      schemaObj[field] = Yup.string()
        .matches(/^\d*[1-9]\d*$/, 'Age should be positive')
        .required('Age must be a number')
    }
    if (field === 'email') {
      schemaObj[field] = Yup.string()
        .email('Email should have correct format')
        .required('Email is a required field')
    }
    if (field === 'phone') {
      schemaObj[field] = Yup.string()
        .matches(/^[0-9+\s]*$/, 'Phone number should not contain letters')
        .required('Phone number is a required field')
    }
    if (field === 'seat') {
      schemaObj[field] = Yup.string()
        .matches(/^[0-9]{1,2}[a-zA-Z]$/, 'Seat should have correct format')
        .required('Seat is a required field')
    }
    if (field === 'food' || field === 'allergies') {
      const fieldName = field.charAt(0).toUpperCase()+field.slice(1);
      schemaObj[field] = Yup.string()
        .matches(/^[a-zA-Z,\s]*$/, `${fieldName} should have correct format`)
        .required(`${fieldName} is a required field`)
    }
  })
  return schemaObj;
}

const FormStep = ({step, setStep, fields, formValues, setFormValues, temp, setTemp, navigate}) => {
  return (
    <>
    <Formik
      enableReinitialize
      initialValues={Object.values(temp).every(el => el === '') ? formValues
        : {...formValues, ...{seat: temp.seat, food: temp.food, allergies: temp.allergies}}}
      validationSchema={Yup.object(buildSchema(fields))}
      onSubmit={(values, { setSubmitting }) => {
        setFormValues({...formValues, ...values});
        setStep(step+1);
        navigate(`/step${step+2}`);
        setSubmitting(false);
      }}
    >
      <Form className='form_container'>
        <div className={step === 2 ? 'elements stretch' : 'elements'}>
          {step === 2 ? <SeatPicker temp={temp} setTemp={setTemp}/> : <></>}
          <div className='fields'>
            {fields.map(field => {
              // Ideal solution with the food input as a select:
              /* if (field === 'food') {
                return (
                  <MySelect label={field} name={field} onChange={e => setTemp({...temp, ...{tempFood: e.target.value}})}>
                    <option value="">select</option>
                    <option value="no restrictions">no restrictions</option>
                    <option value="vegan">vegan</option>
                    <option value="vegetarian">vegetarian</option>
                    <option value="gluten-free">gluten-free</option>
                  </MySelect>
                )
              } */
              if (field === 'seat' || field === 'food' || field === 'allergies') {
                return (
                  <MyTextInput
                    key={field}
                    label={field}
                    name={field}
                    placeholder={placeholders[field]}
                    type='text'
                    onChange={e => setTemp({...temp, ...{[field]: e.target.value}})}
                  />
                )
              }
              return (
                <MyTextInput
                  key={field}
                  label={field === 'firstName' || field === 'lastName' ? `${field.split('N')[0]} name` : field}
                  name={field}
                  placeholder={placeholders[field]}
                  type='text'
                />
              )
            })}
          </div>
        </div>
        <div className='buttons'>
          {step === 0 ? <></> : 
            <button 
              className='button' 
              type='button' 
              data-testid="back" 
              onClick={() => {setStep(step-1); navigate(`/step${step}`);}}>
                Back
            </button>
          }
          <button 
            className='button submit' 
            type="submit" 
            data-testid="submit">
              {step === 2 ? 'Submit' : 'Next'}
          </button>
        </div>
      </Form>
    </Formik>
    </>
  )
};

export default FormStep;