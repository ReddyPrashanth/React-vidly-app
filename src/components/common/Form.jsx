import React, { Component } from 'react';
import Joi from 'joi';
import Input from './Input';
import Select from './Select';

class Form extends Component {

    state = {
        data: {},
        errors: {}
    }
    
    validate = () => {
        const options = { abortEarly: false };
        const {error} = this.schema.validate(this.state.data, options);
        if(!error) return null;
        const errors = {};
        for(let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({name, value}) => {
        const property = {[name]: value};
        const schema = Joi.object({[name]: this.schemaOptions[name]})
        const {error} = schema.validate(property);
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        });
        if(errors) return;
        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data  = {...this.state.data};
        data[input.name] = input.value;
        this.setState({
            data,
            errors
        });
    }

    renderInput(name, label, type="input") {
        const { data, errors } = this.state;
        return <Input 
                name={name} 
                label={label} 
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}/>
    }

    renderSelect(name, label, options=[]) {
        const { data, errors } = this.state;
        return <Select 
                name={name}
                label={label}
                options={options}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}/>
    }

    renderButton(text) {
        return  <button 
                    className="btn btn-primary btn-sm"
                    disabled={this.validate()}>
                {text}
                </button>
    }

}
 
export default Form;