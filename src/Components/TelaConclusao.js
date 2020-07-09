import React from 'react';
import './Css/Padrao.css';
import Typography from '@material-ui/core/Typography'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton  from '@material-ui/core/IconButton';
import Button  from '@material-ui/core/Button';

function TelaConclusao(props) {
    return (
        <div className='Centralizar'>
          <Typography variant='h2' className='LargeText'>
            {props.title}
          </Typography>
          <IconButton href='/' className='BotaoVoltar'>
            <ArrowBackRoundedIcon fontSize='large' />
          </IconButton>
          <a href={props.arquivo} className="RemoveUnderline" download={props.nome}>
            <Button variant='contained'>
              <GetAppRoundedIcon className='IconDownload'/>
              Baixar o PDF {props.modo}
            </Button>
          </a>
        </div>
      );
}

export default TelaConclusao;