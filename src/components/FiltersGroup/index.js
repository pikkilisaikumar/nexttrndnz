import './index.css'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import CategoryCard from '../CategoryCard'

import RatingCard from '../RatingCard'

const FiltersGroup = props => {
  const {
    categoryOnemethod,
    categoryOptions,
    ratingsList,
    ratingOnemethod,
    fiterOne,
    searchMethod,
    keydownMethod,
  } = props

  const clearBtnOne = () => {
    fiterOne()
  }

  const changeInputOne = event => {
    searchMethod(event.target.value)
  }

  const onkeydownelement = event => {
    if (event.key === 'Enter') {
      keydownMethod(event.target.value)
    }
  }

  return (
    <div className="filters-group-container">
      <div className="inputContainer">
        <input
          onChange={changeInputOne}
          type="search"
          className="inputtextelement"
          onKeyDown={onkeydownelement}
          placeholder="Search"
        />
        <BsSearch />
      </div>
      <div className="containercategoryone">
        <h1 className="categoryheadingone">Category</h1>
        <div>
          {categoryOptions.map(each => (
            <CategoryCard
              key={each.categoryId}
              each={each}
              categoryOnemethod={categoryOnemethod}
            />
          ))}
        </div>
      </div>
      <div className="containercategoryone">
        <h1 className="categoryheadingone">Rating</h1>
        <div>
          {ratingsList.map(eachone => (
            <RatingCard
              key={eachone.ratingId}
              eachone={eachone}
              ratingOnemethod={ratingOnemethod}
            />
          ))}
        </div>
      </div>
      <button type="button" className="clearfilterbutton" onClick={clearBtnOne}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
