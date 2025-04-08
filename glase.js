const carrinho = [];

function toggleCart() {
  const popup = document.getElementById('cartPopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function addToCart(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `<span>${item.nome}</span><span>R$ ${item.preco.toFixed(2)}</span>`;
    cartItemsContainer.appendChild(itemDiv);
    total += item.preco;
  });

  document.querySelector('.cart-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function verificarDadosCliente() {
  const nome = localStorage.getItem("nomeCliente");
  const endereco = localStorage.getItem("enderecoCliente");
  const cpf = localStorage.getItem("cpfCliente");

  if (!nome || !endereco || !cpf) {
    document.getElementById('loginModal').style.display = 'flex';
    return false;
  }
  return true;
}

function salvarDadosCliente() {
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (nome && endereco && cpf) {
    localStorage.setItem("nomeCliente", nome);
    localStorage.setItem("enderecoCliente", endereco);
    localStorage.setItem("cpfCliente", cpf);
    document.getElementById('loginModal').style.display = 'none';
    checkout();
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function checkout() {
  if (!verificarDadosCliente()) return;

  const nome = localStorage.getItem("nomeCliente");
  const endereco = localStorage.getItem("enderecoCliente");
  const cpf = localStorage.getItem("cpfCliente");

  let mensagem = `Olá! Gostaria de fazer um pedido:\n\n`;
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
  mensagem += `🧾 Dados do Cliente:\nNome: ${nome}\nCPF: ${cpf}\nEndereço: ${endereco}, Esperantina - PI`;

  const phone = "558695421485";
  const encodedMessage = encodeURIComponent(mensagem);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

atualizarCarrinho();