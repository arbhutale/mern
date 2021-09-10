import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard } from '../../actions/card';
import { Link } from 'react-router-dom';

const CardForm = ({ addCard,auth: { user },  }) => {
    const [form, setForm] = useState({
        name : "",
        nickname : "",
        card_no : "",
        expiry : "",
        cvv : "",
        card_type :"",
        card_bank: "",
        card_pin: "",
        createdBy : user.email
    });
    return (
        <div className='post-form border'>
            <Link to="/cards" className="btn">
                View Cards
            </Link>
            <div className='bg-primary p'>
                <h3>Add New Card {user.name}</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    console.log(form)
                    addCard({ form });
                    // setText('');
                }}
            >
                <div className="my-1">
                    <label>Card Name</label>
                    <input type='text' className='form-control'  value={form.nickname}
                    onChange={e => setForm({...form, nickname: e.target.value})}/>
                </div>
                <div className="my-1">
                    <label>Card Bank</label>
                    <input type='text' className='form-control' value={form.card_bank}
                   onChange={e => setForm({...form, card_bank: e.target.value})}/>
                </div>
                <div className="my-1">
                    <label>Card Holder Name</label>
                    <input type='text' className='form-control' value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}/>
                </div>
                <div className="my-1">
                    <label>Card Number</label>
                    <input type='text' className='form-control' value={form.card_no}
                   onChange={e => setForm({...form, card_no: e.target.value})}/>
                </div>
                <div className="my-1">
                    <label>Card Expiry</label>
                    <input type='text' className='form-control' value={form.expiry}
                   onChange={e => setForm({...form, expiry: e.target.value})} />
                </div>
                <div className="my-1">
                    <label>Card CVV</label>
                    <input type='text' className='form-control' value={form.cvv}
                   onChange={e => setForm({...form, cvv: e.target.value})}/>
                    <small>This is will be stored in encrypted way</small>
                </div>
                <div className="my-1">
                    <label>Card Pin</label>
                    <input type='text' className='form-control' value={form.card_pin}
                    onChange={e => setForm({...form, card_pin: e.target.value})}/>
                    <small>This is will be stored in encrypted way</small>
                </div>
                <div className="my-1">
                <label for="cars">Card Type:</label>
                <select name="cars" id="cars" className='form-control' value={form.card_type}
                    onChange={e => setForm({...form, card_type: e.target.value})} >
                        <option value="">Select Card Type</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
                </select>
                </div>
                {/* <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Create a post'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                /> */}
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

CardForm.propTypes = {
    addCard: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
  });
export default connect(
    mapStateToProps,
    { addCard }
)(CardForm);
