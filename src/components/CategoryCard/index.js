import './index.css'

const CategoryCard = props => {
  const {each, categoryOnemethod} = props
  const {name, categoryId} = each

  const onclickcategory = () => {
    categoryOnemethod(categoryId)
  }

  return (
    <li className="list-items">
      <p onClick={onclickcategory}>{name}</p>
    </li>
  )
}

export default CategoryCard
