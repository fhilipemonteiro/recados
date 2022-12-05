const urlDB = 'users';

let usersDB = getUsersDB(urlDB);

let userLogado = getUserLogado();

let indexUsuario = getIndexUser(usersDB, userLogado);

innerHTML(userLogado.recados);

document.querySelector('#form-new-note').addEventListener('submit', event => {

  event.preventDefault();

  document.querySelector('tbody').innerHTML = ``;

  const descricao = document.querySelector('#input-description').value;
  const detalhamento = document.querySelector('#input-detailing').value;

  const recado = {
    descricao,
    detalhamento
  };
  
  userLogado.recados.push(recado);

  
  usersDB[indexUsuario] = userLogado;
  
  resetInput();
  
  postData(usersDB, userLogado);

  const recados = getRecados(userLogado);

  innerHTML(recados);
  
});

function resetInput() {

  document.querySelector('#input-description').value = '';
  document.querySelector('#input-detailing').value = '';

};

function innerHTML(element){

  element.forEach( (element, id) => {
    
    document.querySelector('tbody').innerHTML += ` 
    <tr class="tr-card">
      <td class="td-id">${id + 1}</td>
      <td class="td-descricao" id="descricao${id}">${element.descricao}</td>
      <td class="td-detalhamento" id="detalhamento${id}">${element.detalhamento}</td>
      <td class="td-acao">
          <div class="div-btn-acao">
            <div id="btn-editar${id}">
              <button class="btn-editar" onclick="editarRecado(${id})">EDITAR</button>
            </div>

            <div id="btn-excluir${id}">
              <button class="btn-excluir" onclick="excluirRecado(${id})">EXCLUIR</button>
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
  
  return element.recados;

};

function getUsersDB(url){
  
  return JSON.parse(localStorage.getItem(`${url}`));
  
};

function getUserLogado() {
  
  return JSON.parse(sessionStorage.getItem('usuarioLogado'));
  
};

function getIndexUser(usersDB, userLogado){
  
  return usersDB.findIndex(element => element.user === userLogado.user);
  
};

function editarRecado(id) {

  const recado = userLogado.recados[id];
  
  document.querySelector(`#descricao${id}`).innerHTML = `<input type="text" class="td-input-descricao" id="td-descricao${id}" autocomplete="off" placeholder="${recado.descricao}"></input>`;

  document.querySelector(`#detalhamento${id}`).innerHTML = `<input type="text" class="td-input-detalhamento" id="td-detalhamento${id}" autocomplete="off" placeholder="${recado.detalhamento}"></input>`;

  document.querySelector(`#btn-editar${id}`).innerHTML = `<button class="btn-editar" id="btn-editar${id}" onclick="salvarEdicaoRecado(${id})">SALVAR</button>`;

  document.querySelector(`#btn-excluir${id}`).innerHTML = `<button class="btn-excluir" id="btn-excluir${id}" onclick="cancelar(${id})">CANCELAR</button>`;
  
};

function salvarEdicaoRecado(id) {

  const descricao = document.querySelector(`#td-descricao${id}`).value;
  const detalhamento = document.querySelector(`#td-detalhamento${id}`).value;

  const novoRecado = {
    descricao: !descricao ? userLogado.recados[id].descricao : descricao,
    detalhamento: !detalhamento ? userLogado.recados[id].detalhamento :detalhamento
  };
  
  userLogado.recados.splice(id, 1, novoRecado);

  usersDB[indexUsuario] = userLogado;
    
  postData(usersDB, userLogado);
  
  document.querySelector(`#descricao${id}`).innerHTML = `${novoRecado.descricao}`;
  
  document.querySelector(`#detalhamento${id}`).innerHTML = `${novoRecado.detalhamento}`;
  
  document.querySelector(`#btn-editar${id}`).innerHTML = `<button class="btn-editar" onclick="editarRecado(${id})">EDITAR</button>`;

  document.querySelector(`#btn-excluir${id}`).innerHTML = `<button class="btn-excluir" onclick="excluirRecado(${id})">EXCLUIR</button>`

};

function cancelar(id) {
  
  const recado = userLogado.recados[id];

  document.querySelector(`#descricao${id}`).innerHTML = `${recado.descricao}`;
  
  document.querySelector(`#detalhamento${id}`).innerHTML = `${recado.detalhamento}`;
  
  document.querySelector(`#btn-editar${id}`).innerHTML = `<button class="btn-editar" onclick="editarRecado(${id})">EDITAR</button>`;

  document.querySelector(`#btn-excluir${id}`).innerHTML = `<button class="btn-excluir" onclick="excluirRecado(${id})">EXCLUIR</button>`

};

function excluirRecado(id) {
  
  userLogado.recados.splice(id,1);

  usersDB[indexUsuario] = userLogado;

  const recados = userLogado.recados;

  postData(usersDB,userLogado);

  document.querySelector('tbody').innerHTML = ``;

  innerHTML(recados);

}