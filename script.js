const resultado = document.querySelector("#resultado");
const searchInput = document.querySelector("#search-input");

const API_KEY = '77c4e2b070a2e1396500d0b42ebf7cec';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

async function buscarFilmes(categoria = 'popular', query = '') {
    try {
        const resposta = await fetch(`${BASE_URL}/${categoria}?api_key=${API_KEY}&language=pt-BR`);
        const dados = await resposta.json();
        let filmes = dados.results;

             if (query) {
            filmes = filmes.filter(filme => filme.title.toLowerCase().includes(query.toLowerCase()));
        }

     
        resultado.innerHTML = '';

          filmes.forEach(filme => {
            const card = document.createElement("div");
            card.className = 'card';
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}" />
                <p>${filme.overview}</p>
            `;
            resultado.appendChild(card);
        });
    } catch (erro) {
        console.log('Erro ao buscar filmes:', erro);
    }
}

function inicializarFilmes() {
    buscarFilmes('popular');
}

document.getElementById('popular').addEventListener('click', () => buscarFilmes('popular'));
document.getElementById('now-playing').addEventListener('click', () => buscarFilmes('now_playing'));
document.getElementById('top-rated').addEventListener('click', () => buscarFilmes('top_rated'));
document.getElementById('upcoming').addEventListener('click', () => buscarFilmes('upcoming'));
document.getElementById('popular-mobile').addEventListener('click', () => buscarFilmes('popular'));
document.getElementById('now-playing-mobile').addEventListener('click', () => buscarFilmes('now_playing'));
document.getElementById('top-rated-mobile').addEventListener('click', () => buscarFilmes('top_rated'));
document.getElementById('upcoming-mobile').addEventListener('click', () => buscarFilmes('upcoming'));
searchInput.addEventListener('input', () => {
    buscarFilmes('popular', searchInput.value);
});

window.onload = inicializarFilmes;
