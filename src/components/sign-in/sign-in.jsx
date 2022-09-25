import React from 'react';
import content from '../static';
import './sign-in.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const schema = yup.object().shape(
        {
            fullname: yup.string().min(6),
            email: yup.string().required('Please enter email').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Format: fghjyue@jimail.com'),
            password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must contain a character,one uppercase, one lowercae, one number abd one special character')
        }
    );
    
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const submitting =(e)=>{
        console.log(e);
    }

    return(
        <div className='sign_in'>
            <h1>Have an account?</h1>
            <h3>Sign In here!</h3>
            <form onSubmit={handleSubmit(submitting)}>
                {content.inputs.map((data, index)=>(
                    <div key={index}>
                        <label htmlFor={data.name}>{data.label}</label>
                        <br/>
                        <input type={data.type} name={data.name} {...register(data.name, {required: true})} ></input>
                        {/* output the state error message or then customized message */}
                        <p className='error'>{errors[data.name]?.message}</p>
                    </div>
                ))}
                <label htmlFor='project'>Project Name</label>
                <input type='text' name='project' ></input>
                
                <button><Link className='in-link' to='/scrumboard'>SIGN IN</Link></button>
            </form>
            <p>Don't have an account? <Link className='link' to='/signup' >Sign Up</Link></p>
            <p><Link className='link' to='/'>Home</Link></p>
        </div>
    )
}
export default SignIn;