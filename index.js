const axios = require('axios');

module.exports = async function (context, req) {
  const baseUrl = process.env["Catalogo-sv"];
  const id = req.params?.id;
  const item = req.body;

  try {
    switch (req.method) {
      case "POST":
        
        const createResponse = await axios.post(`${baseUrl}/api/catalogo`, item);
        context.res = {
          status: 201,
          body: createResponse.data
        };
        break;

      case "GET":
        
        const listResponse = id
          ? await axios.get(`${baseUrl}/api/catalogo/${id}`)
          : await axios.get(`${baseUrl}/api/catalogo`);
        context.res = {
          status: 200,
          body: listResponse.data
        };
        break;

      case "PUT":
        
        if (!id) throw new Error("ID é obrigatório para edição.");
        const updateResponse = await axios.put(`${baseUrl}/api/catalogo/${id}`, item);
        context.res = {
          status: 200,
          body: updateResponse.data
        };
        break;

      case "DELETE":
       
        if (!id) throw new Error("ID é obrigatório para exclusão.");
        await axios.delete(`${baseUrl}/api/catalogo/${id}`);
        context.res = {
          status: 204,
          body: "Item excluído com sucesso"
        };
        break;

      default:
        context.res = {
          status: 405,
          body: "Método não suportado"
        };
    }
  } catch (error) {
    context.res = {
      status: error.response?.status || 500,
      body: error.message
    };
  }
};
