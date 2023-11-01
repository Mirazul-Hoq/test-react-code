import React, { useState } from 'react';
import ModalA from '../Modal/ModalA'
import ModalB from '../Modal/ModalB'
import ModalC from '../Modal/ModalC'
import { useNavigate } from 'react-router-dom';

const UsContact = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState({
        modalA: false, modalB: true, modalC: false
    });

    const toggleModalA = () => { console.log('yay'); navigate('/problem-2/contact-list')};
    const toggleModalB = () => navigate('/problem-2/uscontact-list');
    const toggleModalBClose = () => navigate('/problem-2');

    return (
        <div className="container">
            {show.modalB && <ModalB status={show.modalB} toggleModalB={toggleModalB} toggleModalA={toggleModalA} close={toggleModalBClose} />}
        </div>
    );
};

export default UsContact;