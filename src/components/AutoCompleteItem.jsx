import './AutoCompleteItem.css';
const AutoCompleteItem = (props)=>{
    let {item,setSelectedItem} = props;
    let newItem = {
        symbol:item['1. symbol'],
        name:item['2. name'],
        type:item['3. type'],
        region:item['4. region'],
        currency:item['8. currency'],

    } 
    
    

    return (
        <div onClick={()=>setSelectedItem(newItem)} className="auto-complete-item">
            <div className="headingLevelData">
                <p>Symbol</p>
                <p>Name</p>
                <p>Type</p>
                <p>Region</p>
                <p>Currency</p>
            </div>
            <div className="headingLevelDataValues">
                <p>{newItem?.symbol || `N/A`}</p>
                <p>{newItem.name || `N/A`}</p>
                <p>{newItem.type || `N/A`}</p>
                <p>{newItem.region || `N/A`}</p>
                <p>{newItem.currency || `N/A`}</p>
            </div>
        </div>
    )
}

export default AutoCompleteItem;