import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Compare, ProductList} from '../../components'
import * as productActions from '../../actions/product'
import {connect} from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blue_visibility: true
    };
  }

  componentWillMount() {
    this.props.actions.getProducts()
  }

  handleToggleBlueBtnClick = () => {
    this.setState({
      blue_visibility: !this.state.blue_visibility
    })
  }

  render() {
    const {products, actions} = this.props;
    const { blue_visibility } = this.state;
    const compareProducts = products.filter(product => product.compare);
    const compareBlueProducts = blue_visibility ?
      compareProducts :
      compareProducts.filter(product => product.colors.includes('blue'));

    return (
      <div className="home mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-3">Compare Products</h2>
          </div>
        </div>
        <ProductList products={products} compare={actions.compare}/>
        {compareBlueProducts.length >= 2 &&
          <Compare
          products={compareBlueProducts}
          handleToggleBlueBtnClick={this.handleToggleBlueBtnClick}
          />
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    products: state.product.products
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home)
