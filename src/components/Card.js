import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Card =({index,meal,tab,setTab})=>{

    return (
        <div className='card' key={index} onClick={() => {
const newTab=[...tab];
newTab.push({meal:meal,counter:1})
console.log(newTab);
setTab(newTab)



        }}>
        <div>
          <p className='title'>{meal.title}</p>
          <p className='subTitle'>{meal.description}</p>
          <span>{meal.price} €</span>
          {meal.popular&& <span className="populaire"><FontAwesomeIcon icon={faStar}/>Populaire</span>}
          
        </div>
        <div>
          {meal.picture &&  (<img width={130} height={130} src={meal.picture} alt=''/>)}
        
        </div>      
      </div>
    )

}

export default Card