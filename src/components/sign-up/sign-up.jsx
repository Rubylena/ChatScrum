import React from 'react';
import content from '../static';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './sign-up.css';
import { Link } from 'react-router-dom';


const SignUp = () => {
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
        <div className='sign_up'>
            <h1>Don't Have an account?</h1>
            <h3>Sign Up here!</h3>
            
            <form onSubmit={handleSubmit(submitting)} >
                {content.inputs.map((data, index)=>{
                    return(
                        <div key={index}>
                            <label htmlFor={data.name}>{data.label}</label>
                            <br/>
                            <input type={data.type} name={data.name}
                            {...register(data.name, {required: true})} />
                            <p className='message'>{errors[data.name]?.message}</p>
                        </div>
                    )})}
                <label htmlFor='options' name='options'>User Type</label>
                <select id='options' name='options' {...register('usertype', {required: true})}>
                    <option value='Developer'>Developer</option>
                    <option value='Owner'>Owner</option>
                </select>
                <button>SIGN UP</button>
            </form>
            <p>Have an account? <Link className='link' to='/signin' >Sign In</Link></p>
            <p><Link className='link' to='/'>Home</Link></p>
        </div>
    )
}
export default SignUp;