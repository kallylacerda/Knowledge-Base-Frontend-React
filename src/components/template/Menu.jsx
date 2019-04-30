import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseApiUrl } from '../../global';
import { withRouter } from 'react-router-dom';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import axios from 'axios';
import './styles/Menu.css';
import '@syncfusion/ej2-react-navigations/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';

class Menu extends Component {

    constructor() {
        super();

        this.state = {
            treeData: [],
            navigate: false
        }
    }

    componentWillMount() {
        this.getTreeData()
    }

    async getTreeData() {
        const url = `${baseApiUrl}/categories/tree`
        await axios.get(url).then(res => this.setState({ treeData: res.data }))
    }

    onNodeSelect(element) {
        this.props.history.push(`/categories/${element.nodeData.id}/articles`)
    }

    render() {
        const { props, state } = this;

        const fields = { dataSource: state.treeData, text: 'name' }
        return (
            <aside className="menu" style={{ display: props.isMenuVisible ? 'flex' : 'none' }}>
                <TreeViewComponent className="tree-node"
                    fields={fields}
                    expandOn="Click"
                    nodeSelected={this.onNodeSelect.bind(this)}
                />
            </aside>

        );
    }
}

const mapStateToProps = (state) => ({
    isMenuVisible: state.isMenuVisible
})

export default connect(mapStateToProps)(withRouter(Menu));