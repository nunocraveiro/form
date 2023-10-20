import Buttons from './Buttons';
import './Review.css';

const Review = ({formValues, step, setStep}) => {
    return (
        <div className='results'>
            {Object.keys(formValues).map(key => 
                <div className='resultsRow' key={key}>
                    <p>{key === 'firstName' || key === 'lastName' ? 
                        `${key.split('N')[0].charAt(0).toUpperCase()}${key.split('N')[0].slice(1)} name:` 
                        : `${key.charAt(0).toUpperCase()}${key.slice(1)}:`}
                    </p>
                    <div data-testid={key}>{`${formValues[key]}`}</div>
                </div>
            )}
            <Buttons step={step} setStep={setStep}/>
        </div>
    )
}

export default Review;