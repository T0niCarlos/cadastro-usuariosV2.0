import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './components/Cadastro';
import ListaUsuarios from './components/ListaUsuarios';
import UsuarioDetalhes from './components/UsuarioDetalhes';
import './styles/main.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  const adicionarUsuario = (usuario) => {
    setUsuarios([...usuarios, { ...usuario, id: usuarios.length + 1 }]);
  };

  const editarUsuario = (usuarioEditado) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === usuarioEditado.id ? usuarioEditado : usuario
      )
    );
  };

  const excluirUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleExport = (format) => {
    let data = '';
    if (format === 'csv') {
      data = 'id,nome,cpf,dataNascimento,estadoCivil,telefone\n';
      usuarios.forEach((usuario) => {
        data += `${usuario.id},${usuario.nome},${usuario.cpf},${usuario.dataNascimento},${usuario.estadoCivil},${usuario.telefone}\n`;
      });
    } else if (format === 'txt') {
      usuarios.forEach((usuario) => {
        data += `ID: ${usuario.id}\nNome: ${usuario.nome}\nCPF: ${usuario.cpf}\nData de Nascimento: ${usuario.dataNascimento}\nEstado Civil: ${usuario.estadoCivil}\nTelefone: ${usuario.telefone}\n\n`;
      });
    }
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSearch = (e) => {
    setPesquisa(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    usuario.cpf.includes(pesquisa)
  );

  return (
    <Router>
      <header>
        <h1>Gerenciamento de Usuários</h1>
      </header>
      <main className="container">
        <Routes>
          <Route 
            path="/" 
            element={<ListaUsuarios 
                        usuarios={usuariosFiltrados} 
                        onDelete={excluirUsuario} 
                        onExport={handleExport} 
                        onSearch={handleSearch} 
                        pesquisa={pesquisa}
                      />} 
          />
          <Route 
            path="/cadastrar" 
            element={<Cadastro onSubmit={adicionarUsuario} />} 
          />
          <Route 
            path="/usuario/:id" 
            element={<UsuarioDetalhes usuarios={usuarios} onEdit={editarUsuario} />} 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
