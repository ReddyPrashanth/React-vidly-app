import React from 'react';
import Joi from 'joi';
import Form from './common/Form';

class RegisterForm extends Form {
    state = { 
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
    }

    schemaOptions = {
        username: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        console.log(this.state.data);
    }

    render() { 
        return ( 
            <div className="col-md-6 mx-auto">
                <h4>Register</h4>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Submit")}
                </form>
            </div>
         );
    }
}
 
export default RegisterForm;