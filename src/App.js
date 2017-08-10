import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContacts from './CreateContacts'

class App extends Component {
    state = {
        contacts: []
    };

    componentDidMount(){
        ContactsAPI.getAll().then((contacts) => {
            this.setState({contacts})
        })
    }

    removeContact = ((contact) => {
        this.setState((state) => ({
            //note contacts is object literal so it needs to wrap inside paranthesis
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        ContactsAPI.remove(contact);
    });

    createContact(contact){
        ContactsAPI.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([contact])
            }));
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={()=>(
                    <ListContacts onDeleteContact={this.removeContact}
                                  contacts={this.state.contacts}/>
                )}/>
                <Route path="/create" render={({history})=>(
                    <CreateContacts
                        onCreateContact={(contact)=>{
                            this.createContact(contact);
                            history.push('/');
                        }}/>
                )}/>

            </div>
        )
    }
}

export default App;