import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mijanur Rahman',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Bangladesh'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Mail" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <big>Enter your Contact Data</big>
                {form}
            </div>
        );
    }
}

export default ContactData;