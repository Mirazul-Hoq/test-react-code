import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ status, close, data }) {


    return (
        <>
            {/* <Button variant="primary" onClick={toggleModalB}>
                Launch demo modal
            </Button> */}

            <Modal show={status} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data.country.id}: {data.country.name}
                </Modal.Body>
                <Modal.Footer>

                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={close} >Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;