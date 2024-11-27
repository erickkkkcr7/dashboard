/*
 * Nome do arquivo: App.jsx
 * Data de criação: 11/11/2024
 * Autor: [João Eric]
 * Matrícula: [01711035]
 *
 * Descrição:
 * busca a imagem astronômica do dia a partir da API
 * e permite que o usuário selecione uma data para ver a imagem daquele dia.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  // armazenando os dados
  const [data, setData] = useState(null); 
  const [date, setDate] = useState('');   
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const API_KEY = '30k7dqJXfJwvrB1YhifQRxAnqALXnwzi4kbw6tIr';

  // buscando os dados da API
  const fetchData = async (date = '') => {
    setLoading(true);
    setError(null);

    try {
      // URL da API
      let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
if (date) {
  url += `&date=${date}`;
}

const response = await axios.get(url);
console.log(response.data);


      if (response.data && response.data.title && response.data.url && response.data.explanation) {
        setData(response.data);
      } else {
        throw new Error('Dados da API não estão no formato esperado');
      }
    } catch (err) {
      setError('Erro ao carregar a imagem');
    } finally {
      setLoading(false);
    }
  };

  // carregar os dados
  useEffect(() => {
    fetchData();
  }, []);

  
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

 
  const handleFetchByDate = () => {
    if (date) {
      fetchData(date);
    }
  };

  // exibir estado de carregamento ou erro
  if (loading) {
    return <div>Carregando imagem...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h2>Imagem Astronômica do Dia</h2>
      <div>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={handleFetchByDate}>
          Pesquisar
        </button>
      </div>
      {data && (
         <div className="image-container">
         <div className="image-side">
           <img
             src={data.url}
             alt={data.title}
             style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}/>
         </div>
         <div className="description-side">
           <h3>{data.title}</h3> 
           <p>{data.explanation}</p>
         </div>
       </div>
      )}
    </div>
  );
}

export default App;