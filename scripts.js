// const cheerio = require('https://cdnjs.cloudflare.com/ajax/libs/cheerio/1.0.0-rc.10/lib/cheerio.min.js')

// import {
//     formatStatus,
//     formatDateTime,
//     formatLocal,
//     formatOrigin,
//     formatDestiny,
//   } from 'formatter.js';

$(document).ready(() => {
    $("#verify-cep").click(() => {
        let cep = $("#cep-input").val();
        if(!cep.match(/(^[0-9]{8}$)/i)) {
            alert("CEP inválido");
            if(!$("#result-section").hasClass("d-none")) {
                $("#result-section").removeClass("d-flex");
                $("#result-section").addClass("d-none");
            }
            return;
        }
        $.ajax({
            url: "https://viacep.com.br/ws/" + cep + "/json/",
            type: "GET",
            dataType: "json",
            success: (data) => {
                if($("#result-section").hasClass("d-none")) {
                    $("#result-section").removeClass("d-none");
                    $("#result-section").addClass("d-flex");
                }
                console.log("Sucess")
                $("#logradouro").text(data.logradouro);
                $("#complement0").text(data.complemento);
                $("#bairro").text(data.bairro);
                $("#localidade").text(data.localidade);
                $("#uf").text(data.uf);
                $("#ddd").text(data.ddd)
            }
        });
    })
    $("#verify-code").click(() => {
        const code = $("#code-input").text();
        function convertHtmlToJson(htmlString) {
            const html = cheerio.load(htmlString);
            const elemArray = [];
            html('ul.linha_status').each((_, elem) => {
              elemArray.push(elem);
            });
            elemArray.shift();
            const elemMap = elemArray.map(elem => {
              const mapObj = {}; 
              html(elem)
                .find('li')
                .each((_, liElem) => {
                  const text = html(liElem).text();
                  if (text) {
                    if (text.includes('Status')) mapObj.status = formatStatus(text);
                    if (text.includes('Data')) {
                      const dateTime = formatDateTime(text);
                      mapObj.data = dateTime[0];
                      mapObj.hora = dateTime[1];
                    }
                    if (text.includes('Local')) mapObj.local = formatLocal(text);
                    if (text.includes('Origem')) mapObj.origem = formatOrigin(text);
                    if (text.includes('Destino')) mapObj.destino = formatDestiny(text);
                  }
                });
              return mapObj;
            });
            return elemMap.reverse();
        }
        $.ajax({
            url: `https://proxyapp.correios.com.br/v1/sro-rastro/OP295213349BR`,
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data.objetos[0].eventos);
                // $("#status-table").empty();
                // json.forEach(elem => {
                //     $("#status-table").append(`
                //         <tr>
                //             <td>${elem.data}</td>
                //             <td>${elem.hora}</td>
                //             <td>${elem.local}</td>
                //             <td>${elem.origem}</td>
                //             <td>${elem.destino}</td>
                //             <td>${elem.status}</td>
                //         </tr>
                //     `);
                // })
            },
        })
    })

})