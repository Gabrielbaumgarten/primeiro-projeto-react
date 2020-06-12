import React from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

// Icons
import MenuIcon from '@material-ui/icons/Menu'
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';


/* 
  Função que retorna um botão no modelo da tela inicial
  com Logo, Título e descrição
*/
function BotaoMenuPrincipal(props) {
  return(
    <Button href={props.url}>
      <div className='BotaoMenuPrincipal'>
        <SelectIcon icon={props.icon} />
        <br/>
        <br/>
        <br/>
        <Typography variant="subtitle2" align='left'>
          {props.conteudo}
          </Typography>
          <br/>
          <Typography variant="body2" align='left' className='DescricaoMenuPrincipal'>
            {props.descricao}
            </Typography>
      </div>
    </Button>
  )
}

function SelectIcon(props) {
  var icon
  switch (props.icon) {
    case "JUNTAR":
      icon = <CallMergeRoundedIcon fontSize='large' className="IconMenuPrincipalRotate90"/>
      break;
    case "DIVIDIR":
      icon = <CallSplitRoundedIcon fontSize='large' className="IconMenuPrincipalRotate90"/>
      break;
    case "COMPRIMIR":
      icon = <CompareArrowsRoundedIcon fontSize='large' className="IconMenuPrincipal"/>
      break;
    case "OCR":
      icon = <FindInPageRoundedIcon fontSize="large" className='IconMenuPrincipal'/>
      break;
    case "PDJtoJPG":
      icon = (
        <React.Fragment>
        <PictureAsPdfRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        <ArrowRightAltRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        <PhotoLibraryRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        </React.Fragment>
      )
      break;
    default:  icon= null;
  }
  return icon;
}


/* 
  Aqui contém todo o contúdo da página principal do App

  Como está página não precisa guardar valores,
  foi utilizado o formato de função para simplicar o código.
*/
const MainPage = () => (
  <div className='Background'>
    <Typography variant='h3' align='center' className="Titulo">
      Ferramenta online para amantes de PDF
    </Typography>
    <Typography variant='h5'align='center' className='Subtitulo'>
    Ferramenta online e completamente gratuita para juntar PDF,
     dividir PDF, comprimir PDF,<br /> converter documentos Office para PDF,
      conversão de PDF para JPG, e JPG para PDF.<br/> Não requer instalação.
    </Typography>
    
    <Container className="ContainerPrincipal">
        <BotaoMenuPrincipal conteudo="JUNTAR PDF"
        descricao="Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar. É tudo muito fácil e rápido"
        icon='JUNTAR' url='/JuntarPDF'/>
        <BotaoMenuPrincipal conteudo="DIVIDIR PDF"
        descricao="Selecione um intervalo de páginas, separe uma página, ou converta cada página do documento em um arquivo PDF independente."
        icon='DIVIDIR' url='/DividirPDF' />
        <BotaoMenuPrincipal conteudo="COMPRIMIR PDF"
        descricao="Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível. Otimize seus arquivos PDF."
        icon='COMPRIMIR' url='/ComprimirPDF' />
        <BotaoMenuPrincipal conteudo="PDF PARA JPG"
        descricao="Extraia todas as imagens contidas em um arquivo PDF ou converta cada página em um arquivo JPG."
        icon='PDJtoJPG' url='/PDFtoJPG' />
        <BotaoMenuPrincipal conteudo="PESQUISAR NO PDF"
        descricao="Torne o PDF um arquivo pesquisável para encontrar mais facilmente as palavras chaves."
        icon='OCR' url='/PesquisarPDF' />
    </Container>
  </div>
);

export default MainPage; 
