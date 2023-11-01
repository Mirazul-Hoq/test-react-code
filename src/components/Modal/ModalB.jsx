import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ status, toggleModalB, toggleModalA, close, }) {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(prev => !prev)
    const [state, setState] = useState([]);
    // console.log(state.results);
    const [search, setSearch] = useState()
    console.log(search);

    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const checkToggler = () => setIsChecked(prev => !prev)

    useEffect(() => {

        if (status == true) {
            const apiUrl = 'https://contact.mediusware.com/api/country-contacts/United States/';

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
        const timer = setTimeout(() => {
            const apiUrl = `https://contact.mediusware.com/api/country-contacts/${search ? search : 'United States'}/`;

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
        }, 5000);

        return () => clearTimeout(timer);
    }, [search])


    const data = isChecked ? state.results.filter(item => Number(item.country.id) % 2 === 0) : state.results;
    const inputHandler = e => {
        console.log(e.target.value);
        setSearch(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()

        const apiUrl = `https://contact.mediusware.com/api/country-contacts/${search ? search : 'United States'}/`;

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

    return (
        <>
            {/* <Button variant="primary" onClick={toggleModalB}>
                Launch demo modal
            </Button> */}

            <Modal show={status} onHide={toggleModalB}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            {data.map((item, i) =>
                                <tr key={i}>
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
                    {/* <Button variant="secondary" onClick={toggleModalB}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleModalB}>
                        Save Changes
                    </Button> */}
                    <div className="checkbox-wrapper">
                        <label>
                            <input type="checkbox" checked={isChecked} onChange={checkToggler} />
                            <span>Only Even</span>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" style={{ color: '#46139f !important' }} type="button" onClick={toggleModalA} >All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button" onClick={toggleModalB} >US Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button" onClick={close} >Close</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;