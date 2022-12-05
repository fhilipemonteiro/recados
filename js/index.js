document.querySelector('#form-login').addEventListener('submit', (event) => {

  event.preventDefault();

  const userInput = document.querySelector('#input-username').value;
  const passwordInput = document.querySelector('#input-password').value;

  let userDB = JSON.parse(localStorage.getItem('users'));

  console.log(userDB);

  if(userDB === null){

    alert('Usuário não cadastrado. Efetue o cadastro para fazer o login!');

  } else{

    userDB = userDB.filter(element => element.user === userInput);

    const user = userDB[0];

    let validation; 
  
    if(!(user === undefined)){

      validation = user.user === userInput && user.password === passwordInput;

    }

    if(user === undefined){

      alert('Usuário não cadastrado. Efetue o cadastro para fazer o login.');

    }else if (validation) {

      sessionStorage.setItem('usuarioLogado', JSON.stringify(user));
      location.assign('../recados.html');



    } else {

      alert('Usuário ou senha incorretos.');

    };

  };

});