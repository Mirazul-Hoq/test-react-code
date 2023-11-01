import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalC from './ModalC'
import { useNavigate } from 'react-router-dom';

function Example({ status, toggleModalA, toggleModalB, close, toggleModalC }) {
    const [state, setState] = useState([]);
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(prev => !prev)
    const [country, setCountry] = useState()
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

    useEffect(() => {
        if (search) {
            const timer = setTimeout(() => {
                const apiUrl = `https://contact.mediusware.com/api/contacts/?search=${search}`;
    
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
            }, 3000);
    
            return () => clearTimeout(timer);
        }
        
    }, [search])


    const data = isChecked ? state.results.filter(item => Number(item.country.id) % 2 === 0) : state.results;
    const inputHandler = e => {
        setSearch(e.target.value)
    }

    const countryHandler = data => {
        setCountry(data)
        toggleOpen()
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const apiUrl = `https://contact.mediusware.com/api/contacts/?search=${search}`;

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

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10;
        console.log(bottom);
        if (bottom) {

        }
    }

    return (
        <>
            <Modal show={status} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>All contact list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onScroll={handleScroll}>
                        <form className="row gy-2 gx-3 align-items-center mb-4">
                            <div className="col-auto">
                                <input type="text" name='country' className="form-control" placeholder="Country" onChange={inputHandler} />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary"
                                    onClick={submitHandler}
                                >Submit</button>
                            </div>
                        </form>
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-between'>
                        <div className="checkbox-wrapper">
                            <label>
                                <input type="checkbox" checked={isChecked} onChange={checkToggler} /> {" "}
                                <span>Only Even</span>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button style={{ background: '#46139f' }} className="btn text-white" type="button" onClick={toggleModalA}>All Contacts</button>
                            <button style={{ background: '#ff7f50' }} className="btn text-white" type="button" onClick={toggleModalB}>US Contacts</button>
                            <button style={{ border: '#46139f', background: '#fff' }} className="btn" type="button" onClick={close}>Close</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            {open && <ModalC status={open} close={toggleOpen} data={country} />}
        </>
    );
}

export default Example;