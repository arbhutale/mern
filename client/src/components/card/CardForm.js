import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard, getCard, updateCard } from '../../actions/card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js'

const CardForm = ({ addCard, auth: { user }, card, getCard, updateCard }) => {
    const params = useParams()
    const [key, setKey] = useState("")
    const [lock, setLock] = useState(false)
    const [flag, setFlag] = useState(false)
    const [show, setShow] = React.useState(false)
    var card_deatails = card || {}
    useEffect(() => {
        getCard(params.id)
        setTimeout(() => {
            setShow(true)
            setFormData(card_deatails)
          }, 500)
    }, [getCard, show]);
    const [form, setForm] = useState({
        name: "",
        card_no: "",
        nickname:  "",
        expiry:  "",
        cvv: "",
        card_type: "",
        card_bank: "",
        card_pin: "",
        createdBy: user.email
    });
    const setFormData = (card_deatails) => {
        if(params.id){
            setForm({ ...form, name: card_deatails.name, nickname: card_deatails.nickname, card_no: card_deatails.card_no, expiry: card_deatails.expiry, card_type: card_deatails.card_type,card_bank: card_deatails.card_bank,createdBy: user.email, card_no: card_deatails.card_no});
        }else{
            setForm({ ...form, name: "", nickname: "", card_no: "", expiry: "", card_type: "",card_bank: "",createdBy: user.email, card_no: ""});
        }
            
    }
    if (!show) return null
    return (
        <div className='post-form border'>
            <div className="row">
                <div className="col-md-2">
                    <Link to="/cards" className="btn btn-success">
                        View Cards
                    </Link>
                </div>
                <div className="col-md-4">
                    <div className="my-1">
                        <input type='text' placeholder="Enter Key to  Encrpt or Decrypt " className='form-control' value={key}
                            onChange={e => { setKey(e.target.value) }} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="my-1">
                        <input disabled={lock} type='button' className='btn btn-primary' value="Lock Key"
                            onClick={e => { if (key.length > 3 && params.id) { setForm({ ...form, cvv: card_deatails.cvv, card_pin: card_deatails.card_pin });   setFlag(true); }else{
                                if (key.length > 3){ setFlag(true); {setLock(true)} }
                            } }} />
                    </div>
                </div>
                {(params.id)
                    ?  <div className="col-md-1">
                    <div className="my-1">
                        <input hidden={params.view} disabled={!flag}  type='button' className='btn btn-primary' value="Edit"
                            onClick={e => { if(flag) {setLock(true)} }} />
                    </div>
                </div>
                    : ""
                }
               
            </div>

            <div className='bg-primary p'>
                <h3>
                    {(params.id)
                        ? <span>Update Card {user.name} </span>
                        : <span> Add New Card {user.name} </span>
                    }
                </h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    addCard({ form });
                    // setText('');
                }}
            >
                <div className="my-1">
                    <label>Card Name</label>
                    <input disabled={!lock} type='text' className='form-control' value={form.nickname}
                        onChange={e => setForm({ ...form, nickname: e.target.value })} />
                </div>
                <div className="my-1">
                    <label>Card Bank</label>
                    <input disabled={!lock} type='text' className='form-control' value={form.card_bank}
                        onChange={e => setForm({ ...form, card_bank: e.target.value })} />
                </div>
                <div className="my-1">
                    <label>Card Holder Name</label>
                    <input disabled={!lock} type='text' className='form-control' value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="my-1">
                    <label>Card Number</label>
                    <input disabled={!lock} disabled={!lock} type='text' className='form-control' value={form.card_no}
                        onChange={e => setForm({ ...form, card_no: e.target.value })} />
                </div>
                <div className="my-1">
                    <label>Card Expiry</label>
                    <input disabled={!lock} disabled={!lock} type='text' className='form-control' value={form.expiry}
                        onChange={e => setForm({ ...form, expiry: e.target.value })} />
                </div>
                <div className="my-1">
                    <label>Card CVV</label>
                    <input disabled={!lock} type='text' className='form-control' value={CryptoJS.AES.decrypt(form.cvv, key).toString(CryptoJS.enc.Utf8) }
                        onChange={e => setForm({ ...form, cvv: CryptoJS.AES.encrypt(e.target.value, key).toString()})} />
                    <small>This is will be stored in encrypted way</small>
                </div>
                <div className="my-1">
                    <label>Card Pin</label>
                    <input disabled={!lock} type='text' className='form-control' value={CryptoJS.AES.decrypt(form.card_pin, key).toString(CryptoJS.enc.Utf8) }
                        onChange={e => setForm({ ...form, card_pin:CryptoJS.AES.encrypt(e.target.value, key).toString()})} />
                    <small>This is will be stored in encrypted way</small>
                </div>
                <div className="my-1">
                    <label >Card Type:</label>
                    <select disabled={!lock} name="cars" id="cars" className='form-control' value={form.card_type}
                        onChange={e => setForm({ ...form, card_type: e.target.value })} >
                        <option value="">Select Card Type</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>
            
                {(params.id)
                    ? <input  hidden={params.view} disabled={!lock} onClick={e => {
                        e.preventDefault();
                        updateCard(form, params.id);
                    }} type='button' className='btn btn-dark my-1' value='Update' />
                    : <input  hidden={params.view}  disabled={!lock} type='submit' className='btn btn-dark my-1' value='Submit' />
                }
                <small>Please Enter Secret Key & lock It</small>
            </form>
        </div>
    );
};

CardForm.propTypes = {
    addCard: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    card: state.card.card
});
export default connect(
    mapStateToProps,
    { addCard, getCard, updateCard }
)(CardForm);
