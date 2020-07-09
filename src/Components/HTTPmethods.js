import axios from 'axios'


function BuscarURL(action){
    var url
    switch (action) {
        case 'juntar':
            url = 'http://localhost:8000/linaPDF/juntarPDF/'
            break;

        case 'dividir':
            url = 'http://localhost:8000/linaPDF/dividirPDF/'
            break;

        case 'comprimir':
            url = 'http://localhost:8000/linaPDF/comprimirPDF/'
            break;

        case 'PDFtoJPG':
            url = 'http://localhost:8000/linaPDF/PDFtoJPG/'
            break;

        case 'Pesquisar':
            url = 'http://localhost:8000/linaPDF/pesquisarPDF/'
            break;
    
        default:
            break;
    }
    return url
}

async function getDataAxios(){
    const response =
    await axios.get("http://localhost:8000/linaPDF/juntarPDF/",
    )
    console.log(response.data)
}

async function postJuntarPDF(arquivos, acao, funcao, progresso, ordem){

    var url = BuscarURL(acao)

    var data = new FormData()
    var index = 0
    ordem.forEach(aux => {
        data.append('arquivo'+ index, arquivos[aux])
        index += 1
    })

    const response = await axios.post( url,
        data, 
        { 
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                progresso(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
                },
            responseType: 'blob',
        }
    )
    funcao(response.data)

    return response.data
}

async function postGetInformation(arquivos, acao, funcao, progresso, ordem){
    var url = BuscarURL(acao)
    var data = new FormData()
    var index = 0
    ordem.forEach(aux => {
        data.append('arquivo'+ index, arquivos[aux])
        index += 1
    })
    data.append('getInformation', true)

    const response = await axios.post( url,
        data, 
        { 
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                progresso(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
                },
            responseType: 'json',
        }
    )
    funcao(response.data)

    return response.data
}

async function postDividirPDF(dados, acao, funcao, progresso, onlyOne){

    var url = BuscarURL(acao)

    var data = new FormData()
    var index = 0
    dados.order.forEach(aux => {
        data.append('arquivo'+ index, dados.files[aux])
        index += 1
    })
    data.append('getInformation', false)
    data.append('start', dados.startPage)
    data.append('end', dados.endPage)
    data.append('modo', dados.modo)
    data.append('size', dados.size)
    data.append('onlyOne', onlyOne)
    data.append('tipoExtracao', dados.tipoExtracao)
    data.append('pages', dados.pages)

    const response = await axios.post( url,
        data, 
        { 
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                progresso(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
                },
            responseType: 'blob',
        }
    )
    funcao(response.data)

    return response.data
}

export{getDataAxios, postJuntarPDF, postGetInformation, postDividirPDF}
