import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
export default props =>
    <Tabs variant={props.variant} indicatorColor="primary">
        {props.children}
    </Tabs>