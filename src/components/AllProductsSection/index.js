import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusOne = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    categoryOne: '',
    ratingOne: '',
    searchOne: '',
    apiStatus: apiStatusOne.intial,
  }

  componentDidMount() {
    this.getProducts()
  }

  categoryOnemethod = id => {
    this.setState({categoryOne: id}, this.getProducts)
  }

  ratingOnemethod = ratingid => {
    this.setState({ratingOne: ratingid}, this.getProducts)
  }

  fiterOne = () => {
    this.setState(
      {
        productsList: [],
        activeOptionId: sortbyOptions[0].optionId,
        categoryOne: '',
        ratingOne: '',
        apiStatus: apiStatusOne.intial,
      },
      this.getProducts,
    )
  }

  searchMethod = data => {
    this.setState({searchOne: data})
  }

  keydownMethod = value => {
    this.setState({searchOne: value}, this.getProducts)
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusOne.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, categoryOne, ratingOne, searchOne} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryOne}&rating=${ratingOne}&title_search=${searchOne}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusOne.success,
      })
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusOne.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    if (productsList.length !== 0) {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="containeronenoproucts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="noproductimage"
        />
        <h1 className="firstnoproductheading">No Products Found</h1>
        <p>We could not find any products. Try other filters.</p>
      </div>
    )
    // TODO: Add No Products View
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="containeronenoproucts">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="noproductimage"
      />
      <h1 className="firstnoproductheading">Oops! Something Went Wrong</h1>
      <p>We are having some trouble processing your request Please try again</p>
    </div>
  )

  // TODO: Add failure view

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    let sai

    switch (apiStatus) {
      case apiStatusOne.success:
        sai = this.renderProductsList()
        break
      case apiStatusOne.loading:
        sai = this.renderLoader()
        break
      case apiStatusOne.failure:
        sai = this.renderFailure()
        break
      default:
        sai = null
    }

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          categoryOnemethod={this.categoryOnemethod}
          ratingOnemethod={this.ratingOnemethod}
          fiterOne={this.fiterOne}
          searchMethod={this.searchMethod}
          keydownMethod={this.keydownMethod}
        />
        {sai}
      </div>
    )
  }
}

export default AllProductsSection
