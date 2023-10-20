import './SeatPicker.css';

const SeatPicker = ({temp, setTemp}) => {
    const seatLts = ['A', 'B', 'C', 'D'];
    const seatNums = ['1', '2', '0', '3', '4', '5', '6', '0', '7', '8'];

    const picker = e => {
        if (e.target.tagName === 'DIV' && e.target.parentElement.className.includes('row')) {
            const seat = temp.seat;
            if (e.target.textContent === seat) {
                return setTemp({...temp, ...{seat: ''}});
            }
            if (seat !== '') {
                const rows = [...e.target.parentElement.parentElement.childNodes];
                rows.splice(0, 1);
                const row = [...rows.find(row => row.className.includes(seat.slice(-1))).childNodes];
                if (!row[seat.slice(0, seat.length-1)]) setTemp({...temp, ...{seat: ''}});
                else row[seat.slice(0, seat.length-1)].classList.remove('chosen');
            }
            e.target.classList.add('chosen');
            return setTemp({...temp, ...{seat: e.target.textContent}});
        }
    }
    
    return (
        <div className='seat_picker' onClick={picker}>
            <div className='picker_text'>Choose a seat:</div>
            {seatLts.map(row => 
                <div className={`row ${row}`} key={row}>
                    {seatNums.map((num, index) => {
                        if (num === '0') return <p key={`${row}p${index}`}></p>;
                        return <div className={`${num}${row}` === temp.seat ? 'chosen' : ''} key={`${num}${row}`}>
                                {`${num}${row}`}
                            </div>;
                    })}
                </div>
            )}
        </div>
    )
}

export default SeatPicker;