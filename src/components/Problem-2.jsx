import React, { useState } from 'react';
import ModalA from './Modal/ModalA'
import ModalB from './Modal/ModalB'
import ModalC from './Modal/ModalC'
import { useNavigate } from 'react-router-dom';

const Problem2 = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState({
        modalA: false, modalB: false, modalC: false
    });

    const modalAHandler = () => {
        navigate('/problem-2/contact-list');
    }

    const modalBHandler = () => {
        navigate('/problem-2/uscontact-list');
    }

    const toggleModalA = () => setShow(prev => ({ ...prev, modalA: !prev.modalA }))
    const toggleModalAClose = () => setShow(prev => ({ ...prev, modalA: false }))
    const toggleModalB = () => setShow(prev => ({ ...prev, modalB: !prev.modalB }))
    const toggleModalBClose = () => setShow(prev => ({ ...prev, modalB: false }))
    const toggleModalC = () => setShow(prev => ({ ...prev, modalC: !prev.modalC }))

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={modalAHandler}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={modalBHandler}>US Contacts</button>
                </div>

            </div>
            {show.modalA && <ModalA status={show.modalA} toggleModalA={toggleModalA} toggleModalB={toggleModalB} close={toggleModalAClose} toggleModalC={toggleModalC} />}
            {show.modalB && <ModalB status={show.modalB} toggleModalB={toggleModalB} toggleModalA={toggleModalA} close={toggleModalBClose} toggleModalC={toggleModalC} />}
            {show.modalC && <ModalC status={show.modalC} close={toggleModalC} />}
        </div>
    );
};

export default Problem2;