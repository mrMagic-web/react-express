import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
	handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios({
            method: "POST", 
            url:"/api/form", 
            data: {
                name: name,   
                email: email,  
                messsage: message
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }
    resetForm(){
        document.getElementById('contact-form').reset();
    }
  render() {
    return (
      <div>
           <h3>Email Us</h3>
		       <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
				    <div className="form-group">
				        <input type="text" className="form-control" id="name" />
				    </div>
				    <div className="form-group">
				        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
				    </div>
				    <div className="form-group">
				        <textarea className="form-control" rows="5" id="message"></textarea>
				    </div>
			    <button type="submit" className="btn btn-primary">Submit</button>
			</form>
      </div>
    );
  }
}

export default Form;


