import React from 'react'
import sadPDF from '../assets/sadPDF.png'
import Typography from '@material-ui/core/Typography'

const ErrorPage = () => {
    return(
        <React.Fragment >
            <div className='errorPage'>
                <img src={sadPDF} alt="sadPDF.png" className='ImageError'/>
                <div className='TextError'>
                    <Typography variant='h4' className='TitleError'>
                        Ops! Tivemos um problema ao trabalhar com seu PDF.
                    </Typography>
                    <Typography variant='subtitle1' className='MensageError'>
                        Por favor, tente novamente. Caso o problema persista, entre em contato com o Lina.
                    </Typography>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ErrorPage;