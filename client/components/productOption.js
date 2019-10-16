import React from 'react';

class ProductOption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      optionSelection: this.props.initialDropDown,
    };
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this);
  }

  async handleDropDownSelection(event) {
    await this.setState({optionSelection: event.target.value});
    this.props.updateChoice(this.state.optionSelection, this.props.optionNumber);
  }

  render() {
    return (
      <div className="productOption">
        <label>{this.props.optionName}</label><br/>
        <select  value={this.state.optionSelection} onChange={this.handleDropDownSelection} >
          <option value={''}>Select an option</option>
          {this.props.choices.map((choice, idx) => {
            return (
              <option value={choice.choice} key={idx}>
                {choice.choice}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default ProductOption;
