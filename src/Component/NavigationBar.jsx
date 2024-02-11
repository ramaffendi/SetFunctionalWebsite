import React, { useState, useEffect } from "react";

const TopStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'green',
  padding: '10px',
  marginLeft: 'auto',
};

const NewsPort = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = (searchTerm = '') => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=92027cca920944f39e287c73a559ef79`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then((data) => setNews(data.articles))
      .catch((error) => console.error('Error fetching news:', error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    fetchNews(searchTerm);
  };

  return (
    <div>
      <div style={TopStyle}>
        <h2>News Portal</h2>
        <div>
          <input type='text' id="search" className="search" placeholder="search"  
          value={searchTerm}
          onChange={handleSearch} />
          <button id="button" className="button"
          onClick={handleSearchButtonClick}>Search</button>
        </div>
      </div>
      <div className="row">
        {news.map((article) => (
          <div key={article.title} className="col-md-4">
            <div className="card mb-4">
              <img src={article.urlToImage} className="card-img-top" alt={article.title} />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Baca selengkapnya
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPort;

