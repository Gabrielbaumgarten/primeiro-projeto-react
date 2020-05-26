import React from 'react';
import './Css/Padrao.css';
import Typography from '@material-ui/core/Typography'

function TextoPrincipal(props) {
    return(
        <React.Fragment>
            <Typography variant='h4' align='center' className='LargeText'>
                    {props.title}
            </Typography>
            <Typography variant='h5' align='center' className='Text'>
            {props.subTitle1}<br/> {props.subTitle2}
            </Typography>
        </React.Fragment>
    );
}

export default TextoPrincipal;