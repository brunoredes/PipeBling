// import parser from 'xml2json';
import api from '../service/api';
import pipedriveConfig from '../config/pipedrive';
import blingConfig from '../config/bling';
import randomNumbers from '../utils/randomNumbers';

export default {
  async store(request, response) {
    const { apiBling, apiPipedrive } = api;
    const { apiToken } = pipedriveConfig;
    const { apiKey } = blingConfig;

    const pipedriveOpportunities = await apiPipedrive.get(
      `deals?status=won&start=0&api_token=${apiToken}`
    );

    const pipedriveOpportunitiesData = pipedriveOpportunities.data.data;
    // console.log(pipedriveOpportunitiesData);

    const pipedriveDataToXmlBlingData = pipedriveOpportunitiesData.reduce(
      (xml, item) =>
        (xml += `
      <?xml version="1.0" encoding="UTF-8"?>
<produtocompra>
   <numeropedido>${item.id}</numeropedido>
   <datacompra>${item.add_time}</datacompra>
   <dataprevista>${item.update_time}</dataprevista>
   <ordemcompra>${randomNumbers(1, 100)}</ordemcompra>
   <desconto>10%</desconto>
   <observacoes>Observações normais...</observacoes>
   <observacaointerna>Observações internas...</observacaointerna>
   <fornecedor>
      <id>${item.id}</id>
      <nome>${item.name}</nome>
      <tipopessoa>F</tipopessoa>
      <cpfcnpj>1234567899</cpfcnpj>
      <ie></ie>
      <rg>1234567</rg>
      <contribuinte>9</contribuinte>
      <endereco>Praça da Sé, 68</endereco>
      <endereconro></endereconro>
      <complemento></complemento>
      <bairro>Centro</bairro>
      <cep>01.001-001</cep>
      <cidade>São Paulo</cidade>
      <uf>SP</uf>
      <fone>(11) 2222-2222</fone>
      <celular>(11) 92222-2222</celular>
      <email>${item.cc_email}</email>
   </fornecedor>
   <itens>
      <item>
         <codigo>${item.id}</codigo>
         <descricao>${item.title}</descricao>
         <un/>
         <qtde>1</qtde>
         <valor>${item.value}</valor>
      </item>
      <item>
         <codigo>${item.id}</codigo>
         <descricao>${item.title}</descricao>
         <un/>
         <qtde>1</qtde>
         <valor>${item.value}</valor>
      </item>
   </itens>
   <parcelas>
      <parcela>
         <nrodias>90</nrodias>
         <valor>${item.value}</valor>
         <obs>Uma observação qualquer...</obs>
         <idformapagamento>123456</idformapagamento>
      </parcela>
      <parcela>
         <nrodias>90</nrodias>
         <valor>${item.value}</valor>
         <obs>Uma observação qualquer...</obs>
         <idformapagamento>123456</idformapagamento>
      </parcela>
   </parcelas>
   <transporte>
      <transportador>Meu transportador</transportador>
      <freteporconta>R</freteporconta>
      <qtdvolumes>1</qtdvolumes>
      <frete>100.0</frete>
   </transporte>
</produtocompra>`)
    );
    console.log(pipedriveDataToXmlBlingData);

    const res = await apiBling.post(
      `/pedidocompra/json/&apikey=${apiKey}&xml=${pipedriveDataToXmlBlingData}`
    );
    console.log(res.data.retorno.erros);

    return response.status(201).json({});
  },
};
