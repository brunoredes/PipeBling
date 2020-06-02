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

    let pipedriveDataToXmlBlingData = '';

    try {
      const pipedriveOpportunitiesData = pipedriveOpportunities.data.data;

      pipedriveDataToXmlBlingData = pipedriveOpportunitiesData.reduce(
        (xml, item) =>
          (xml += `
          <?xml version="1.0" encoding="UTF-8"?>
          <pedido>
           <cliente>
           <nome>${item.creator_user_id.name}</nome>
           <tipoPessoa>F</tipoPessoa>
           <endereco>Praça da Sé</endereco>
           <cpf_cnpj>12345678909</cpf_cnpj>
           <ie_rg>012345678</ie_rg>
           <numero>68</numero>
           <complemento>A</complemento>
           <bairro>Centro</bairro>
           <cep>01001001</cep>
           <cidade>São Paulo</cidade>
           <uf>SP</uf>
           <fone>1129999999</fone>
           <email>${item.cc_email}</email>
           </cliente>
           <transporte>
           <transportadora>Transportadora Eu</transportadora>
           <tipo_frete>R</tipo_frete>
           <servico_correios>SEDEX - CONTRATO</servico_correios>
           <dados_etiqueta>
           <nome>Endereço de entrega</nome>
           <endereco>Praça da Sé</endereco>
           <numero>68</numero>
           <complemento>a</complemento>
           <municipio>São Paulo</municipio>
           <uf>SP</uf>
           <cep>01.001-001</cep>
           <bairro>Centro</bairro>
           </dados_etiqueta>
           <volumes>
           <volume>
           <servico>SEDEX - CONTRATO</servico>
           <codigoRastreamento></codigoRastreamento>
           </volume>
           <volume>
           <servico>PAC - CONTRATO</servico>
           <codigoRastreamento></codigoRastreamento>
           </volume>
           </volumes>
           </transporte>
           <itens>
           <item>
           <codigo>${item.id}</codigo>
           <descricao>${item.title}</descricao>
           <un>Pç</un>
           <qtde>10</qtde>
           <vlr_unit>${item.value}</vlr_unit>
           </item>
           </itens>
           <parcelas>
           <parcela>
           <data>${item.add_time}</data>
           <vlr>100</vlr>
           <obs>Teste obs 1</obs>
           </parcela>
           </parcelas>
           <vlr_frete>${randomNumbers(10, 30)}</vlr_frete>
           <vlr_desconto>10</vlr_desconto>
           <obs>Testando o campo observações do pedido</obs>
           <obs_internas>Testando o campo observações internas do pedido</obs_internas>
          </pedido>`),
        ''
      );
    } catch (err) {
      if (err) throw new Error(err);
    }

    console.log(pipedriveDataToXmlBlingData.replace(/(\r\n|\r|\n|\n\r)/, ''));

    const res = await apiBling.post('/pedido/json/', {
      // dando 401
      data: {
        apikey: apiKey,
        xml: pipedriveDataToXmlBlingData,
      },
    });

    return response.status(201).json(res);
  },
};
