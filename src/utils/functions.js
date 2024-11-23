export const calculate_total_price = (items) =>{

    return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}