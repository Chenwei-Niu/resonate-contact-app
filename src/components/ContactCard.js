import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactCard.css';

const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {

        navigate(`/contact/${contact.id}`, { state: { contact } });
        console.log('Card clicked:', contact);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent the card click event
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            onDelete(contact.id); // Call the delete function passed from the parent
        }
    }
    return (
        <div className="card" onClick={handleCardClick}>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.website}</p>
            <div className="buttons">
                <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );


};

export default ContactCard;