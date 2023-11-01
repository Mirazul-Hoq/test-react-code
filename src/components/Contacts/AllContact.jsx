import React, { useState } from 'react';
import ModalA from '../Modal/ModalA'
import ModalB from '../Modal/ModalB'
import ModalC from '../Modal/ModalC'
import { useNavigate } from 'react-router-dom';

const AllContact = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState({
        modalA: true, modalB: false, modalC: false
    });

    const toggleModalA = () => navigate('/problem-2/contact-list');
    const toggleModalAClose = () => navigate('/problem-2');
    const toggleModalB = () => navigate('/problem-2/uscontact-list');

    return (

        <div className="container">
            {show.modalA && <ModalA status={show.modalA} toggleModalA={toggleModalA} toggleModalB={toggleModalB} close={toggleModalAClose} />}
        </div>
    );
};

export default AllContact;