// script.js

let saldo = 0;
let transacoes = []; 
function atualizarSaldo() {
  document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2)}`;
}

function mostrarMensagem(mensagem) {
  const mensagensDiv = document.getElementById('mensagens');
  mensagensDiv.textContent = mensagem;
  setTimeout(() => {
    mensagensDiv.textContent = '';
  }, 3000);
}
function registrarTransacao(tipo, valor) {
  const dataHora = new Date();
  const transacao = {
    tipo: tipo,
    valor: valor,
    dataHora: dataHora.toLocaleString()
  };

  transacoes.push(transacao);
  exibirHistoricoTransacoes();
}

function exibirHistoricoTransacoes() {
  const historicoElement = document.getElementById('historicoTransacoes');
  historicoElement.innerHTML = ''; 

  transacoes.forEach(transacao => {
    const li = document.createElement('li');
    li.textContent = `${transacao.tipo}: R$ ${transacao.valor.toFixed(2)} - ${transacao.dataHora}`;
    historicoElement.appendChild(li);
  });
}

function depositar() {
  const valor = parseFloat(document.getElementById('valorDeposito').value);

  if (isNaN(valor) || valor <= 0) {
    mostrarMensagem('Por favor, insira um valor válido para depósito.');
    return;
  }

  saldo += valor;
  atualizarSaldo();
  registrarTransacao('Depósito', valor); 
  mostrarMensagem(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
  document.getElementById('valorDeposito').value = '';
}

function transferir() {
  const valor = parseFloat(document.getElementById('valorTransferencia').value);

  if (isNaN(valor) || valor <= 0) {
    mostrarMensagem('Por favor, insira um valor válido para transferência.');
    return;
  }

  if (valor > saldo) {
    mostrarMensagem('Saldo insuficiente para realizar a transferência.');
    return;
  }

  saldo -= valor;
  atualizarSaldo();
  registrarTransacao('Transferência via PIX', valor);
  mostrarMensagem(`Transferência de R$ ${valor.toFixed(2)} realizada com sucesso!`);
  document.getElementById('valorTransferencia').value = ''; 
