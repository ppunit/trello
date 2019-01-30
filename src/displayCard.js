import React from "react";
import ListContent from "./cardContent";
class DisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checklistPopUp: false
    };

    this.hideCheckList = this.hideCheckList.bind(this);
    this.showChecklist = this.showChecklist.bind(this);
  }
  showChecklist = id => {
    this.setState({
      checklistPopUp: true
    });
  };
  hideCheckList = id => {
    this.setState({ checklistPopUp: false });
  };

  render() {
    return (
      <div className="cards">
        <span onClick={this.showChecklist.bind(this, this.props.id)}>
          <p>{this.props.name}</p>
        </span>
        {this.state.checklistPopUp ? (
          <ListContent
            checklistclose={this.hideCheckList.bind(this, this.props.id)}
            cardId={this.props.id}
            cardName={this.props.name}
          />
        ) : null}

        {
          <span
            onClick={this.props.deleteCard}
            style={{ display: "block", width: "1px" }}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
        }
      </div>
    );
  }
}
export default DisplayCard;
