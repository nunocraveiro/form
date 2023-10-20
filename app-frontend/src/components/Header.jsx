import './Header.css';

const Header = ({step}) => {
    return (
        <div className='step_info'>
            <p className={step === 0 ? 'step_item active' : 'step_item'} data-testid='title'>Step 1: Personal Info</p>
            <p className={step === 1 ? 'step_item active' : 'step_item'} data-testid='title'>Step 2: Contact</p>
            <p className={step === 2 ? 'step_item active' : 'step_item'} data-testid='title'>Step 3: Ticket Details</p>
            <p className={step === 3 ? 'step_item active' : 'step_item'} data-testid='title'>Step 4: Review</p>
        </div>
    )
}

export default Header;