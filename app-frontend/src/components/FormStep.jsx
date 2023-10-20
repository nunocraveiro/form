import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import buildSchema from '../buildSchema';
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

const MySelect = ({ label, ...props }) => {
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
};

const FormStep = ({step, setStep, fields, formValues, setFormValues, temp, setTemp}) => {
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
        setSubmitting(false);
      }}
    >
      <Form className='form_container'>
        <div className={step === 2 ? 'elements stretch' : 'elements'}>
          {step === 2 ? <SeatPicker temp={temp} setTemp={setTemp}/> : <></>}
          <div className='fields'>
            {fields.map(field => {
              if (field === 'food') {
                return (
                  <MySelect label={field} name={field} onChange={e => setTemp({...temp, ...{[field]: e.target.value}})}>
                    <option value="" selected disabled hidden>select</option>
                    <option value="no restrictions">no restrictions</option>
                    <option value="vegan">vegan</option>
                    <option value="vegetarian">vegetarian</option>
                    <option value="gluten-free">gluten-free</option>
                  </MySelect>
                )
              }
              if (field === 'seat' || field === 'allergies') {
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
              onClick={() => setStep(step-1)}>
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