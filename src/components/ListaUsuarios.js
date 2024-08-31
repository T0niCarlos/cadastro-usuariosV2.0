import React from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function ListaUsuarios({ usuarios, onDelete, onExport, onSearch, pesquisa }) {
  // Função para exportar os dados para XLSX
  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(usuarios, {
      header: ['id', 'nome', 'cpf', 'dataNascimento', 'estadoCivil', 'telefone'],
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  return (
    <div className="page">
      <h2>Lista de Usuários</h2>
      <input 
        type="text" 
        className="search-input"
        placeholder="Pesquisar usuário por nome ou CPF..." 
        value={pesquisa} 
        onChange={onSearch} 
      />
      <div className="table-responsive">
        <table className="desktop-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Estado Civil</th>
              <th>Telefone</th>
              <th>PDF</th>
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.dataNascimento}</td>
                <td>{usuario.estadoCivil}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.arquivoPDF ? <a href={URL.createObjectURL(usuario.arquivoPDF)} download={`Usuario_${usuario.nome}.pdf`}>Baixar</a> : 'N/A'}</td>
                <td>{usuario.arquivoJPEG ? <a href={URL.createObjectURL(usuario.arquivoJPEG)} download={`Usuario_${usuario.nome}.jpg`}>Baixar</a> : 'N/A'}</td>
                <td>
                  <Link to={`/usuario/${usuario.id}`}>Editar</Link>
                  <button className="button-delete" onClick={() => onDelete(usuario.id)}>Excluir</button>
                </td>
              </tr>
            )) : <tr><td colSpan="9">Nenhum usuário encontrado.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="card-list">
        {usuarios.length > 0 ? usuarios.map((usuario) => (
          <div className="card" key={usuario.id}>
            <div className="card-header">{usuario.nome}</div>
            <div className="card-content">
              <p><strong>ID:</strong> {usuario.id}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
              <p><strong>Estado Civil:</strong> {usuario.estadoCivil}</p>
              <p><strong>Telefone:</strong> {usuario.telefone}</p>
              <p><strong>PDF:</strong> {usuario.arquivoPDF ? <a href={URL.createObjectURL(usuario.arquivoPDF)} download={`Usuario_${usuario.nome}.pdf`}>Baixar</a> : 'N/A'}</p>
              <p><strong>Imagem:</strong> {usuario.arquivoJPEG ? <a href={URL.createObjectURL(usuario.arquivoJPEG)} download={`Usuario_${usuario.nome}.jpg`}>Baixar</a> : 'N/A'}</p>
              <div className="actions">
                <Link to={`/usuario/${usuario.id}`}>Editar</Link>
                <button className="button-delete" onClick={() => onDelete(usuario.id)}>Excluir</button>
              </div>
            </div>
          </div>
        )) : <div>Nenhum usuário encontrado.</div>}
      </div>
      <div className="actions">
        <Link to="/cadastrar">
          <button>Cadastrar Novo Usuário</button>
        </Link>
        <button onClick={() => onExport('txt')}>Exportar TXT</button>
        <button onClick={exportToXLSX}>Exportar XLSX</button>
      </div>
    </div>
  );
}

export default ListaUsuarios;
