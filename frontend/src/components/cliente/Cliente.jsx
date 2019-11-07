import React from 'react'
import BarraSup from '../template/BarraSup'
import Aba from '../template/Aba'
import Tab from '@material-ui/core/Tab'
import Texto from '@material-ui/core/Typography'
export default props =>
    <React.Fragment>
        <BarraSup/>
        <Aba variant="fullWidth">
            <Tab label="Agendar">
                <Texto>
                    abc
                </Texto>
            </Tab>
            <Tab label="Agendamentos"/>
        </Aba>
    </React.Fragment>
