$('#box-informacoes').html('');
$(document).on('click', '.estado', function () {
    $('.info-municipes').html('')
    let tabela = `<table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Sigla</th>
                                <th scope="col">Região</th>
                            </tr>
                        </thead>
                        <tbody id="info">

                        </tbody>
                    </table>`;

    $('#box-informacoes').html(tabela);

    let codigo = this.getAttribute('code');
    $.ajax({
        method: 'GET',
        dataType: JSON,
        url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${codigo}`,
        success: function (data) {

            $('#info').html(`<tr>
                <th scope="row">${data.id}</th>
                <td>${data.nome}</td>
                <td>${data.sigla}</td>
                <td>${data.regiao.nome}</td>
            </tr>`);
        }
    });

    $.ajax({
        method: 'GET',
        dataType: JSON,
        url: `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${codigo}/microrregioes/`,
        success: function (data) {

            let row = "";
            data.forEach(element => {
                row += `<tr class="row-regiao">
                        <th class="id-regiao" scope="row">${element.id}</th>
                        <td>${element.nome}</td>
                        <td>${element.mesorregiao.nome}</td>
                    </tr>`
            });

            let tabela = `<table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Região</th>
                                    <th scope="col">MesoRegião</th>
                                </tr>
                            </thead>
                            <tbody id="regiao">${row}</tbody>
                        </table>`;

            $('#box-informacoes').append(tabela)
        }
    });
});

$(document).on('click', '.row-regiao', function () {
    let codigo = $(this).find('.id-regiao')[0].innerHTML
    $.get(`http://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${codigo}/municipios/`, function (data) {
        console.log(data)
        let municipes = '<ul>';
        data.forEach(element => {
            municipes += `<li>${element.nome}</li>`;
        });

        $('.info-municipes').html(municipes);
    });
});

$(document).on('dblclick', '.info-municipes', function () {
    $('.info-municipes').html('')
})

