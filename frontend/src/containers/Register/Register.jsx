import React from 'react';

import Field from '../../components/FormField';
import {NOTIFY_ERROR, NOTIFY_INFO} from '../../lib/constants';
import {userCreate} from '../../lib/user/actions';
import {registerRequest} from '../../lib/request/actions';
import {notify, hideNotification} from '../../lib/notification/actions';

export default class Register extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            telephone: ''
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        let {email, password, telephone} = this.state;
        let action = userCreate(email, password, telephone);
        let result = this.props.dispatch(action);
        if (result.err) {
            this.props.dispatch(notify(NOTIFY_ERROR, result.msg));
        } else {
            this.props.dispatch(notify(NOTIFY_INFO, 'Pending...'));
            this.props.dispatch(registerRequest(email, password, telephone));
            this.setState({
                email: '',
                password: '',
                telephone: ''
            });
        }
    }

    handleChange(ev) {
        ev.preventDefault();
        this.props.dispatch(hideNotification());
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        return (
            <section className="section">
            <div className="content">
                <h2>Register form</h2>
                <form onSubmit={this.onSubmit}>
                    <p className="control">
                        <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                    </p>
                    <p className="control">
                        <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                    </p>
                    <p className="control">
                        <Field name="telephone" label="Telephone" binding={this.handleChange}/>
                    </p>
                    <p className="control">
                        <button type="submit" className="button is-success">
                            Register
                        </button>
                    </p>
                </form>
            </div>
            </section>
        )
    }
}