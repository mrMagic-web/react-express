import React from 'react';
import ICONS from '../graphics/icons';
import Icon from '../graphics/icon';
import ReactTooltip from 'react-tooltip'
import { language, imageUrl} from '../helpers';
import axios from 'axios';

class Form extends React.Component {
    // constructor() {
    //  super(); // we can't use this until we call super()
    //  this.renderOrder = this.renderOrder.bind(this);
    // }
    state = {
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        phone: '',
        phoneError: '',
        action: 'http://magiceportfolio.xon.pl/fastpack-dev/mailer.php'
    }
    validate = e => {
        let isErr = false;
        const errors = {};
        
        if(this.state.name.length < 5) {
            isErr = true;
            errors.nameError = "User short";
        }
        if (isErr) {
            this.setState({
                ...this.state,
                ...errors
            })
        }
    }
    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    renderOrder = e => {
        const product = this.props.products[e];
        const back = imageUrl + 'thumbs/' +product.id + '.jpg';
        const tip = product.id;
        return <div data-tip={tip} style={ {backgroundImage: `url(${back})` } } className="order-product" key={product.id}></div>;
    };

    handleSubmit(e) {
        e.preventDefault();
        const err = this.validate();

        if(!err) {
            this.props.onSubmit(this.state);
            this.setState({ name: '', email: '', phone: ''});
        }
         axios({
            method: "POST", 
            url:"/api/form", 
            data: {
                name: this.state.name,   
                email: this.state.email,  
                phone: this.state.phone,
                products: JSON.stringify(this.props.order)
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                console.log("Message Sent."); 
                // this.resetForm()
            }else if(response.data.msg === 'fail'){
                console.log("Message failed to send.")
            }
        })

    }
    render(){
        const order = Object.keys(this.props.order) 
        return( 
            <div className="wrapper contact">   
                <div className="current-order">{order.map( e => this.renderOrder(e))}</div>
                <div onClick={this.props.closeModal}><Icon icon={ICONS.CLOSE} className="icon icon-close" /></div>
                <form className="contact-form" method="POST" id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
                    <span>{this.state.nameError}</span>                 
                    <input name="name" 
                    value={this.state.name} 
                    placeholder="name" 
                    onChange={ e => this.change(e) } />
                    <input name="email" 
                    type="email"
                    value={this.state.email} 
                    placeholder="email" 
                    onChange={ e => this.change(e) } />
                    
                    <input name="phone" 
                    errorText={this.state.phoneError} 
                    value={this.state.phone} 
                    placeholder="phone" 
                    onChange={ e => this.change(e) } />
                    <button type="submit">submit</button>
                </form>
                <ReactTooltip effect='solid'>
                    
                </ReactTooltip>
            </div>
        )
    }
}

export default Form;

// import React, { Component } from 'react';
// import axios from 'axios';

// class Form extends Component {
// 	handleSubmit(e){
//         e.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
//         axios({
//             method: "POST", 
//             url:"/api/form", 
//             data: {
//                 name: name,   
//                 email: email,  
//                 messsage: message
//             }
//         }).then((response)=>{
//             if (response.data.msg === 'success'){
//                 alert("Message Sent."); 
//                 this.resetForm()
//             }else if(response.data.msg === 'fail'){
//                 alert("Message failed to send.")
//             }
//         })
//     }
//     resetForm(){
//         document.getElementById('contact-form').reset();
//     }
//   render() {
//     return (
//       <div>
//            <h3>Email Us</h3>
// 		       <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
// 				    <div className="form-group">
// 				        <input type="text" className="form-control" id="name" />
// 				    </div>
// 				    <div className="form-group">
// 				        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
// 				    </div>
// 				    <div className="form-group">
// 				        <textarea className="form-control" rows="5" id="message"></textarea>
// 				    </div>
// 			    <button type="submit" className="btn btn-primary">Submit</button>
// 			</form>
//       </div>
//     );
//   }
// }

// export default Form;


