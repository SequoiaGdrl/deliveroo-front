const Card =({index,meal})=>{

    return (
        <div className='card' key={index}>
        <div>
          <p className='title'>{meal.title}</p>
          <p className='subTitle'>{meal.description}</p>
          <span>{meal.price} €</span>
          {meal.popular&& <span>Populaire</span>}
          
        </div>
        <div>
          {meal.picture &&  (<img width={130} height={130} src={meal.picture} alt=''/>)}
        
        </div>      
      </div>
    )

}

export default Card