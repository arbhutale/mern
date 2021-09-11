import React, { useState,forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input  } from 'reactstrap';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js'

const ModalPM  = forwardRef((props, ref) => {
  // const {
  //   buttonLabel,
  //   className
  // } = props;
  const [pm, setPm] = useState({_id: null, username: '',password: '',website:'', createdBy:props.user.email});
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  useImperativeHandle(ref, () => ({
    
    toggle1(pm_details,title,event) {
      setEvent(event)
      setTitle(title)
      setPm({ ...pm, _id: pm_details._id,  username: pm_details.username, password: pm_details.password, website: pm_details.website,comments: pm_details.comments,  createdBy: props.user.email })
      setModal(!modal)
    }

  }));
  const [modal, setModal] = useState(false);
  const toggle = () => {setModal(!modal)
    setTimeout(() => {
      props.getPms()
    }, 500)
    ;};

  const valuecip = () =>{
    if(pm.password){
     return  CryptoJS.AES.decrypt(pm.password, props.cipkey).toString(CryptoJS.enc.Utf8)
    }else{
      return ""
    }
    
  }
  return (
    <div>
      <Button color="danger" onClick={toggle}>Test</Button>
      <Modal isOpen={modal} toggle={toggle} className="test">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup>
        <Label for="exampleEmail">Username</Label>
        <Input disabled={event=="view"} type="text" onChange={e => setPm({ ...pm, username: e.target.value })} name="Username" id="Username" placeholder="Username" value={pm.username} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Password</Label>
        <Input disabled={event=="view"}  type="text" onChange={e => setPm({ ...pm, password: CryptoJS.AES.encrypt(e.target.value, props.cipkey).toString() })} name="Password" id="Password" placeholder="Password" value={valuecip()} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Website</Label>
        <Input disabled={event=="view"} type="text" onChange={e => setPm({ ...pm, website: e.target.value })} name="Website" id="Website" placeholder="Website" value={pm.website} />
      </FormGroup>
      <FormGroup>
        <Label for="comments">Comments</Label>
        <Input disabled={event=="view"} onChange={e => setPm({ ...pm, comments: e.target.value })} type="textarea" name="text" id="comments" value={pm.comments}/>
      </FormGroup>

          {/* <Button>Submit</Button> */}
        </Form> 
        </ModalBody>
        <ModalFooter>
          <Button hidden={(event=="view" || event =="update" )}  onClick={e => {e.preventDefault();
          props.addPm(pm ); toggle()} }color="primary" >Submit</Button>{' '}
          <Button hidden={(event=="view" || event =="add" )} onClick={e => {e.preventDefault();
          props.updatePm(pm,pm._id); toggle()} }color="primary" >Update</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
})
Modal.propTypes = {
  addPm: PropTypes.func.isRequired,
  updatePm: PropTypes.func.isRequired,
  getPms:  PropTypes.func.isRequired
}
export default ModalPM;