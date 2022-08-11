import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './create.users.css';
import { createUser } from './users.service';

export const Users = () => {
    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();
    const [formFields, setFormFields] = useState({ });
    const onChange = (e: any) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }
    const fieldSet = [
        [{
          id: 'firstName',
          placeholder: 'First name',
          required: true,
          type: 'text',
        },
        {
          id: 'lastName',
          placeholder: 'Last name',
          required: true,
          type: 'text',
        }],
        {
          id: 'Email',
          placeholder: 'Email',
          required: true,
          type: 'email',
        },
        {
          id: 'address1',
          placeholder: 'Address 1',
          type: 'text',
        },
        [{
          id: 'city',
          type: 'text', 
          placeholder: 'city',
        },
        {
          id: 'state',
          type: 'text',
          placeholder: 'state',
        },
        {
          id: 'zip',
          placeholder: 'zip',
          type: 'text',
        }],
        {
          id: 'phone',
          placeholder: 'phone',
          required: true,
          type: 'text',
        },
        {
          id: 'jobTitle',
          options: [
            'Engineer - lead',
            'Engineer - mid level',
            'Engineer - junion',
            'Engineer - front end focused',
            'Engineer - backend focused',
            'Engineer - full stack',
          ],
          placeholder: 'Please select job title',
          type: 'select',
        },
        {
          id: 'reason',
          placeholder: 'Describe why you are a good fit for the job you are applying for.',
          type: 'textarea',
        }
      ]
      const inputs = fieldSet.map((field: any, index: number) => {
        if (Array.isArray(field)) {
          return field.map((input: any) => {
            return (
                <input 
                    className='form-control-inline'
                    id={input.id} 
                    placeholder={input.placeholder} 
                    name={input.id} 
                    type={input.type} 
                    required={input.required} 
                    onChange={(e) => onChange(e)}
                />
            );
          }
          )
        }
        if(field.type === 'select') {
            return (
                <div key={field.id}>
                    <select 
                        className='form-control'
                        id={field.id} 
                        placeholder={field.placeholder} 
                        required={field.required} 
                        name={field.id} 
                        onChange={(e) => onChange(e)}
                    >
                        {field.options.map((option: any) => {
                            return <option key={option}>{option}</option>;
                        }
                        )}
                    </select>
                </div>
            );
        }
        
        if(field.type === 'textarea') {
            return (
                <div key={field.id}>
                    <input 
                        className='textarea'
                        id={field.id} 
                        placeholder={field.placeholder} 
                        name={field.id} 
                        type={field.type} 
                        required={field.required} 
                        onChange={(e) => onChange(e)}
                    />

                </div>
            );
        }
        return ( <div key={field.id}>
            <input 
                className='form-control'
                id={field.id} 
                placeholder={field.placeholder} 
                name={field.id} 
                type={field.type} 
                required={field.required} 
                onChange={(e) => onChange(e)}
            />
            </div>
        );
      })
      

    const handleSubmit = (e: any) => {
        e.preventDefault();
        reduxDispatch(createUser({data: formFields}));
        showThankYou()
    }
    const navigate = useNavigate();
    const routeChange = () =>{ 
      navigate('/');
    }
    const showThankYou = () => {
        alert('Thank you for your application!')
    }
    return (
        <div>
            {/* {
                reduxState.users.errorMessage !== null
                &&
                <strong>Error: {reduxState.users.errorMessage}</strong>
            } */}
            <h1>Add User</h1>
            <button className='btn' onClick={routeChange}>Back To List</button>
            <form className='form' onSubmit={handleSubmit}>
                
                {inputs}
               
                <button className='btn' type='submit' >
                    Add
                </button>
            </form>
        </div>
    );
};
