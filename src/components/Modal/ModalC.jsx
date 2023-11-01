import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ status, close, data }) {
    return (
        <Modal show={status} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Contact details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Id: {data.country.id}</p>
                <p>Country: {data.country.name}</p>
                <p>Phone: {data.phone}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-lg btn-outline-warning" type="button" onClick={close} >Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default Example;