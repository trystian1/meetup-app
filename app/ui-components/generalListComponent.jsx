import React from 'react';

class GeneralListComponent extends React.Component {

    render() {

      var icon = this.props.icon ? this.props.icon + ' icon-block-small' : '',
          dataList = this.props.dataList ? this.props.dataList : [];
      return(
            <div className="general-list">
              {dataList.map(data =>
                <div key={data.key}><h3><span className={icon}></span>{data.name}</h3></div>
              )}
            </div>
          )
    }
}

export default GeneralListComponent;
