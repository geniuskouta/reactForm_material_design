import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        city: '',
        bio: '',
        isEmpty: false
    }

    //Proceed to next step
    nextStep = () =>{
        const { step, firstName, lastName, email, occupation, city, bio } = this.state;
        switch(step){
            case 1:
                if(firstName && lastName && email){
                  return this.setState({
                    step: step + 1,
                    isEmpty: false
                  });
                }
                return this.setState({
                    isEmpty: true
                });
            case 2:
                if(occupation && city && bio){
                    return this.setState({
                      step: step + 1,
                      isEmpty: false
                    });
                }
                return this.setState({
                    isEmpty: true
                });
            default:
                return this.setState({
                    step: step + 1
                });
        }
    }
    //Go back to previous step
    prevStep = () =>{
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    //Handle fields change
    handleChange = input => e =>{
        this.setState({
            //whatever the input is, it will be handled
            [input]: e.target.value
        });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, occupation, city, bio, isEmpty } = this.state;
        const values = {firstName, lastName, email, occupation, city, bio, isEmpty};

        switch(step){
            case 1:
                return (
                    <FormUserDetails
                     nextStep={this.nextStep}
                     handleChange={this.handleChange}
                     values={values}
                    />
                )
            case 2:
                return(
                    <FormPersonalDetails
                     nextStep={this.nextStep}
                     prevStep={this.prevStep}
                     handleChange={this.handleChange}
                     values={values}
                    />
                )
            case 3:
                return(
                    <Confirm
                     nextStep={this.nextStep}
                     prevStep={this.prevStep}
                     values={values}
                    />
                )
            case 4:
                return <Success />;
            default:
                return ;
            }
    }
}

export default UserForm;
