import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './ContactDetail.css';

const ContactDetail = ({onUpdateContact}) => {
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
        onUpdateContact({ ...formData, id: contact.id });
        console.log('Updated contact:', formData);
        setIsEditing(false);
    };
    const handleInputChangeAddress = (e, field) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [field]: value
            }
        });
    };

    const handleInputChangeAddressGeo = (e, field) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                geo: {
                    ...formData.address.geo,
                    [field]: value
                }
            }
        });
    };

    const handleInputChangeCompany = (e, field) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            company: {
                ...formData.company,
                [field]: value
            }
        });
    };
    return (
        <div className="detail-container">
            {isEditing ? (
            <div className="edit-form">
                Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                Email: <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                Phone: <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                Website: <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
                Username: <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                <div className='sub-title'>Address: </div>
                  <div>
                    Suite: <input type="text" name="suite" value={formData.address.suite} onChange={(e) => handleInputChangeAddress(e, 'suite')} />
                    Street: <input type="text" name="street" value={formData.address.street} onChange={(e) => handleInputChangeAddress(e, 'street')} />
                    City: <input type="text" name="city" value={formData.address.city} onChange={(e) => handleInputChangeAddress(e, 'city')} />
                    Zipcode: <input type="text" name="zipcode" value={formData.address.zipcode} onChange={(e) => handleInputChangeAddress(e, 'zipcode')} />
                    <div className='sub-title'>Geo: </div>
                      <div>
                        Lat: <input type="text" name="lat" value={formData.address.geo.lat} onChange={(e) => handleInputChangeAddressGeo(e, 'lat')} />
                        Lng: <input type="text" name="lng" value={formData.address.geo.lng} onChange={(e) => handleInputChangeAddressGeo(e, 'lng')} />
                      </div>
                  </div>
                <div className='sub-title'>Company: </div>
                  <div>
                    Name: <input type="text" name="name" value={formData.company.name} onChange={(e) => handleInputChangeCompany(e, 'name')} />
                    Catch Phrase: <input type="text" name="catchPhrase" value={formData.company.catchPhrase} onChange={(e) => handleInputChangeCompany(e, 'catchPhrase')} />
                    Bs: <input type="text" name="bs" value={formData.company.bs} onChange={(e) => handleInputChangeCompany(e, 'bs')} />
                  </div>
                <button className='edit-button'onClick={handleUpdate}>Save Changes</button>
            </div>
            ) : (
            <div className="contact-details">
                <h3>{contact.name}</h3>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Website:</strong> {contact.website}</p>
                <p><strong>Username:</strong> {contact.username}</p>
                <p><strong>Address:</strong> {contact.address.suite}, {contact.address.street}, {contact.address.city}, {contact.address.zipcode}, GEO: lat: {contact.address.geo.lat}, lng: {contact.address.geo.lng}</p>
                <p><strong>Company:</strong> {contact.company.name}, {contact.company.catchPhrase}, {contact.company.bs}</p>
                <button className='edit-button' onClick={() => setIsEditing(true)}>Edit</button>
            </div>
            )}
        </div>
    );
};

export default ContactDetail;