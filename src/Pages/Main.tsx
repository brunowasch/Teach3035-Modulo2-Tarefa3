import React, {useEffect, useState} from 'react';
import '../App.css';

function Main() {
    const [movie, setMovie] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  
    type Movie = {
        id: number;
        nome: string;
        genero: string;
        imagem: string;
    }

    function getMovies() {
        fetch('./movies.json')
        .then((res) => res.json())
        .then ((json) => {setMovie(json)})
        }
  
    useEffect(() => {
      getMovies();
    }, []);
  
    useEffect(() => {
      console.log(movie);
    }, [movie]);

    const handleCheckboxChange = (movieId: number) => {
      setSelectedMovieId(selectedMovieId === movieId ? null : movieId);
    }

    const selectedMovie = movie.find(m => m.id === selectedMovieId);

    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <th>Filmes</th>
                    </tr>
                </thead>
                <tbody>
                    {movie
                    .map((m) => (
                    <tr key={m.id}>
                        <td>
                            <input 
                            type="checkbox" 
                            name='movieWatched' 
                            className='movieInput' 
                            checked={selectedMovieId === m.id}
                            onChange={() => handleCheckboxChange(m.id)}
                            required 
                            />
                            {m.nome}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {selectedMovie && (
            <div className="modal-overlay" onClick={() => setSelectedMovieId(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedMovieId(null)}>×</button>
                <h1 className='movie-selected'>Filme selecionado:</h1>
                <img src={selectedMovie.imagem} alt={selectedMovie.nome} className="modal-image" />
                <h2>{selectedMovie.nome}</h2>
                <p className="modal-genre">Gênero: {selectedMovie.genero}</p>
                </div>
            </div>
            )}
        </main>
    )
}

export default Main;