// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';

const styles = {
  form: {
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    margin: 'auto',
    paddingTop: '5vh',
  },
  label: {
    marginRight: '5px',
  },
  input: {},
  button: {
    width: '20%',
    margin: '10px',
    border: 'none',
    padding: '5px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '2px',
  },
};

// eslint-disable-next-line no-unused-vars
function UsernameForm({onSubmitUsername}) {
  const usernameInputRef = React.useRef(null);
  const [usernameError, setUsernameError] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitUsername(usernameInputRef.current.value);
  }

  function handleInputChange() {
    const isValid =
      usernameInputRef.current.value ===
      usernameInputRef.current.value.toLowerCase();
    setUsernameError(isValid ? null : 'Username must be in lowercase');
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" style={styles.label}>
          Username:
        </label>
        <input
          ref={usernameInputRef}
          type="text"
          id="username"
          onChange={handleInputChange}
        />
        {usernameError && (
          <div role="alert" style={styles.error}>
            {usernameError}
          </div>
        )}
      </div>
      <button
        style={styles.button}
        type="submit"
        disabled={Boolean(usernameError)}
      >
        Submit
      </button>
    </form>
  );
}

function ControlledUsernameForm({onSubmitUsername}) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitUsername(username);
  }

  function handleInputChange(e) {
    const {value} = e.target;
    setUsername(value);
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" style={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          onChange={handleInputChange}
          value={username}
        />
      </div>
      <button style={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) =>
    console.log(`Username entered: ${username}`);
  return <ControlledUsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
