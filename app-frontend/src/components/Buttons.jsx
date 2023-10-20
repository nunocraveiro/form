import './Buttons.css';

const Buttons = ({step, setStep}) => {
    return (
        <div className='buttons'>
          {step !== 0 &&
            <button 
              className='button' 
              type='button' 
              data-testid="back" 
              onClick={() => setStep(step-1)}>
                Back
            </button>
          }
          {step === 3 ?
            <button 
              className='button submit' 
              type="submit" 
              data-testid="submit"
              onClick={() => setStep(step+1)}>
                Submit
            </button>
            : <button 
              className='button submit' 
              type="submit" 
              data-testid="submit">
                Next
            </button>
          }
        </div>
    )
}

export default Buttons;