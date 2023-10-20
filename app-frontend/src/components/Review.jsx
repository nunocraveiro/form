import './Review.css';

const Results = ({formValues, step, setStep, navigate}) => {
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
            <button 
                className='button' 
                type='button' 
                data-testid="back" 
                onClick={() => {setStep(step-1); navigate(`/step${step}`);}}>
                    Back
            </button>
        </div>
    )
}

export default Results;