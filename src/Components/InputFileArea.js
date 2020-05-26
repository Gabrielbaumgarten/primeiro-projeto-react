import React from 'react';
import './Css/Padrao.css';
import Dropzone from "react-dropzone";
import  Typography from '@material-ui/core/Typography';

function InputFileArea(props) {
    return(
        <div>
            {/* Função de Dropzone de arquivos utilizando o react-drop */}
            <Dropzone onDrop={props.onDrop} accept="application/pdf" multiple >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div {...getRootProps()} className="InputFileArea">
                <input {...getInputProps()} />
                {!isDragActive && (<Typography variant='body2' className='Text'>Arraste e solte os PDFs aqui</Typography>)}
                {isDragActive && !isDragReject && (<Typography variant='body2' className='Text'>Por favor, apenas PDF</Typography>)}
                </div>
            )}
            </Dropzone>
        </div>
    );
}

export default InputFileArea;