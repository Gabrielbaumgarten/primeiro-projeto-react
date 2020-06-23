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

    async function postDataAxios(arquivos, acao){

        var url = BuscarURL(acao)

        var nomes = arquivos.map(arquivo =>{
            return arquivo.name
        })
        nomes = nomes.toString()

        var data = new FormData()
        data.set('username', 'Chris')
        data.append('arquivo', arquivos)
        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        const response = await axios.post( url,
            data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        console.log(response.data)
    }

export{getDataAxios, postDataAxios}
