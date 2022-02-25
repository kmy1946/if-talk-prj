import React, { useRef, useState } from "react";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import emailjs from '@emailjs/browser';

function Contact() {
  const [nameing, setNameing] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = event => {
    event.preventDefault();

    alert(`以下の内容で送信します。 \n 
            お名前: ${nameing} \n
            メールアドレス: ${email} \n 
            お問い合わせ内容: ${message} \n
            `);
    setNameing('');
    setEmail('');
    setMessage('');
  };

  const form = useRef();

  const sendEmail = (e) => {
    //init('user_gDaVFUI0iCKVc8EkuHJpW')
    e.preventDefault();
  
    alert(`以下の内容で送信します。 \n 
              お名前: ${nameing} \n
              メールアドレス: ${email} \n 
              お問い合わせ内容: ${message} \n
        `);
        
  const service_id = process.env.REACT_APP_SERVICE_ID
  const template_id = process.env.REACT_APP_TEMPLATE_ID
  const user_id = process.env.REACT_APP_USER_ID

  emailjs.sendForm(service_id, template_id, e.target, user_id)//form.current
    .then((result) => {
        console.log(result.text);
        alert('送信しました');
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  return (
    <Box w={'full'} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}
      className="card contact-box text-center mx-auto rounded" id="contact"
      style={{backgroundColor:'rgb(247, 250, 255)'}}
    >

      <div className="card-body contact_group">
        <p className="contact_me">
          Contact To Manager
        </p>
        <br/>
        <form ref={form} onSubmit={sendEmail}>
          
          <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
          <div className="mb-3">
            <Input type="text" className="form-control" onChange={(event) => setNameing(event.target.value)}    placeholder="Your Name" name="name" id="name" required data-validation-required-message="Please enter your name" required/>
          </div>
          <div className="mb-3">
            <Input type="email" className="form-control" onChange={(event) => setEmail(event.target.value)}
              placeholder="Your Email Address" name="email" id="email" required data-validation-required-message="Please enter your Email Address" required/>
          </div>
          <div className="mb-3">
            <TextField type="text" className="form-control" onChange={(event) => setMessage(event.target.value)} placeholder="Message" name="message" id="message" rows="5" required></TextField>
            <p className="help-block text-danger"></p>
          </div>
          <div className="mb-3" id="success">
            <Button className="btn" type="submit" value="Send" id="sendMessageButton"><i className="fas fa-paper-plane"></i>Send!!!</Button>
          </div>
        </form>

      </div>
    </Box>
  )
  
}
export default Contact