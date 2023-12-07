const fraseHTML = document.getElementById('frase');
const body = document.getElementsByTagName('body');

const geraFrase = (frase) => {
  fraseHTML.innerText = frase;
  body.appendChild('fraseHTML');
}

const obterTraducao = async (mensagem) => {
  const url = 'https://translate.argosopentech.com/translate';
  const tradutor = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: mensagem,
      source: 'en',
      target: 'pt',
    }),
    headers: { 'Content-Type': 'application/json' }
  }).then((traducao) => traducao.json());
  const fraseTraduzida = tradutor.translatedText;
  return geraFrase(fraseTraduzida);
}

const obterConselho = async () => {
  const url = 'https://api.adviceslip.com/advice';
  const conselho = await fetch(url);
  const response = await conselho.json();
  console.log(response);
  // const { advice: mensagem } = conselho;
  return obterTraducao(response);
}

async window.onload = await obterConselho;
