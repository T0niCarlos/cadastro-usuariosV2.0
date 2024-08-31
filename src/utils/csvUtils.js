function exportCSV(users) {
  const csvRows = [];

  // Função para formatar cada valor
  const formatValue = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    // Adiciona aspas duplas ao redor do valor e escapa aspas duplas dentro do valor
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  // Adiciona os cabeçalhos das colunas
  const headers = ['ID', 'Nome', 'CPF', 'Data de Nascimento', 'Estado Civil', 'Telefone'];
  csvRows.push(headers.map(formatValue).join(';')); // Usando ponto e vírgula como delimitador

  // Adiciona as linhas com os dados dos usuários
  for (const user of users) {
    const values = [
      user.id,
      user.nome,
      user.cpf,
      user.dataNascimento,
      user.estadoCivil,
      user.telefone
    ];
    csvRows.push(values.map(formatValue).join(';')); // Usando ponto e vírgula como delimitador
  }

  // Cria o blob e faz o download do arquivo CSV
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'usuarios.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
