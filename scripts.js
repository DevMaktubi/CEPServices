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
        const code = $("#code-input").val();
        $.ajax({
            url: `https://proxyapp.correios.com.br/v1/sro-rastro/${code}`,
            type: "GET",
            dataType: "json",
            success: (data) => {
                const json = data.objetos[0].eventos
                if(!json) {
                    alert("Código inválido");
                    if(!$("#result-table").hasClass("d-none")) {
                        $("#result-table").addClass("d-none");
                    }
                    $("#code-input").val("")
                    return;
                }
                $("#status-table").empty();
                json.forEach(elem => {
                    const [day,hour] = elem.dtHrCriado.split("T");
                    console.log(day)
                    console.log(hour)
                    $("#status-table").append(`
                        <tr>
                            <td>${elem.codigo}</td>
                            <td>${elem.descricao}</td>
                            <td>${day} ${hour}</td>
                            <td>${elem.unidade.endereco.uf}</td>
                            <td>${elem.unidade.endereco.cidade}</td>
                        </tr>
                    `);
                })
                if($("#result-table").hasClass("d-none")) {
                    $("#result-table").removeClass("d-none");
                }
            },
            error: () => {
                alert("Código inválido");
            }
        })
    })

})