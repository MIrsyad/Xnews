import React, {useState} from 'react';

const useForm = (n = '', e = '', p = '') => {
  const [name, setName] = useState(n);
  const [email, setEmail] = useState(e);
  const [password, setPassword] = useState(p);

  function verifName(text) {
    const reg = /^[A-Za-z\d\s]+$/;
    let verifiedName = reg.test(String(text).toLowerCase());
    return verifiedName;
  }

  function verifEmail(text) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let verifiedEmail = re.test(String(text).toLowerCase());
    return verifiedEmail;
  }

  function verifPassword(text) {
    if (text !== null) {
      if (text.length >= 6) {
        return true;
      } else {
        return false;
      }
    }
  }

  const Name = () => setName(name);
  const Email = () => setEmail(email);
  const Password = () => setPassword(password);

  return {
    Name,
    Email,
    Password,
    verifName,
    verifEmail,
    verifPassword,
  };
};

export default useForm;
