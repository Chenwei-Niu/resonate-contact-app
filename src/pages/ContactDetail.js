import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './ContactDetail.css';

const ContactDetail = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      website: '',
      username: '',
      address: '',
      company: ''
    });
    const location = useLocation();
    const { contact } = location.state;

    useEffect(() => {
        setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            website: contact.website,
            username: contact.username,
            address: contact.address,
            company: contact.company
        });
    }, [contact]);

    if (!contact) {
        return <div>Contact not found</div>;
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleUpdate = () => {
        contact.name = formData.name;
        contact.email = formData.email;
        contact.phone = formData.phone;
        contact.website = formData.website;
        contact.username = formData.username;
        contact.address = formData.address;
        contact.company = formData.company;
        console.log('Updated contact:', formData);
        setIsEditing(false);
    };

    return (
        <div className="detail-container">
            {isEditing ? (
            <div className="edit-form">
                Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                Email: <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                <button onClick={handleUpdate}>Save</button>
            </div>
            ) : (
            <div className="contact-details">
                <h3>{contact.name}</h3>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Website:</strong> {contact.website}</p>
                <p><strong>Username:</strong> {contact.username}</p>
                <p><strong>Address:</strong> {contact.address.street}, {contact.address.city}</p>
                <p><strong>Company:</strong> {contact.company.name}</p>
                <button className='edit-button' onClick={() => setIsEditing(true)}>Edit</button>
            </div>
            )}
        </div>
    );
};

export default ContactDetail;