document.querySelector("#form-cadastro").addEventListener('submit', event => {

  event.preventDefault();

  const userInput = document.querySelector('#input-username').value;
  const passwordInputOne = document.querySelector('#input-password-one').value;
  const passwordInputTwo = document.querySelector('#input-password-two').value;

  let usersDb = JSON.parse(localStorage.getItem('users'))

  if(usersDb === null){
    
    const users = [];

    localStorage.setItem('users', JSON.stringify(users));

    const db = localStorage.getItem('users');

    usersDb = JSON.parse(db);
  
  };

  let contemUsuario = usersDb.some(element => element.user === userInput);

  if(contemUsuario){

    alert('Este usuário já existe!');

  } else if(passwordInputOne !== passwordInputTwo){

    alert('As senhas não coincidem!')

  } else{

    const userTemporary = {
      user: userInput,
      password: passwordInputOne,
      recados: []
    };

    usersDb.push(userTemporary);

    localStorage.setItem('users', JSON.stringify(usersDb));

    sessionStorage.setItem('usuarioLogado', JSON.stringify(userTemporary));

    location.assign('../recados.html');

  };

});