import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
const ListGroup = (props) => {
    const { items, textProperty, valueProperty, onItemSelect, orderProperty, selectedItem } = props;

    //#region ----------------------------------- Methods
    const getItemCssClass = (item) => {
        let base = "list-group-item";
        return ((selectedItem && item[valueProperty] === selectedItem[valueProperty]) ? 'active ' : '') + base;
    }
    //#endregion --------------------------------

    //#region ----------------------------------- Lifecycle
    return (
        <ul className="list-group">
            {
                _(items)
                    .orderBy([orderProperty])
                    .map((item) => {
                        const name = item[textProperty];
                        const id = item[valueProperty];
                        if (!name || !id) throw Error(`${typeof (ListGroup)} must have a valid name & id props.`);
                        return <li className={getItemCssClass(item)} key={id} onClick={() => onItemSelect(item)}>{name}</li>;
                    })
                    .value()
            }
        </ul>
    );
    //#endregion --------------------------------

}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
    orderProperty: 'order',
    items: []
};
ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    textProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};
export default ListGroup;
