import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState({query: query.trim()});
    };

    clearQuery = (query) => {
        this.setState({query: ''});
    };
    render() {
        const {contacts, onDeleteContact} = this.props;
        const {query} = this.state;
        let showingContacts
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }
        //sort by the name
        showingContacts.sort(sortBy('name'));

        return (

            <div className="list-contacts">
                <div className="list-contacts-top">
                    {JSON.stringify(query)}
                    <input type="text"
                           placeholder="Search Contacts"
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}
                           className="search-contacts"/>
                </div>

                {showingContacts.length !== contacts.length &&
                (<div className="showing-contacts">
                    <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                    <button onClick={(event) => this.clearQuery()}>Show All</button>
                </div>)}
                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>

        )
    }
}


export default ListContacts

