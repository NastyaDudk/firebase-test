import React, { Component } from 'react';
import './App.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

class App extends Component {
  componentDidMount() {
    const db = getDatabase();
    const dbRef = ref(db, 'Name');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.setState({ userName: data });
      } else {
        console.log('Name does not exist.');
      }
    }).catch((error) => {
      console.error('Error getting Name value:', error);
    });
  }

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
      user: null,
      userName: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.signIn = this.signIn.bind(this);
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
      this.setState({ hasAccount: true, user: userCredential.user });
      console.log('User successfully created: ', userCredential.user);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please check the email and password.');
    }
  }

  signIn = async () => {
    try {
      const { email, password } = this.state;

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.setState({ hasAccount: true, user: userCredential.user });
      console.log('User successfully signed in: ', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please check the email and password.');
    }
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  render() {
    const { hasAccount, user, userName } = this.state;
    return (
      <div>
        { 
          hasAccount && user ?
          (
            <div>Hello, {user.displayName ? user.displayName : userName}</div>
          )
          :
          (<div className="login_block">
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <input
              className="submit"
              type="button"
              value="Create Account"
              onClick={this.createAccount}
            />
            <input
              className="submit"
              type="button"
              value="Sign In"
              onClick={this.signIn}
            />
          </div>
          )
        }
        
      </div>
    );
  }
}

export default App;