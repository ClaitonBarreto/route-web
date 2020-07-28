import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

//MATERIAL-UI
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MailIcon from '@material-ui/icons/Mail';

//styled
import styled from 'styled-components'

//STORE
import store from '../../store/index'
import routeStore from '../../@api/store/routeStore'

//actions
import RouteActions from '../../actions/RouteActions'
import ErrorAction from '../../actions/ErrorAction'
import AlertAction from '../../actions/AlertAction'

//My components
import Header from './Header'
import CepField from '../CepField'
import FreteField from '../FreteField'
import validations from './validations'
import MyAlert from '../../components/MyAlert'
import Wait from '../Wait'

const CardContent = styled.div`
    border: ${props => `3px solid ${props.cardColor}`};
    border-radius: 10px;
    width: 80%;
    box-shadow: ${({theme, shadow}) => shadow ? '0px 0px 5px' + theme.shadowColor : ''};
    height: auto;
    margin-top: -25px;
    padding: 25px;
    background-color: ${({theme}) => theme.cardBackground};
`;

const Text = styled.p`
    text-align: center;
    font-size: 12pt;
    color: ${props => props.color ? props.color : ({theme}) => theme.inputLabel};
    margin-bottom: 5px;
    font-weight: 500;
`;



const MyCard = ({headerText, cardWidth, children, shadow, ...props}) => {
    

    const handleCloseAlert = () => {
        props.dispatch(AlertAction.setShowAlert(false))
        props.dispatch(ErrorAction.clearError('dados'))
    }

    return (
        <>
            {props.redirect && (
                <Redirect to="/route-details" />
            )}
            <Grid container xs={cardWidth} direction="row" justify="center" alignItems="center">
                
               

                <Header title={headerText} color={props.cardColor}/>
                
                <CardContent cardColor={props.cardColor} shadow={shadow}>
                    {children}           
                </CardContent>
            </Grid>
            {props.suggest && <Grid xs={12} style={{marginTop: '20px'}}>
                <Text>Alguma sugestão ou reclamação? Não de acanhe, me envie um e-mail:</Text>
                <a href="#">
                    <Text color="#ED6A5A">
                        <MailIcon />
                        claitonbarreto@gmail.com
                    </Text>
                </a>
            </Grid>}
        </>
    )
}



export default connect(store => ({
    error: store.ErrorReducer.error,
    data: store.RouteReducer.data
}))(MyCard)
