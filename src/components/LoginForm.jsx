import React from 'react';
import Joi from 'joi';
import Form from './common/Form';

class LoginForm extends Form {
    state = { 
        data: {
            username: "",
            password: ""
        },
        errors: {}
    }

    schemaOptions = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        console.log(this.state.data);
    }

    render() { 
        return ( 
            <div className="col-md-6 mx-auto">
                <h4>Login</h4>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Submit')}
                </form>
            </div>
         );
    }
}
 
export default LoginForm;