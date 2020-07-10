import React from 'react';
import './Css/Padrao.css';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    barColorPrimary: {
      backgroundColor: '#FA403A',
    }
  }));

const BarraProgresso = (props) => {

    const [completed, setCompleted] = React.useState(0);
    const classes = useStyles();
  
    /* 
      Efeito que faz com que a barra de progresso se mova.
      Ao chegar no valor de 100% é feita a transição para a página de concluído
    */
    React.useEffect(
      () => {
      if(props.porcentagem == 100){
        const time = setTimeout(() => {props.executar(!props.exibir)}, 1000);
        const timeout = () => clearTimeout(time);
      }
    });
  
  
    return(
        <React.Fragment>
            <Typography variant='h1' className='LargeText'>
              Carregando os arquivos
            </Typography>
            <LinearProgress variant="determinate" value={props.porcentagem} onCompositionEnd={() => {props.executar(!props.exibir)}} classes={{ barColorPrimary: classes.barColorPrimary }} className='BarraProgresso' />
            <Typography variant='h4' className='Text'>
              {props.porcentagem}%
            </Typography>
        </React.Fragment>
    );
  }

  export default BarraProgresso