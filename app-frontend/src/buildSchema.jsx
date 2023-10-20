import * as Yup from 'yup';

const buildSchema = fields => {
    const schemaObj = {};
    fields.forEach(field => {
      if (field === 'firstName' || field === 'lastName') {
        const fieldWord = field.split('N')[0];
        const fieldName = `${fieldWord.charAt(0).toUpperCase()}${fieldWord.slice(1)} name`;
        schemaObj[field] = Yup.string()
          .matches(/^[a-zA-Z]*$/, `${fieldName} is invalid`)
          .required(`${fieldName} is a required field`)
      }
      if (field === 'age') {
        schemaObj[field] = Yup.string()
          .matches(/^\d*[1-9]\d*$/, 'Age is invalid')
          .required('Age is a required field')
      }
      if (field === 'email') {
        schemaObj[field] = Yup.string()
          .email('Email should have correct format')
          .required('Email is a required field')
      }
      if (field === 'phone') {
        schemaObj[field] = Yup.string()
          .matches(/^[0-9+\s]*$/, 'Phone number is invalid')
          .required('Phone number is a required field')
      }
      if (field === 'seat') {
        schemaObj[field] = Yup.string()
          .matches(/^[0-9]{1,2}[a-zA-Z]$/, 'Seat is invalid')
          .required('Seat is a required field')
      }
      if (field === 'food' || field === 'allergies') {
        const fieldName = field.charAt(0).toUpperCase()+field.slice(1);
        schemaObj[field] = Yup.string()
          .matches(/^[a-zA-Z,\s]*$/, `${fieldName} is invalid`)
          .required(`${fieldName} is a required field`)
      }
    })
    return schemaObj;
}

export default buildSchema;
