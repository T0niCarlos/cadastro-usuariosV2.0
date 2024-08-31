import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

function Cadastro({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    estadoCivil: 'solteiro',
    telefone: '',
    arquivoPDF: null,
    arquivoJPEG: null, // Alterado para arquivoJPEG
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se ambos os arquivos foram anexados
    if (!formData.arquivoPDF || !formData.arquivoJPEG) {
      alert('Por favor, anexe ambos os arquivos PDF e JPEG.');
      return;
    }

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!formData.nome || !formData.cpf || !formData.dataNascimento || !formData.estadoCivil || !formData.telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Chama a função onSubmit com os dados do formulário
    onSubmit(formData);
    navigate('/'); // Redireciona para a página inicial ou lista de usuários
  };

  const handleCancel = () => {
    navigate('/'); // Redireciona para a página inicial ou lista de usuários
  };

  return (
    <div className="page">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <InputMask
            mask="99/99/9999"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div className="form-group">
          <label>Estado Civil:</label>
          <select 
            name="estadoCivil" 
            value={formData.estadoCivil} 
            onChange={handleChange}
          >
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="viuvo">Viúvo</option>
            <option value="separado">Separado</option>
          </select>
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div className="form-group">
          <label>Anexar PDF:</label>
          <input 
            type="file" 
            name="arquivoPDF" 
            accept=".pdf" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Anexar Imagem:</label>
          <input 
            type="file" 
            name="arquivoJPEG" 
            accept=".jpg, .jpeg" // Atualizado para aceitar JPEG e JPG
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleCancel} style={{ marginLeft: '4px' }}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
