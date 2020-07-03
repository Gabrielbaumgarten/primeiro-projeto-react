import axios from 'axios'
import download from 'downloadjs'


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

    async function postDataAxios(arquivos, acao, funcao, progresso, ordem){

        var url = BuscarURL(acao)

        var nomes = arquivos.map(arquivo =>{
            return arquivo.name
        })
        nomes = nomes.toString()

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

export{getDataAxios, postDataAxios}
