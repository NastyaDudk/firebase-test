import React, { Component } from 'react';
import './App.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount = async () => {
    try {
      const { email, password } = this.state;

      // Проверка валидности email
      if (!email.trim() || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User successfully created: ', userCredential.user);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please check the email and password.');
    }
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  render() {
    return (
      <div>
        <div className="login_block">
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <input
            className="submit"
            type="submit"
            onClick={this.createAccount}
          />
        </div>
      </div>
    );
  }
}

export default App;