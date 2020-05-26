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

function BarraProgresso(props) {

    const [completed, setCompleted] = React.useState(0);
    const classes = useStyles();
  
    /* 
      Efeito que faz com que a barra de progresso se mova.
      Ao chegar no valor de 100% é feita a transição para a página de concluído
    */
    React.useEffect(() => {
      function progress() {
        setCompleted((oldCompleted) => {
          if (oldCompleted === 100) {
            const time = setTimeout(() => {props.executar(!props.exibir)}, 100);
            return () => clearTimeout(time);
          }
          // Aqui é gerado o valor da porcentagem
          // TODO:Acertar esse valor quando for feita a junção com o lina PDF
          const diff = Math.floor(Math.random() * 10);
          return Math.min(oldCompleted + diff, 100);
        });
      }
  
      const timer = setInterval(progress, 500);
      return () => { clearInterval(timer);  };
    }, []);
  
  
    return(
        <React.Fragment>
            <Typography variant='h1' className='LargeText'>
              Carregando os arquivos
            </Typography>
            <LinearProgress variant="determinate" value={completed} onCompositionEnd={() => {props.executar(!props.exibir)}} classes={{ barColorPrimary: classes.barColorPrimary }} className='BarraProgresso' />
            <Typography variant='h4' className='Text'>
              {completed}%
            </Typography>
        </React.Fragment>
    );
  }

  export default BarraProgresso