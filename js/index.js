let usersDB = JSON.parse(localStorage.getItem('users'));

let userLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

let indexUsuario = usersDB.findIndex(element => element.user === userLogado.user);

innerHTML(userLogado.recados);

document.querySelector('#form-new-note').addEventListener('submit', event => {

  event.preventDefault();

  document.querySelector('tbody').innerHTML = ``

  const descricao = document.querySelector('#input-description').value;
  const detalhamento = document.querySelector('#input-detailing').value;

  const recado = {
    descricao,
    detalhamento
  };
  
  userLogado.recados.push(recado);

  const recados = getRecados(userLogado);

  usersDB[indexUsuario] = userLogado;

  resetInput();

  postData(usersDB, userLogado);

  innerHTML(recados);

});

function resetInput() {
  document.querySelector('#input-description').value = '';
  document.querySelector('#input-detailing').value = '';
};

function innerHTML(element){

  element.forEach( (element, index) => {
    
    document.querySelector('tbody').innerHTML += ` 
    <tr class="tr-card">
      <td class="td-id">${index + 1}</td>
      <td class="td-descricao">${element.descricao}</td>
      <td class="td-detalhamento">${element.detalhamento}</td>
      <td class="td-acao">
        <div class="div-btn-acao">
          <div>
            <input type="submit" class="btn-criar" value="CRIAR">
          </div>
          <div>
            <input type="reset" class="btn-limpar" value="LIMPAR">
          </div>
        </div>
      </td>
    </tr>`

  });

};

function postData(usersDB, userLogado){

  localStorage.setItem('users', JSON.stringify(usersDB));
  sessionStorage.setItem('usuarioLogado', JSON.stringify(userLogado));

};

function getRecados(element){

  return element.recados

};