import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  removeItem,
  getAllPhones,
  addOneItem,
  removeOneItem
} from "../actions";

class Cart extends Component {
  componentDidMount() {
    this.props.getAllPhones();
  }

  render() {
    const { phones, removeFromCart, onAddItem, onRemoveItem } = this.props;

    function calculateTotal(items) {
      return items.reduce((accumulator, item) => {
        return (accumulator += item.price * (item.count + 1));
      }, 0);
    }

    return (
      <div className="list-phones">
        <div className="text-center title">
          <h1>
            Welcome To The White Wolf's{" "}
            <i className="fab fa-wolf-pack-battalion" /> Phones Cart App!!!
          </h1>
          <h2>
            The best deals are waiting for you ...
            <i className="fas fa-shopping-cart" />
          </h2>
        </div>
        <br />
        {phones && phones.length > 0 ? (
          <ol className="phone-list">
            {phones.map(phone => (
              <li key={phone.id} className="phone-list-item">
                <div
                  className="phone-img"
                  style={{
                    backgroundImage: `url(${phone.img})`
                  }}
                />
                <div className="phone-details">
                  <p>{phone.title}</p>
                </div>
                <div className="phone-details">
                  <p>Made By: </p>
                  <p>
                    <b>{phone.company.toUpperCase()}</b>
                  </p>
                </div>
                <div className="phone-details">
                  <p>Price: </p>
                  <p>$ {phone.count >= 1 ? phone.total : phone.price}</p>
                </div>
                <div className="phone-details">
                  <p>Amount: </p>
                  <button onClick={() => onAddItem(phone.id)}> + </button>
                  <p>{phone.count + 1}</p>
                  <button
                    onClick={
                      phone.count >= 1
                        ? () => onRemoveItem(phone.id)
                        : () => removeFromCart(phone.id)
                    }
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(phone.id)}
                  className="phone-remove"
                >
                  Remove
                </button>
              </li>
            ))}
            <h1 className="text-center">Total: $ {calculateTotal(phones)}</h1>
          </ol>
        ) : (
          <h1 className="text-center">
            The Cart is Empty :(
            <br />
            Refresh the Page!!!
          </h1>
        )}
        <footer>
          <b>
            All rights reserved. &copy; Ioan Zicu{" "}
            <i className="fab fa-wolf-pack-battalion" />
          </b>
        </footer>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { phones } = state;
  return { phones };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: id => dispatch(removeItem(id)),
    getAllPhones: bindActionCreators(getAllPhones, dispatch),
    onAddItem: id => dispatch(addOneItem(id)),
    onRemoveItem: id => dispatch(removeOneItem(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
