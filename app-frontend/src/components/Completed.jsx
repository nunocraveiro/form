import Checkmark from './Checkmark';
import './Completed.css';

const Completed = () => {
    return (
        <div className='completed'>
            <Checkmark />
            <p className='message1'>Thank you!</p>
            <p className='message2'>Your form has been submitted.</p>
        </div>
    )
}

export default Completed;