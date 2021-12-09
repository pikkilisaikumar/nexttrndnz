import './index.css'

const RatingCard = props => {
  const {eachone, ratingOnemethod} = props
  const {ratingId, imageUrl} = eachone

  const onclickRating = () => {
    ratingOnemethod(ratingId)
  }

  return (
    <li className="list-item-one">
      <button type="button" className="button" onClick={onclickRating}>
        <img src={imageUrl} className="image" alt={`rating ${ratingId}`} />
      </button>
    </li>
  )
}

export default RatingCard
