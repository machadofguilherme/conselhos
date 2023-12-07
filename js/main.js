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
  });
  console.log('tradutor: ', tradutor);
  
  const { translatedText } = await tradutor.json();
  console.log('translatedText: ', translatedText);

  return geraFrase(translatedText);
}

const obterConselho = async () => {
  const url = 'https://api.adviceslip.com/advice';
  const conselho = await fetch(url);
  const { slip } = await conselho.json();
  const { advice } = slip;
  return obterTraducao(advice);
}

window.onload = async () => await obterConselho();
