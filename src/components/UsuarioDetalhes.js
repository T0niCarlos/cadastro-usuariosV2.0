import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UsuarioDetalhes({ usuarios, onEdit }) {
  const { id } = useParams();
  const usuario = usuarios.find((u) => u.id === parseInt(id));

  const [formData, setFormData] = useState(usuario);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      if (name === 'dataNascimento') {
        const formattedValue = formatDataNascimento(value);
        setFormData({ ...formData, [name]: formattedValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // Função para formatar a data no formato xx/xx/xxxx
  const formatDataNascimento = (value) => {
    // Remove todos os caracteres que não são números
    const onlyNums = value.replace(/\D/g, '');

    // Adiciona as barras conforme o número de dígitos
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 4) return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
    if (onlyNums.length <= 8) return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4)}`;
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
    navigate('/');
  };

  return (
    <div className="page">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input
            type="text"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            placeholder="DD/MM/AAAA"
            maxLength="10" // Limita o campo a 10 caracteres
          />
        </div>
        <div className="form-group">
          <label>Estado Civil:</label>
          <select name="estadoCivil" value={formData.estadoCivil} onChange={handleChange}>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="viuvo">Viúvo</option>
            <option value="separado">Separado</option>
          </select>
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Anexar PDF:</label>
          <input type="file" name="arquivoPDF" accept=".pdf" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Anexar Imagem:</label>
          <input type="file" name="arquivoJPEG" accept=".jpg, .jpeg" onChange={handleChange} required />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default UsuarioDetalhes;
