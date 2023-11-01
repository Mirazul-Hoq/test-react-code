import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalC from './ModalC'


function Example({ status, toggleModalA, toggleModalB, close, toggleModalC }) {
    const [state, setState] = useState([]);
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(prev => !prev)
    // console.log(state.results);
    const [country, setCountry] = useState()
    console.log(country);
    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const checkToggler = () => setIsChecked(prev => !prev)

    useEffect(() => {

        if (status == true) {
            const apiUrl = 'https://contact.mediusware.com/api/contacts/';

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setState(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                    setIsLoading(false);
                });
        }
    }, [status]);


    const data = isChecked ? state.results.filter(item => Number(item.country.id) % 2 === 0) : state.results;
    const inputHandler = e => {
        setSearch({ ...state, [e.target.name]: e.target.value })
    }

    const countryHandler = data => {
        setCountry(data)
        toggleOpen()
    }

    return (
        <>
            {/* <Button variant="primary" onClick={toggleModalA}>
                Launch demo modal
            </Button> */}

            <Modal show={status} onHide={toggleModalA}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-auto">
                        <input type="text" name='name' className="form-control" placeholder="Name" onChange={inputHandler} />
                    </div>
                    <div className="tab-content"></div>
                    {isLoading ? '' : <table className="table table-striped ">
                        <thead>
                            {data?.map((item, i) =>
                                <tr style={{ cursor: 'pointer' }} key={i} onClick={e => countryHandler(item)}>
                                    <th scope="col">{item.country.id}</th>
                                    <th scope="col">{item.country.name}</th>
                                    <th scope="col">{item.phone}</th>
                                </tr>)}
                        </thead>
                        <tbody>

                        </tbody>
                    </table>}
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={toggleModalA}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleModalA}>
                        Save Changes
                    </Button> */}

                    <div className='w-100 d-flex justify-content-between'>
                        <div className="checkbox-wrapper">
                            <label>
                                <input type="checkbox" checked={isChecked} onChange={checkToggler} />
                                <span>Only Even</span>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-lg btn-outline-primary" type="button" onClick={toggleModalA} >All Contacts</button>
                            <button className="btn btn-lg btn-outline-warning" type="button" onClick={toggleModalB} >US Contacts</button>
                            <button className="btn btn-lg btn-outline-warning" type="button" onClick={close} >Close</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            {open && <ModalC status={open} close={toggleOpen} data={country} />}
        </>
    );
}

export default Example;