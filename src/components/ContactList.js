import React, { useEffect } from 'react';
import './ContactList.css';
import ContactCard from './ContactCard';

const ContactList = ({contacts}) => {
    const [contactsView, setContactsView] = React.useState(contacts);
    useEffect(() => {
        setContactsView(contacts);
    }, [contacts]);
    
    const handleDeleteContact = (id) => {
        setContactsView(contactsView.filter(contact => contact.id !== id));
        console.log(contactsView);
    };

    return (
        <ul className="contact-list">
        {contactsView.map(contact => (
            <ContactCard key={contact.id} contact={contact} onDelete={handleDeleteContact}/>
        ))}
        </ul>
    );
}

export default ContactList;